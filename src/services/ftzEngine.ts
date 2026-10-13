/**
 * Starshippp Bonded Foreign Trade Zone (FTZ) & Customs Deferral Engine
 * Implements:
 * 1. Port of Entry Container Intake (CBP Form 214 Admission)
 * 2. 2-Year Duty Deferral Ledger & Capital Preservation Tracking
 * 3. On-Demand Carton/Pallet Micro-Release (CBP Form 7501 Duty Settlement)
 * 4. Regulatory Expiration Clock & Automated Liquidation Compliance
 */

export interface ContainerIntakeRequest {
  merchantId: string;
  containerNumber: string; // e.g. MSCU7829104
  sealNumber: string;
  bolNumber: string; // Bill of Lading
  portOfEntry: string; // e.g. Port of Detroit / Subzone 70
  totalCartons: number;
  unitsPerCarton: number;
  declaredValueUsd: number;
  htsCode: string; // Harmonized Tariff Schedule code
  dutyRatePercent: number; // e.g., 25% Section 301 + 3.5% column 1 = 28.5%
  merchandiseDescription: string;
}

export interface ContainerBondedState {
  containerId: string;
  merchantId: string;
  containerNumber: string;
  sealNumber: string;
  bolNumber: string;
  cbp214AdmissionNumber: string;
  admissionDate: string;
  twoYearExpirationDate: string;
  daysRemaining: number;
  totalCartonsAdmitted: number;
  cartonsRemaining: number;
  unitsRemaining: number;
  totalValueUsd: number;
  deferredDutyLiabilityTotalUsd: number;
  settledDutyUsd: number;
  activeDeferredDutyUsd: number;
  status: 'ACTIVE_DEFERRED' | 'PARTIALLY_RELEASED' | 'FULLY_LIQUIDATED' | 'EXPIRATION_WARNING';
}

export interface MicroReleaseRequest {
  containerId: string;
  merchantId: string;
  cartonsToRelease: number;
  orderDispatchReference?: string;
  authorizedOfficer: string;
}

export interface MicroReleaseResult {
  releaseId: string;
  containerId: string;
  cartonsReleased: number;
  unitsReleased: number;
  proRataMerchandiseValueUsd: number;
  cbp7501DutyPayableUsd: number;
  mpfFeeUsd: number; // Merchandise Processing Fee
  hmtFeeUsd: number; // Harbor Maintenance Tax
  totalCustomsSettlementUsd: number;
  remainingCartonsInBond: number;
  remainingDeferredDutyUsd: number;
  capitalPreservedToDateUsd: number;
  regulatoryFormGenerated: string; // e.g. CBP-7501-MICRO-REL-XXXX
  timestamp: string;
}

export class FtzEngine {
  // CBP Statutory Constants
  private static readonly MPF_RATE = 0.003464; // 0.3464% Merchandise Processing Fee
  private static readonly MPF_MIN_USD = 31.67;
  private static readonly MPF_MAX_USD = 614.35;
  private static readonly HMT_RATE = 0.00125; // 0.125% Harbor Maintenance Tax

  /**
   * Intakes an ocean/air container into Starshippp Subzone 70 Bonded Inventory under CBP Form 214.
   */
  public static admitContainer(req: ContainerIntakeRequest): ContainerBondedState {
    const admissionDate = new Date();
    const expirationDate = new Date(admissionDate);
    expirationDate.setFullYear(admissionDate.getFullYear() + 2); // 2-Year Duty Deferral Statutory Window

    const daysRemaining = Math.ceil((expirationDate.getTime() - admissionDate.getTime()) / (1000 * 60 * 60 * 24));
    const deferredDuty = Number((req.declaredValueUsd * (req.dutyRatePercent / 100)).toFixed(2));
    const cbp214Admission = `CBP214-DTW-${Math.floor(100000 + Math.random() * 900000)}`;
    const containerId = `ftz_cnt_${req.containerNumber.toLowerCase()}`;

    return {
      containerId,
      merchantId: req.merchantId,
      containerNumber: req.containerNumber,
      sealNumber: req.sealNumber,
      bolNumber: req.bolNumber,
      cbp214AdmissionNumber: cbp214Admission,
      admissionDate: admissionDate.toISOString().split('T')[0],
      twoYearExpirationDate: expirationDate.toISOString().split('T')[0],
      daysRemaining,
      totalCartonsAdmitted: req.totalCartons,
      cartonsRemaining: req.totalCartons,
      unitsRemaining: req.totalCartons * req.unitsPerCarton,
      totalValueUsd: req.declaredValueUsd,
      deferredDutyLiabilityTotalUsd: deferredDuty,
      settledDutyUsd: 0,
      activeDeferredDutyUsd: deferredDuty,
      status: 'ACTIVE_DEFERRED'
    };
  }

