/**
 * Starshippp In-House Print-On-Demand (POD) & Custom Kitting Engine
 * Implements:
 * 1. Direct-to-Garment (DTG Brother GTX Pro / Kornit) queue automation
 * 2. High-speed vinyl sticker & promo card print scheduling
 * 3. 0-Transit Day floor injection: Print bench -> QC -> Order Pack Bench
 * 4. Cost Arbitrage Calculator vs. 3rd-party middleman brokers (Printful/Printify)
 */

export type PodItemType = 'DTG_APPAREL' | 'VINYL_STICKER' | 'CUSTOM_CORRUGATE_BOX' | 'MARKETING_INSERT' | 'WAX_SEAL';
export type GarmentType = 'T_SHIRT_PREMIUM' | 'HOODIE_HEAVYWEIGHT' | 'LONGSLEEVE' | 'TOTE_CANVAS';
export type PodJobStatus = 
  | 'QUEUED' 
  | 'RIP_PROCESSING' 
  | 'PRETREAT_APPLIED' 
  | 'HEAT_PRESS_BASE' 
  | 'PRINTING' 
  | 'CONVEYOR_CURING' 
  | 'QC_PASSED' 
  | 'STAGED_AT_PACK_BENCH';

export interface PodJobSubmission {
  merchantId: string;
  orderReferenceId: string;
  itemType: PodItemType;
  garmentStyle?: GarmentType;
  blankBrand?: 'Comfort Colors 1717' | 'Bella+Canvas 3001' | 'Independent Trading Co' | 'Gildan Hammer';
  colorHex?: string;
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
  artworkFrontUrl: string;
  artworkBackUrl?: string;
  quantity: number;
  unboxingNotes?: string;
}

export interface PodCostComparison {
  itemDescription: string;
  starshipppInHouseCostUsd: number;
  printfulBrokerCostUsd: number;
  netMarginSavingsPerUnitUsd: number;
  savingsPercentage: string;
  transitDaysToPackBench: {
    starshippp: number; // 0 days (same floor)
    printfulBroker: number; // 3-6 business days
  };
}

export interface PodJobRecord {
  jobId: string;
  merchantId: string;
  orderReferenceId: string;
  itemType: PodItemType;
  garmentDescription: string;
  artworkFrontUrl: string;
  status: PodJobStatus;
  estimatedPrintMinutes: number;
  operatorNotes: string;
  costEconomics: PodCostComparison;
  queuedAt: string;
  completedAt?: string;
}

export class PodEngine {
  // Wholesale in-house production benchmarks
  private static readonly BLANK_COSTS: Record<GarmentType, number> = {
    T_SHIRT_PREMIUM: 3.25, // Bella+Canvas wholesale blank
    HOODIE_HEAVYWEIGHT: 11.50, // Heavyweight fleece blank
    LONGSLEEVE: 4.80,
    TOTE_CANVAS: 2.10
  };

  private static readonly PRINTFUL_BASELINES: Record<GarmentType, number> = {
    T_SHIRT_PREMIUM: 13.95,
    HOODIE_HEAVYWEIGHT: 28.50,
    LONGSLEEVE: 18.25,
    TOTE_CANVAS: 12.00
  };

  private static readonly INK_PRETREAT_COST_USD = 1.10;
  private static readonly OPERATOR_LABOR_USD = 1.45;

  /**
   * Compares Starshippp in-house floor economics against 3rd-party print broker prices.
   */
  public static calculateCostArbitrage(itemType: PodItemType, garment: GarmentType = 'T_SHIRT_PREMIUM'): PodCostComparison {
    if (itemType === 'VINYL_STICKER') {
      const inHouse = 0.28;
      const printful = 1.65;
      const savings = Number((printful - inHouse).toFixed(2));
      return {
        itemDescription: 'Die-Cut Vinyl Decal / Sticker (3" x 3")',
        starshipppInHouseCostUsd: inHouse,
        printfulBrokerCostUsd: printful,
        netMarginSavingsPerUnitUsd: savings,
        savingsPercentage: '83.0%',
        transitDaysToPackBench: {
          starshippp: 0,
          printfulBroker: 4
        }
      };
    }

    const blankCost = this.BLANK_COSTS[garment] || 3.25;
    const starshipppInHouse = Number((blankCost + this.INK_PRETREAT_COST_USD + this.OPERATOR_LABOR_USD).toFixed(2));
    const printfulCost = this.PRINTFUL_BASELINES[garment] || 13.95;
    const netSavings = Number((printfulCost - starshipppInHouse).toFixed(2));
    const savingsPct = Number(((netSavings / printfulCost) * 100).toFixed(1));

    return {
      itemDescription: `Direct-To-Garment ${garment.replace(/_/g, ' ')}`,
      starshipppInHouseCostUsd: starshipppInHouse,
      printfulBrokerCostUsd: printfulCost,
      netMarginSavingsPerUnitUsd: netSavings,
      savingsPercentage: `${savingsPct}%`,
      transitDaysToPackBench: {
        starshippp: 0,
        printfulBroker: 5
      }
    };
  }

  /**
   * Dispatches a print job straight to the Brother GTX Pro / Roland print queue on the Pontiac warehouse floor.
   */
  public static queueJob(submission: PodJobSubmission): PodJobRecord {
    const jobId = `pod_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const garment = submission.garmentStyle || 'T_SHIRT_PREMIUM';
    const brand = submission.blankBrand || 'Bella+Canvas 3001';
    const size = submission.size || 'L';
    const color = submission.colorHex || '#111827';

    const costEconomics = this.calculateCostArbitrage(submission.itemType, garment);

    return {
      jobId,
      merchantId: submission.merchantId,
      orderReferenceId: submission.orderReferenceId,
      itemType: submission.itemType,
      garmentDescription: `${brand} (${color}, Size ${size})`,
      artworkFrontUrl: submission.artworkFrontUrl,
      status: 'QUEUED',
      estimatedPrintMinutes: 4.5,
      operatorNotes: submission.unboxingNotes || 'Inspect print alignment, heat press at 320F for 35s, route directly to Bench 02 for order consolidation.',
      costEconomics,
      queuedAt: new Date().toISOString()
    };
  }
}
