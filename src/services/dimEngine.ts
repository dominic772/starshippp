/**
 * Starshippp Proprietary DIM Divisor 250 Arbitrage & Volumetric Engine
 * Compares standard commercial retail divisors (139/166) against Starshippp's negotiated 250 contract divisor.
 */

export interface PackageDimensions {
  lengthInches: number;
  widthInches: number;
  heightInches: number;
  scaleWeightLbs: number;
}

export interface DimCalculationResult {
  cubicDimensions: {
    lengthIn: number;
    widthIn: number;
    heightIn: number;
    cubicInches: number;
    cubicFeet: number;
  };
  weights: {
    scaleActualLbs: number;
    carrierStandardDivisor: number;
    carrierStandardBillableLbs: number;
    starshipppContractDivisor: number;
    starshipppContractBillableLbs: number;
    weightReliefLbs: number;
  };
  arbitrage: {
    standardEstimatedCostUsd: number;
    starshipppCommercialCostUsd: number;
    netSavingsUsd: number;
    savingsPercentage: string;
  };
  recommendation: string;
}

export class DimEngine {
  private static readonly STANDARD_DIVISOR = 139; // USPS / FedEx commercial standard
  private static readonly STARSHIPPP_CONTRACT_DIVISOR = 250; // Starshippp negotiated contract divisor
  private static readonly BASE_POSTAGE_USD = 14.20; // Estimated baseline Zone 4-5 parcel floor
  private static readonly PER_LB_RATE_USD = 0.68; // Marginal rate per billable pound

  /**
   * Calculates volumetric weight arbitrage and financial savings.
   */
  public static calculate(pkg: PackageDimensions): DimCalculationResult {
    const cubicInches = Math.max(1, pkg.lengthInches * pkg.widthInches * pkg.heightInches);
    const cubicFeet = Number((cubicInches / 1728).toFixed(2));

    const standardDimWeight = Math.ceil(cubicInches / this.STANDARD_DIVISOR);
    const starshipppDimWeight = Math.ceil(cubicInches / this.STARSHIPPP_CONTRACT_DIVISOR);

    const billableStandard = Math.max(pkg.scaleWeightLbs, standardDimWeight);
    const billableStarshippp = Math.max(pkg.scaleWeightLbs, starshipppDimWeight);
    const weightRelief = Math.max(0, billableStandard - billableStarshippp);

    const standardCost = Number((this.BASE_POSTAGE_USD + billableStandard * this.PER_LB_RATE_USD).toFixed(2));
    const starshipppCost = Number((this.BASE_POSTAGE_USD + billableStarshippp * this.PER_LB_RATE_USD).toFixed(2));
    const netSavings = Number(Math.max(0, standardCost - starshipppCost).toFixed(2));
    const savingsPct = standardCost > 0 ? Number(((netSavings / standardCost) * 100).toFixed(1)) : 0;

    let recommendation = 'Approved for Tier-1 Commercial Ground Advantage injection.';
    if (cubicInches > 12000) {
      recommendation = 'Oversized profile: Stage at Wide-Span Cantilever Rack (Pontiac Floor Bench 04).';
    }

    return {
      cubicDimensions: {
        lengthIn: pkg.lengthInches,
        widthIn: pkg.widthInches,
        heightIn: pkg.heightInches,
        cubicInches,
        cubicFeet
      },
      weights: {
        scaleActualLbs: pkg.scaleWeightLbs,
        carrierStandardDivisor: this.STANDARD_DIVISOR,
        carrierStandardBillableLbs: billableStandard,
        starshipppContractDivisor: this.STARSHIPPP_CONTRACT_DIVISOR,
        starshipppContractBillableLbs: billableStarshippp,
        weightReliefLbs: weightRelief
      },
      arbitrage: {
        standardEstimatedCostUsd: standardCost,
        starshipppCommercialCostUsd: starshipppCost,
        netSavingsUsd: netSavings,
        savingsPercentage: `${savingsPct}%`
      },
      recommendation
    };
  }
}
