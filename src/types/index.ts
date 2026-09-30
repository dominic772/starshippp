export type VideoTheme = 'hero' | 'unboxing' | 'facility';

export interface PexelsVideoItem {
  id: number | string;
  theme: VideoTheme;
  query: string;
  title: string;
  videoUrl: string;
  posterUrl: string;
  author: string;
  authorUrl?: string;
  duration?: number;
  width?: number;
  height?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface ArbitrageFeature {
  category: string;
  metric: string;
  starshippp: string;
  starshipppHoverNote: string;
  shipbob: string;
  redstag: string;
  inHouseDiy: string;
  isSuperior: boolean;
}

export interface DimCalculation {
  length: number;
  width: number;
  height: number;
  actualWeight: number;
  cubicInches: number;
  dimWeightDomestic: number; // Divisor 166 (retail standard)
  dimWeightCommercial: number; // Divisor 139 (express standard)
  billableWeightUps: number;
  billableWeightFedEx: number;
  billableWeightUsps: number;
  starshipppRateEstimate: number;
  standardCarrierRate: number;
  estimatedSavingsPct: number;
}

export interface RoiCalculation {
  monthlyOrders: number;
  laborRatePerHour: number;
  packingMinutesPerOrder: number;
  suppliesCostPerBox: number;
  monthlyStorageCost: number;
  // Results
  monthlyLaborHours: number;
  monthlyLaborCost: number;
  monthlySuppliesCost: number;
  totalInHouseCost: number;
  starshipppAllInCost: number;
  monthlySavings: number;
  annualSavings: number;
  reclaimedFounderHours: number;
  roiMultiplier: number;
}

export interface AuditSubmission {
  brandName: string;
  email: string;
  monthlyVolume: string;
  currentCarrierOr3pl: string;
  storeUrl?: string;
  file?: File | null;
  fileName?: string;
  fileSize?: string;
}

export interface TourBooking {
  name: string;
  email: string;
  phone: string;
  brandName: string;
  monthlyOrders: string;
  tourType: 'in-person' | 'virtual';
  date: string;
  timeSlot: string;
  specialRequests?: string;
}
