/**
 * Starshippp Automated Billing, Wallet & Monthly Minimum Commitment Engine
 * Implements:
 * 1. $250/mo minimum commitment reconciliation (Dominic Serra Pillar 1: zero volume lock-in)
 * 2. Pick, pack, insert, and custom unboxing fee calculations
 * 3. Ambient and off-site high-bay bulk storage rate engine
 * 4. Auto-replenishing ACH/Stripe prepaid postage wallet
 * 5. Bi-directional Xero invoice payload generation
 */

export interface PickPackRequest {
  unitsCount: number;
  skusCount: number;
  insertsCount?: number;
  customGiftWrap?: boolean;
  waxSealOrRibbon?: boolean;
}

export interface PickPackResult {
  baseOrderFee: number;
  additionalUnitsFee: number;
  insertsFee: number;
  customFinishingFee: number;
  totalFulfillmentFee: number;
  breakdown: string[];
}

export interface StorageRequest {
  standardBinsCount: number; // $2.50/bin/mo
  ambientPalletsCount: number; // $18.00/pallet/mo
  offsiteBulkPalletsCount: number; // $12.00/pallet/mo (Pontiac overflow)
  daysInBillingCycle?: number;
}

export interface StorageResult {
  binStorageUsd: number;
  ambientPalletStorageUsd: number;
  offsiteBulkPalletStorageUsd: number;
  totalStorageUsd: number;
}

export interface MonthlyCommitmentAuditRequest {
  merchantId: string;
  billingMonth: string; // YYYY-MM
  totalFulfillmentSpendUsd: number;
  totalStorageSpendUsd: number;
  totalPodSpendUsd: number;
  totalFtzMaintenanceSpendUsd: number;
  minimumCommitmentUsd?: number; // Default $250.00
}

export interface MonthlyCommitmentAuditResult {
  merchantId: string;
  billingMonth: string;
  actualServiceSpendUsd: number;
  contractMinimumUsd: number;
  minimumTopUpBilledUsd: number;
  totalInvoicedUsd: number;
  status: 'MET_COMMITMENT' | 'TOP_UP_APPLIED';
  explanation: string;
}

export interface WalletTransaction {
  id: string;
  merchantId: string;
  type: 'POSTAGE_DEDUCTION' | 'FULFILLMENT_FEE' | 'AUTO_RECHARGE_ACH' | 'MANUAL_DEPOSIT';
  amountUsd: number;
  balanceAfterUsd: number;
  description: string;
  referenceId?: string;
  timestamp: string;
}

export interface XeroInvoicePayload {
  InvoiceNumber: string;
  Type: 'ACCREC'; // Accounts Receivable
  Contact: {
    ContactNumber: string;
    Name: string;
    EmailAddress: string;
  };
  Date: string;
  DueDate: string;
  LineAmountTypes: 'Exclusive';
  LineItems: Array<{
    Description: string;
    Quantity: number;
    UnitAmount: number;
    AccountCode: string; // e.g. 200 - Fulfillment Revenue, 210 - Postage Pass-thru
    TaxType: 'NONE';
  }>;
  Status: 'AUTHORISED';
}

export class BillingEngine {
  public static readonly MONTHLY_MINIMUM_USD = 250.00;

  // Fulfillment rates
  public static readonly BASE_PICK_PACK_USD = 2.50; // First item
  public static readonly ADDITIONAL_ITEM_USD = 0.50; // Each additional item
  public static readonly MARKETING_INSERT_USD = 0.35; // Stickers, cards, promo slips
  public static readonly GIFT_WRAP_USD = 2.00; // Custom tissue, wax seal, ribbons

  // Storage rates per month
  public static readonly BIN_STORAGE_MONTHLY_USD = 2.50;
  public static readonly AMBIENT_PALLET_MONTHLY_USD = 18.00;
  public static readonly OFFSITE_BULK_PALLET_MONTHLY_USD = 12.00; // Divisor 250 bulk synergy

  // Wallet defaults
  public static readonly DEFAULT_WALLET_RECHARGE_THRESHOLD_USD = 200.00;
  public static readonly DEFAULT_WALLET_RECHARGE_AMOUNT_USD = 1000.00;