  /**
   * Releases an exact quantity of cartons/units from bond into domestic commerce (CBP Form 7501).
   * Duty is paid strictly on the released units, maintaining capital deferral on the balance.
   */
  public static executeMicroRelease(
    state: ContainerBondedState,
    req: MicroReleaseRequest,
    dutyRatePercent: number,
    unitsPerCarton: number
  ): { updatedState: ContainerBondedState; releaseResult: MicroReleaseResult } {
    if (req.cartonsToRelease > state.cartonsRemaining) {
      throw new Error(`Requested release (${req.cartonsToRelease} cartons) exceeds available bonded stock (${state.cartonsRemaining} cartons).`);
    }

    const valuePerCarton = state.totalValueUsd / state.totalCartonsAdmitted;
    const releasedValue = Number((req.cartonsToRelease * valuePerCarton).toFixed(2));
    const dutyPayable = Number((releasedValue * (dutyRatePercent / 100)).toFixed(2));

    // Calculate CBP user fees
    let mpf = Number((releasedValue * this.MPF_RATE).toFixed(2));
    if (mpf < this.MPF_MIN_USD) mpf = this.MPF_MIN_USD;
    if (mpf > this.MPF_MAX_USD) mpf = this.MPF_MAX_USD;

    const hmt = Number((releasedValue * this.HMT_RATE).toFixed(2));
    const totalCustomsSettlement = Number((dutyPayable + mpf + hmt).toFixed(2));

    const newCartonsRemaining = state.cartonsRemaining - req.cartonsToRelease;
    const newUnitsRemaining = newCartonsRemaining * unitsPerCarton;
    const newSettledDuty = Number((state.settledDutyUsd + dutyPayable).toFixed(2));
    const newActiveDeferred = Number((state.deferredDutyLiabilityTotalUsd - newSettledDuty).toFixed(2));

    let newStatus: ContainerBondedState['status'] = 'PARTIALLY_RELEASED';
    if (newCartonsRemaining === 0) {
      newStatus = 'FULLY_LIQUIDATED';
    } else if (state.daysRemaining < 60) {
      newStatus = 'EXPIRATION_WARNING';
    }

    const updatedState: ContainerBondedState = {
      ...state,
      cartonsRemaining: newCartonsRemaining,
      unitsRemaining: newUnitsRemaining,
      settledDutyUsd: newSettledDuty,
      activeDeferredDutyUsd: newActiveDeferred,
      status: newStatus
    };

    const releaseId = `rel_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const releaseResult: MicroReleaseResult = {
      releaseId,
      containerId: state.containerId,
      cartonsReleased: req.cartonsToRelease,
      unitsReleased: req.cartonsToRelease * unitsPerCarton,
      proRataMerchandiseValueUsd: releasedValue,
      cbp7501DutyPayableUsd: dutyPayable,
      mpfFeeUsd: mpf,
      hmtFeeUsd: hmt,
      totalCustomsSettlementUsd: totalCustomsSettlement,
      remainingCartonsInBond: newCartonsRemaining,
      remainingDeferredDutyUsd: newActiveDeferred,
      capitalPreservedToDateUsd: newActiveDeferred,
      regulatoryFormGenerated: `CBP-7501-ENTRY-${Math.floor(1000000 + Math.random() * 9000000)}`,
      timestamp: new Date().toISOString()
    };

    return { updatedState, releaseResult };
  }
}
