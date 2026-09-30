export type ServiceCategory = 
  | 'domain-infra' 
  | 'google-suite' 
  | 'crm' 
  | 'accounting' 
  | 'logistics-ingestion';

export type EndpointStatus = 'healthy' | 'warning' | 'error' | 'syncing' | 'staged';

export interface ApiRateLimit {
  current: number;
  max: number;
  resetIn: string;
}

export interface MetricItem {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface ApiEndpoint {
  id: string;
  name: string;
  service: string;
  serviceIconName: 'globe' | 'google' | 'database' | 'dollar' | 'truck' | 'mail' | 'calendar' | 'search' | 'bar-chart';
  category: ServiceCategory;
  categoryLabel: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  authType: 'API Key' | 'OAuth 2.0' | 'Bearer Token' | 'mTLS' | 'Webhook Secret';
  status: EndpointStatus;
  latencyMs: number;
  uptimePct: number;
  lastChecked: string;
  rateLimit: ApiRateLimit;
  description: string;
  docUrl: string;
  envVarRequired: string[];
  samplePayload?: string;
  sampleResponse?: string;
  headers?: Record<string, string>;
  metrics?: MetricItem[];
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  service: string;
  action: string;
  status: '200 OK' | '201 Created' | '204 No Content' | '429 Rate Limit' | '500 Error';
  latencyMs: number;
  initiator: string;
}

export interface ApiCredentialSummary {
  name: string;
  envVar: string;
  service: string;
  status: 'configured' | 'pending' | 'expiring-soon';
  expiresIn: string;
  maskedKey: string;
  lastRotated: string;
  scope: string;
}