  /**
   * Calculates picking, packing, packaging, and custom unboxing labor.
   */
  public static calculatePickPack(req: PickPackRequest): PickPackResult {
    const units = Math.max(1, req.unitsCount);
    const inserts = req.insertsCount || 0;

    const baseOrderFee = this.BASE_PICK_PACK_USD;
    const additionalUnitsFee = Number(((units - 1) * this.ADDITIONAL_ITEM_USD).toFixed(2));
    const insertsFee = Number((inserts * this.MARKETING_INSERT_USD).toFixed(2));
    
    let customFinishingFee = 0;
    if (req.customGiftWrap) customFinishingFee += this.GIFT_WRAP_USD;
    if (req.waxSealOrRibbon) customFinishingFee += 1.25;
    customFinishingFee = Number(customFinishingFee.toFixed(2));

    const totalFulfillmentFee = Number((baseOrderFee + additionalUnitsFee + insertsFee + customFinishingFee).toFixed(2));

    const breakdown: string[] = [
      `Base pick & pack (1st unit): $${baseOrderFee.toFixed(2)}`
    ];
    if (additionalUnitsFee > 0) {
      breakdown.push(`${units - 1} add'l units @ $${this.ADDITIONAL_ITEM_USD.toFixed(2)}/unit: $${additionalUnitsFee.toFixed(2)}`);
    }
    if (insertsFee > 0) {
      breakdown.push(`${inserts} inserts/cards @ $${this.MARKETING_INSERT_USD.toFixed(2)}/unit: $${insertsFee.toFixed(2)}`);
    }
    if (customFinishingFee > 0) {
      breakdown.push(`Luxury unboxing/wax seal packaging: $${customFinishingFee.toFixed(2)}`);
    }

    return {
      baseOrderFee,
      additionalUnitsFee,
      insertsFee,
      customFinishingFee,
      totalFulfillmentFee,
      breakdown
    };
  }

  /**
   * Calculates monthly storage across active shelf bins, ambient pallets, and offsite bulk storage.
   */
  public static calculateStorage(req: StorageRequest): StorageResult {
    const days = req.daysInBillingCycle || 30;
    const prorateFactor = days / 30;

    const binStorageUsd = Number((req.standardBinsCount * this.BIN_STORAGE_MONTHLY_USD * prorateFactor).toFixed(2));
    const ambientPalletStorageUsd = Number((req.ambientPalletsCount * this.AMBIENT_PALLET_MONTHLY_USD * prorateFactor).toFixed(2));
    const offsiteBulkPalletStorageUsd = Number((req.offsiteBulkPalletsCount * this.OFFSITE_BULK_PALLET_MONTHLY_USD * prorateFactor).toFixed(2));
    const totalStorageUsd = Number((binStorageUsd + ambientPalletStorageUsd + offsiteBulkPalletStorageUsd).toFixed(2));

    return {
      binStorageUsd,
      ambientPalletStorageUsd,
      offsiteBulkPalletStorageUsd,
      totalStorageUsd
    };
  }

  /**
   * Reconciles the merchant's monthly spend against Starshippp's $250 fair minimum commitment.
   * If actual spend exceeds $250, top-up is $0.
   * If actual spend is less than $250, top-up is the difference.
   */
  public static auditMonthlyCommitment(req: MonthlyCommitmentAuditRequest): MonthlyCommitmentAuditResult {
    const minimum = req.minimumCommitmentUsd !== undefined ? req.minimumCommitmentUsd : this.MONTHLY_MINIMUM_USD;
    const actualSpend = Number((
      req.totalFulfillmentSpendUsd +
      req.totalStorageSpendUsd +
      req.totalPodSpendUsd +
      req.totalFtzMaintenanceSpendUsd
    ).toFixed(2));

    let topUp = 0;
    let status: 'MET_COMMITMENT' | 'TOP_UP_APPLIED' = 'MET_COMMITMENT';
    let explanation = '';

    if (actualSpend >= minimum) {
      topUp = 0;
      status = 'MET_COMMITMENT';
      explanation = `Merchant generated $${actualSpend.toFixed(2)} in 3PL services, meeting the $${minimum.toFixed(2)} monthly threshold. Zero top-up fee applied.`;
    } else {
      topUp = Number((minimum - actualSpend).toFixed(2));
      status = 'TOP_UP_APPLIED';
      explanation = `Merchant generated $${actualSpend.toFixed(2)} in 3PL services. A minimum commitment adjustment of $${topUp.toFixed(2)} brings total monthly billing to the $${minimum.toFixed(2)} baseline.`;
    }

    const totalInvoicedUsd = Number((actualSpend + topUp).toFixed(2));

    return {
      merchantId: req.merchantId,
      billingMonth: req.billingMonth,
      actualServiceSpendUsd: actualSpend,
      contractMinimumUsd: minimum,
      minimumTopUpBilledUsd: topUp,
      totalInvoicedUsd,
      status,
      explanation
    };
  }

  /**
   * Evaluates wallet auto-recharge logic.
   */
  public static processWalletDeduction(
    currentBalance: number,
    deductionAmount: number,
    threshold: number = this.DEFAULT_WALLET_RECHARGE_THRESHOLD_USD,
    rechargeAmount: number = this.DEFAULT_WALLET_RECHARGE_AMOUNT_USD
  ): {
    newBalance: number;
    recharged: boolean;
    rechargeAmount: number;
    transactionType: WalletTransaction['type'];
  } {
    let balance = Number((currentBalance - deductionAmount).toFixed(2));
    let recharged = false;
    let actualRecharge = 0;

    if (balance < threshold) {
      balance = Number((balance + rechargeAmount).toFixed(2));
      recharged = true;
      actualRecharge = rechargeAmount;
    }

    return {
      newBalance: balance,
      recharged,
      rechargeAmount: actualRecharge,
      transactionType: recharged ? 'AUTO_RECHARGE_ACH' : 'POSTAGE_DEDUCTION'
    };
  }

  /**
   * Generates a fully formatted Xero Invoice JSON payload for automated bi-directional ledger sync.
   */
  public static generateXeroInvoicePayload(
    merchant: { id: string; name: string; email: string },
    invoiceNumber: string,
    billingMonth: string,
    fulfillmentTotal: number,
    storageTotal: number,
    podTotal: number,
    topUpFee: number
  ): XeroInvoicePayload {
    const lineItems: XeroInvoicePayload['LineItems'] = [];

    if (fulfillmentTotal > 0) {
      lineItems.push({
        Description: `Starshippp 3PL Pick, Pack & Handling - ${billingMonth}`,
        Quantity: 1,
        UnitAmount: fulfillmentTotal,
        AccountCode: '200', // Operating Revenue: Pick & Pack
        TaxType: 'NONE'
      });
    }

    if (storageTotal > 0) {
      lineItems.push({
        Description: `Starshippp Bin & Pallet Storage Allocation - ${billingMonth}`,
        Quantity: 1,
        UnitAmount: storageTotal,
        AccountCode: '205', // Operating Revenue: Storage
        TaxType: 'NONE'
      });
    }

    if (podTotal > 0) {
      lineItems.push({
        Description: `Direct-to-Garment POD & Custom Kitting Production - ${billingMonth}`,
        Quantity: 1,
        UnitAmount: podTotal,
        AccountCode: '215', // Operating Revenue: POD Customization
        TaxType: 'NONE'
      });
    }

    if (topUpFee > 0) {
      lineItems.push({
        Description: `Monthly Minimum 3PL Commitment Adjustment ($250 threshold) - ${billingMonth}`,
        Quantity: 1,
        UnitAmount: topUpFee,
        AccountCode: '220', // Operating Revenue: Minimum Commitment Fee
        TaxType: 'NONE'
      });
    }

    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return {
      InvoiceNumber: invoiceNumber,
      Type: 'ACCREC',
      Contact: {
        ContactNumber: merchant.id,
        Name: merchant.name,
        EmailAddress: merchant.email
      },
      Date: today,
      DueDate: dueDate,
      LineAmountTypes: 'Exclusive',
      LineItems: lineItems,
      Status: 'AUTHORISED'
    };
  }
}
