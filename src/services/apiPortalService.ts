import type { ApiEndpoint, SystemAuditLog, ApiCredentialSummary } from '../types/portal';

export const INITIAL_API_ENDPOINTS: ApiEndpoint[] = [
  // ==========================================
  // GODADDY INFRASTRUCTURE
  // ==========================================
  {
    id: 'godaddy-domain-health',
    name: 'GoDaddy Domain Registration & Status',
    service: 'GoDaddy DNS / Domain API',
    serviceIconName: 'globe',
    category: 'domain-infra',
    categoryLabel: 'Domain & Infrastructure',
    url: 'https://api.godaddy.com/v1/domains/starshippp.com',
    method: 'GET',
    authType: 'API Key',
    status: 'healthy',
    latencyMs: 98,
    uptimePct: 99.99,
    lastChecked: 'Just now',
    rateLimit: { current: 142, max: 600, resetIn: '48m' },
    description: 'Monitors domain registration validity, registry lock status, auto-renew health, and ICANN WHOIS record verification for starshippp.com.',
    docUrl: 'https://developer.godaddy.com/doc/endpoint/domains',
    envVarRequired: ['VITE_GODADDY_API_KEY', 'VITE_GODADDY_API_SECRET'],
    headers: {
      'Authorization': 'sso-key {API_KEY}:{API_SECRET}',
      'Accept': 'application/json'
    },
    sampleResponse: JSON.stringify({
      domain: "starshippp.com",
      status: "ACTIVE",
      expires: "2028-04-12T00:00:00Z",
      renewAuto: true,
      locked: true,
      privacy: true,
      nameServers: [
        "ns01.domaincontrol.com",
        "ns02.domaincontrol.com"
      ]
    }, null, 2),
    metrics: [
      { label: 'Domain Expiry', value: '748 Days Remaining', isPositive: true },
      { label: 'Status', value: 'LOCKED / ACTIVE', isPositive: true },
      { label: 'Auto-Renew', value: 'ENABLED (ACH)', isPositive: true }
    ]
  },
  {
    id: 'godaddy-dns-records',
    name: 'GoDaddy DNS Zone & Mail Records',
    service: 'GoDaddy DNS / Domain API',
    serviceIconName: 'globe',
    category: 'domain-infra',
    categoryLabel: 'Domain & Infrastructure',
    url: 'https://api.godaddy.com/v1/domains/starshippp.com/records',
    method: 'GET',
    authType: 'API Key',
    status: 'healthy',
    latencyMs: 112,
    uptimePct: 100.0,
    lastChecked: '2m ago',
    rateLimit: { current: 84, max: 600, resetIn: '48m' },
    description: 'Validates production A records, CNAME edge routing, Google Workspace MX records, SPF (v=spf1 include:_spf.google.com ~all), and DKIM 2048-bit security keys.',
    docUrl: 'https://developer.godaddy.com/doc/endpoint/domains',
    envVarRequired: ['VITE_GODADDY_API_KEY', 'VITE_GODADDY_API_SECRET'],
    headers: {
      'Authorization': 'sso-key {API_KEY}:{API_SECRET}',
      'Accept': 'application/json'
    },
    sampleResponse: JSON.stringify({
      records: [
        { type: "A", name: "@", data: "76.76.21.21", ttl: 600 },
        { type: "CNAME", name: "www", data: "starshippp.com", ttl: 3600 },
        { type: "MX", name: "@", data: "aspmx.l.google.com", priority: 1, ttl: 3600 },
        { type: "TXT", name: "@", data: "v=spf1 include:_spf.google.com ~all", ttl: 3600 },
        { type: "TXT", name: "google._domainkey", data: "v=DKIM1; k=rsa; p=MIIBIjANBg...", ttl: 3600 }
      ],
      propagation: "100% Global"
    }, null, 2),
    metrics: [
      { label: 'SPF Verification', value: 'Pass (Google)', isPositive: true },
      { label: 'DKIM Signatures', value: '2048-bit Active', isPositive: true },
      { label: 'DMARC Policy', value: 'p=quarantine', isPositive: true }
    ]
  },
  {
    id: 'godaddy-ssl-cert',
    name: 'GoDaddy Edge SSL / TLS Certificate',
    service: 'GoDaddy Certificate API',
    serviceIconName: 'globe',
    category: 'domain-infra',
    categoryLabel: 'Domain & Infrastructure',
    url: 'https://api.godaddy.com/v1/certificates/starshippp.com',
    method: 'GET',
    authType: 'API Key',
    status: 'healthy',
    latencyMs: 76,
    uptimePct: 100.0,
    lastChecked: '4m ago',
    rateLimit: { current: 23, max: 600, resetIn: '48m' },
    description: 'Tracks wildcard SSL/TLS certificate validity (*.starshippp.com), cipher strength (TLS 1.3), OCSP stapling, and certificate revocation list (CRL).',
    docUrl: 'https://developer.godaddy.com/doc/endpoint/certificates',
    envVarRequired: ['VITE_GODADDY_API_KEY'],
    headers: {
      'Authorization': 'sso-key {API_KEY}:{API_SECRET}'
    },
    sampleResponse: JSON.stringify({
      commonName: "starshippp.com",
      status: "ISSUED",
      validFrom: "2026-01-01T00:00:00Z",
      validTo: "2027-01-01T23:59:59Z",
      issuer: "GoDaddy Secure Certificate Authority - G2",
      signatureAlgorithm: "SHA256withRSA",
      daysUntilExpiration: 279
    }, null, 2),
    metrics: [
      { label: 'Validity Window', value: '279 Days Remaining', isPositive: true },
      { label: 'Cipher Suite', value: 'TLS 1.3 / AES-256', isPositive: true }
    ]
  },

  // ==========================================
  // GOOGLE SUITE (FULL STACK)
  // ==========================================
  {
    id: 'google-search-console-analytics',
    name: 'Google Search Console Search Analytics API',
    service: 'Google Search Console',
    serviceIconName: 'search',
    category: 'google-suite',
    categoryLabel: 'Google Enterprise Stack',
    url: 'https://searchconsole.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fstarshippp.com%2F/searchAnalytics/query',
    method: 'POST',
    authType: 'OAuth 2.0',
    status: 'healthy',
    latencyMs: 148,
    uptimePct: 99.95,
    lastChecked: '1m ago',
    rateLimit: { current: 1240, max: 100000, resetIn: '18h' },
    description: 'Monitors organic organic search clicks, impressions for Pontiac 3PL & Michigan fulfillment keywords, CTR curves, and ranking positions across desktop and mobile.',
    docUrl: 'https://developers.google.com/webmaster-tools/v1/searchanalytics/query',
    envVarRequired: ['VITE_GOOGLE_CLIENT_ID', 'VITE_GOOGLE_CLIENT_SECRET', 'VITE_GOOGLE_REFRESH_TOKEN'],
    headers: {
      'Authorization': 'Bearer ya29.a0AfH6SM...',
      'Content-Type': 'application/json'
    },
    samplePayload: JSON.stringify({
      startDate: "2026-09-01",
      endDate: "2026-09-24",
      dimensions: ["query", "page"],
      rowLimit: 100
    }, null, 2),
    sampleResponse: JSON.stringify({
      rows: [
        { keys: ["pontiac michigan 3pl", "https://starshippp.com/michigan-fulfillment/"], clicks: 842, impressions: 9410, ctr: 0.089, position: 2.1 },
        { keys: ["anti shipbob warehouse", "https://starshippp.com/alternatives/shipbob/"], clicks: 615, impressions: 5320, ctr: 0.115, position: 1.4 },
        { keys: ["tiktok shop fulfillment fast sla", "https://starshippp.com/tiktok-shop-fulfillment/"], clicks: 520, impressions: 6800, ctr: 0.076, position: 2.8 }
      ],
      responseAggregationType: "byProperty"
    }, null, 2),
    metrics: [
      { label: '30-Day Impressions', value: '142,850', change: '+24.6%', isPositive: true },
      { label: 'Avg CTR', value: '7.8%', change: '+1.2%', isPositive: true },
      { label: 'Top 3 Keywords', value: '18 Queries', isPositive: true }
    ]
  },
  {
    id: 'google-search-console-sitemaps',
    name: 'Google Search Console Sitemap & Indexing',
    service: 'Google Search Console',
    serviceIconName: 'search',
    category: 'google-suite',
    categoryLabel: 'Google Enterprise Stack',
    url: 'https://searchconsole.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fstarshippp.com%2F/sitemaps',
    method: 'GET',
    authType: 'OAuth 2.0',
    status: 'healthy',
    latencyMs: 132,
    uptimePct: 100.0,
    lastChecked: '5m ago',
    rateLimit: { current: 15, max: 10000, resetIn: '21h' },
    description: 'Tracks indexing health for /sitemap.xml, verifying that all landing pages and schema markups (JSON-LD LogisticsService) are discovered and indexed with zero crawl anomalies.',
    docUrl: 'https://developers.google.com/webmaster-tools/v1/sitemaps',
    envVarRequired: ['VITE_GOOGLE_CLIENT_ID'],
    headers: {
      'Authorization': 'Bearer ya29.a0AfH6SM...'
    },
    sampleResponse: JSON.stringify({
      sitemap: [
        {
          path: "https://starshippp.com/sitemap.xml",
          lastDownloaded: "2026-09-24T18:14:02Z",
          isPending: false,
          isSitemapsIndex: false,
          type: "WEB",
          lastSubmitted: "2026-09-20T12:00:00Z",
          contents: [
            { type: "web", submitted: "7", indexed: "7", warnings: "0", errors: "0" }
          ]
        }
      ]
    }, null, 2),
    metrics: [
      { label: 'Indexed Pages', value: '7 of 7 Valid', isPositive: true },
      { label: 'Crawl Errors', value: '0 Critical', isPositive: true },
      { label: 'AEO Schema Check', value: '100% Validated', isPositive: true }
    ]
  },
  {
    id: 'google-analytics-realtime',
    name: 'Google Analytics 4 (GA4) Real-Time Data API',
    service: 'Google Analytics (GA4)',
    serviceIconName: 'bar-chart',
    category: 'google-suite',
    categoryLabel: 'Google Enterprise Stack',
    url: 'https://analyticsdata.googleapis.com/v1beta/properties/384910244:runRealtimeReport',
    method: 'POST',
    authType: 'OAuth 2.0',
    status: 'healthy',
    latencyMs: 165,
    uptimePct: 99.98,
    lastChecked: '30s ago',
    rateLimit: { current: 1840, max: 50000, resetIn: '2h' },
    description: 'Streams live concurrent brand visitors, active page telemetry, geographical distribution (Metro Detroit, Chicago, NYC, Los Angeles), and live interactive calculator usage.',
    docUrl: 'https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-basics',
    envVarRequired: ['VITE_GA4_PROPERTY_ID', 'VITE_GOOGLE_SERVICE_ACCOUNT_KEY'],
    headers: {
      'Authorization': 'Bearer ya29.a0AfH6SM...',
      'Content-Type': 'application/json'
    },
    samplePayload: JSON.stringify({
      dimensions: [{ name: "country" }, { name: "unifiedScreenName" }],
      metrics: [{ name: "activeUsers" }]
    }, null, 2),
    sampleResponse: JSON.stringify({
      rows: [
        { dimensionValues: [{ value: "United States" }, { value: "/ (Boutique 3PL Hub)" }], metricValues: [{ value: "19" }] },
        { dimensionValues: [{ value: "United States" }, { value: "/michigan-fulfillment/" }], metricValues: [{ value: "8" }] },
        { dimensionValues: [{ value: "United States" }, { value: "/alternatives/shipbob/" }], metricValues: [{ value: "5" }] },
        { dimensionValues: [{ value: "Canada" }, { value: "/custom-unboxing-3pl/" }], metricValues: [{ value: "2" }] }
      ],
      rowCount: 4,
      totalActiveUsers: 34
    }, null, 2),
    metrics: [
      { label: 'Active Users Now', value: '34 Concurrent', change: '+8', isPositive: true },
      { label: 'DIM Calc Engaged', value: '14 Sessions', isPositive: true },
      { label: 'Avg Eng. Time', value: '4m 18s', isPositive: true }
    ]
  },
  {
    id: 'google-analytics-conversions',
    name: 'Google Analytics 4 Conversion & Funnel Events',
    service: 'Google Analytics (GA4)',
    serviceIconName: 'bar-chart',
    category: 'google-suite',
    categoryLabel: 'Google Enterprise Stack',
    url: 'https://analyticsdata.googleapis.com/v1beta/properties/384910244:runReport',
    method: 'POST',
    authType: 'OAuth 2.0',
    status: 'healthy',
    latencyMs: 189,
    uptimePct: 99.92,
    lastChecked: '3m ago',
    rateLimit: { current: 412, max: 25000, resetIn: '2h' },
    description: 'Measures executive conversion milestones: Quote Submissions (`quote_requested`), Warehouse Tour Bookings (`floor_tour_booked`), and PDF Rate Audit uploads.',
    docUrl: 'https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport',
    envVarRequired: ['VITE_GA4_PROPERTY_ID', 'VITE_GOOGLE_SERVICE_ACCOUNT_KEY'],
    headers: {
      'Authorization': 'Bearer ya29.a0AfH6SM...',
      'Content-Type': 'application/json'
    },
    sampleResponse: JSON.stringify({
      eventCounts: {
        quote_requested: 42,
        floor_tour_booked: 18,
        dim_calc_used: 184,
        invoice_audit_uploaded: 12
      },
      conversionRate: "6.8%"
    }, null, 2),
    metrics: [
      { label: 'Quote Requests (30d)', value: '42 Submissions', change: '+31%', isPositive: true },
      { label: 'Tour Bookings', value: '18 Scheduled', change: '+50%', isPositive: true }
    ]
  },
  {
    id: 'gmail-workspace-profile',
    name: 'Gmail API Workspace Profile & Mailbox Quota',
    service: 'Gmail (Google Workspace)',
    serviceIconName: 'mail',
    category: 'google-suite',
    categoryLabel: 'Google Enterprise Stack',
    url: 'https://gmail.googleapis.com/gmail/v1/users/ops@starshippp.com/profile',
    method: 'GET',
    authType: 'OAuth 2.0',
    status: 'healthy',
    latencyMs: 124,
    uptimePct: 99.99,
    lastChecked: '1m ago',
    rateLimit: { current: 312, max: 15000, resetIn: '1h' },
    description: 'Tracks the operational mailbox ops@starshippp.com storage capacity, message ingress health, and Google Workspace Enterprise quota limits.',
    docUrl: 'https://developers.google.com/gmail/api/reference/rest/v1/users/getProfile',
    envVarRequired: ['VITE_GOOGLE_WORKSPACE_CLIENT_ID', 'VITE_GOOGLE_WORKSPACE_SECRET'],
    headers: {
      'Authorization': 'Bearer ya29.a0AfH6SM...'
    },
    sampleResponse: JSON.stringify({
      emailAddress: "ops@starshippp.com",
      messagesTotal: 14280,
      threadsTotal: 4120,
      historyId: "9842104"
    }, null, 2),
    metrics: [
      { label: 'Mailbox Health', value: 'ops@starshippp.com', isPositive: true },
      { label: 'Storage Used', value: '1.4 GB / 30 GB (4.6%)', isPositive: true },
      { label: 'Daily Ingress', value: '382 emails', isPositive: true }
    ]
  },
  {
    id: 'gmail-dispatch-alert-service',
    name: 'Gmail API Instant Dispatch & SLA Notifier',
    service: 'Gmail (Google Workspace)',
    serviceIconName: 'mail',
    category: 'google-suite',
    categoryLabel: 'Google Enterprise Stack',
    url: 'https://gmail.googleapis.com/gmail/v1/users/ops@starshippp.com/messages/send',
    method: 'POST',
    authType: 'OAuth 2.0',
    status: 'healthy',
    latencyMs: 210,
    uptimePct: 99.98,
    lastChecked: '4m ago',
    rateLimit: { current: 180, max: 2000, resetIn: '1h' },
    description: 'Automated high-priority transactional email engine sending immediate confirmations for quote inquiries, booking ICS attachments, and warehouse floor alerts.',
    docUrl: 'https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send',
    envVarRequired: ['VITE_GOOGLE_WORKSPACE_CLIENT_ID'],
    headers: {
      'Authorization': 'Bearer ya29.a0AfH6SM...',
      'Content-Type': 'application/json'
    },
    samplePayload: JSON.stringify({
      raw: "RnJvbTogb3BzQHN0YXJzaGlwcHAuY29tClRvOiBmb3VuZGVyQGJyYW5kLmNvbQpTdWJqZWN0OiBZb3VyIFBvbnRpYWMgM1BMIFJhdGUgQXVkaXQ..."
    }, null, 2),
    metrics: [
      { label: 'Delivery Rate', value: '99.9%', isPositive: true },
      { label: 'Avg Send Speed', value: '210ms', isPositive: true }
    ]
  },
  {
    id: 'google-calendar-tours',
    name: 'Google Calendar API Executive Tour Bookings',
    service: 'Google Calendar API',
    serviceIconName: 'calendar',
    category: 'google-suite',
    categoryLabel: 'Google Enterprise Stack',
    url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    method: 'GET',
    authType: 'OAuth 2.0',
    status: 'healthy',
    latencyMs: 142,
    uptimePct: 100.0,
    lastChecked: '2m ago',
    rateLimit: { current: 84, max: 10000, resetIn: '24h' },
    description: 'Syncs physical Pontiac warehouse walkthroughs and virtual Google Meet walkthroughs with executive logistics managers, preventing double bookings and allocating floor escorts.',
    docUrl: 'https://developers.google.com/calendar/api/v3/reference/events/list',
    envVarRequired: ['VITE_GOOGLE_CALENDAR_ID', 'VITE_GOOGLE_CLIENT_ID'],
    headers: {
      'Authorization': 'Bearer ya29.a0AfH6SM...'
    },
    sampleResponse: JSON.stringify({
      summary: "Pontiac Hub Executive Walkthroughs",
      items: [
        {
          id: "tour_9812",
          summary: "Warehouse Floor Tour - Apex Athletics (Apparel)",
          start: { dateTime: "2026-09-28T14:00:00-04:00" },
          end: { dateTime: "2026-09-28T15:00:00-04:00" },
          location: "391 E Wilson Ave, Pontiac, MI 48341",
          status: "confirmed"
        }
      ]
    }, null, 2),
    metrics: [
      { label: 'Upcoming Tours', value: '6 This Week', isPositive: true },
      { label: 'Calendar Sync', value: 'Bidirectional (EST)', isPositive: true }
    ]
  },

  // ==========================================
  // TWENTY CRM (twenty.com)
  // ==========================================
  {
    id: 'twenty-crm-contacts',
    name: 'Twenty CRM People & Founder Records API',
    service: 'Twenty CRM (twenty.com)',
    serviceIconName: 'database',
    category: 'crm',
    categoryLabel: 'CRM Engine (Twenty)',
    url: 'https://api.twenty.com/rest/people',
    method: 'GET',
    authType: 'Bearer Token',
    status: 'healthy',
    latencyMs: 178,
    uptimePct: 99.91,
    lastChecked: '30s ago',
    rateLimit: { current: 340, max: 5000, resetIn: '1h' },
    description: 'Core REST endpoint on Twenty CRM powering customer profile ingestion, brand volume tiering, Shopify merchant metadata, and warehouse floor Slack invite automation.',
    docUrl: 'https://twenty.com/developers',
    envVarRequired: ['VITE_TWENTY_API_URL', 'VITE_TWENTY_API_KEY'],
    headers: {
      'Authorization': 'Bearer 20_live_sec_9941a8...',
      'Accept': 'application/json'
    },
    sampleResponse: JSON.stringify({
      data: {
        people: [
          {
            id: "20_usr_4910",
            name: { firstName: "Marcus", lastName: "Vance" },
            emails: { primary: "marcus@apexathleisure.com" },
            company: { name: "Apex Athleisure" },
            customFields: {
              monthlyOrderVolume: "1,200",
              vertical: "Apparel & Fashion",
              currentCarrier: "ShipBob (dissatisfied)",
              slackChannelProvisioned: true
            }
          }
        ]
      }
    }, null, 2),
    metrics: [
      { label: 'Active Pipeline Contacts', value: '184 Founders', isPositive: true },
      { label: 'Sync Status', value: 'Real-time REST', isPositive: true },
      { label: 'Open Opportunities', value: '$34,200 MRR', isPositive: true }
    ]
  },
  {
    id: 'twenty-crm-pipeline',
    name: 'Twenty CRM Opportunities & Deal Pipeline',
    service: 'Twenty CRM (twenty.com)',
    serviceIconName: 'database',
    category: 'crm',
    categoryLabel: 'CRM Engine (Twenty)',
    url: 'https://api.twenty.com/rest/opportunities',
    method: 'GET',
    authType: 'Bearer Token',
    status: 'healthy',
    latencyMs: 195,
    uptimePct: 99.88,
    lastChecked: '2m ago',
    rateLimit: { current: 210, max: 5000, resetIn: '1h' },
    description: 'Tracks commercial deal progression across 5 logistics pipeline stages: Inbound Lead -> Rate Audit -> Pontiac Floor Tour -> Proposal -> Active Onboarding.',
    docUrl: 'https://twenty.com/developers',
    envVarRequired: ['VITE_TWENTY_API_URL', 'VITE_TWENTY_API_KEY'],
    headers: {
      'Authorization': 'Bearer 20_live_sec_9941a8...'
    },
    sampleResponse: JSON.stringify({
      stages: [
        { stage: "Rate Audit Requested", count: 14, estimatedMonthlyOrders: 18400 },
        { stage: "Floor Tour Scheduled", count: 6, estimatedMonthlyOrders: 9200 },
        { stage: "Contract Sent (Zero Min)", count: 4, estimatedMonthlyOrders: 6400 },
        { stage: "Live Fulfillment Active", count: 28, estimatedMonthlyOrders: 42100 }
      ]
    }, null, 2),
    metrics: [
      { label: 'Active Deals', value: '24 In-Flight', change: '+4 this week', isPositive: true },
      { label: 'Win Rate', value: '62.4%', isPositive: true }
    ]
  },
  {
    id: 'twenty-crm-webhooks',
    name: 'Twenty CRM Inbound Lead Webhook Receiver',
    service: 'Twenty CRM (twenty.com)',
    serviceIconName: 'database',
    category: 'crm',
    categoryLabel: 'CRM Engine (Twenty)',
    url: 'https://api.twenty.com/rest/webhooks/leads',
    method: 'POST',
    authType: 'Webhook Secret',
    status: 'healthy',
    latencyMs: 110,
    uptimePct: 100.0,
    lastChecked: '1m ago',
    rateLimit: { current: 58, max: 1000, resetIn: '15m' },
    description: 'Direct ingestion webhook receiving quote submissions and invoice audit files from the Starshippp website, instantly triggering founder records and floor Slack notifications.',
    docUrl: 'https://twenty.com/developers',
    envVarRequired: ['VITE_TWENTY_WEBHOOK_SECRET'],
    headers: {
      'X-Twenty-Signature': 'sha256=9b2401f8e2...',
      'Content-Type': 'application/json'
    },
    samplePayload: JSON.stringify({
      event: "website.quote_submitted",
      data: {
        brandName: "Sol Skincare",
        founderEmail: "elena@solskin.co",
        monthlyOrders: "2,000",
        services: ["Lot Tracking", "Same-Day Dispatch", "Custom Tissue"]
      }
    }, null, 2),
    metrics: [
      { label: 'Webhook Latency', value: '110ms', isPositive: true },
      { label: 'Zero Failures', value: '0 Retries (24h)', isPositive: true }
    ]
  },

  // ==========================================
  // XERO ACCOUNTING & BILLING PLATFORM
  // ==========================================
  {
    id: 'xero-invoices-billing',
    name: 'Xero Invoices & Merchant 3PL Billing',
    service: 'Xero Accounting Platform',
    serviceIconName: 'dollar',
    category: 'accounting',
    categoryLabel: 'Accounting & Billing (Xero)',
    url: 'https://api.xero.com/api.xro/2.0/Invoices',
    method: 'GET',
    authType: 'OAuth 2.0',
    status: 'healthy',
    latencyMs: 230,
    uptimePct: 99.94,
    lastChecked: '1m ago',
    rateLimit: { current: 18, max: 60, resetIn: '42s' },
    description: 'Powers automated bi-weekly client billing for pick-and-pack labor, warehouse pallet/bin storage, and packaging supply consumption with zero hidden fees.',
    docUrl: 'https://developer.xero.com/documentation/api/accounting/invoices',
    envVarRequired: ['VITE_XERO_CLIENT_ID', 'VITE_XERO_CLIENT_SECRET', 'VITE_XERO_TENANT_ID'],
    headers: {
      'Authorization': 'Bearer xero_tok_841029...',
      'Xero-tenant-id': '7b919240-8812-4f12-a102-...'
    },
    sampleResponse: JSON.stringify({
      Invoices: [
        {
          InvoiceID: "9b3191-491-fa",
          InvoiceNumber: "INV-2026-0914",
          Type: "ACCREC",
          Contact: { Name: "Apex Athleisure LLC" },
          Date: "2026-09-20",
          DueDate: "2026-09-27",
          Status: "AUTHORISED",
          LineItems: [
            { Description: "Order Pick & Pack (840 orders @ $2.20)", Quantity: 840, UnitAmount: 2.20 },
            { Description: "Pallet Racking Storage (4 standard pallets)", Quantity: 4, UnitAmount: 22.00 }
          ],
          Total: 1936.00,
          AmountDue: 0.00,
          AmountPaid: 1936.00
        }
      ]
    }, null, 2),
    metrics: [
      { label: 'Monthly Billing', value: '$84,200 Processed', change: '+18.4%', isPositive: true },
      { label: 'Auto-Pay Health', value: '100% ACH Settled', isPositive: true },
      { label: 'Dispute Rate', value: '0.00%', isPositive: true }
    ]
  },
  {
    id: 'xero-postage-pass-through',
    name: 'Xero Carrier Postage Pass-Through Ledger',
    service: 'Xero Accounting Platform',
    serviceIconName: 'dollar',
    category: 'accounting',
    categoryLabel: 'Accounting & Billing (Xero)',
    url: 'https://api.xero.com/api.xro/2.0/BankTransactions',
    method: 'GET',
    authType: 'OAuth 2.0',
    status: 'healthy',
    latencyMs: 245,
    uptimePct: 99.9,
    lastChecked: '3m ago',
    rateLimit: { current: 12, max: 60, resetIn: '42s' },
    description: 'Tracks carrier label pass-through charges (UPS Commercial Plus, FedEx Home Delivery Tier-1, USPS Ground Advantage) against brand prepaid escrow deposits.',
    docUrl: 'https://developer.xero.com/documentation/api/accounting/banktransactions',
    envVarRequired: ['VITE_XERO_CLIENT_ID', 'VITE_XERO_TENANT_ID'],
    headers: {
      'Authorization': 'Bearer xero_tok_841029...',
      'Xero-tenant-id': '7b919240-8812-4f12-a102-...'
    },
    sampleResponse: JSON.stringify({
      BankTransactions: [
        {
          Type: "SPEND",
          Contact: { Name: "United Parcel Service (Direct Commercial Account)" },
          Total: 4182.40,
          Status: "AUTHORISED",
          Reference: "UPS-DAILY-DISPATCH-924"
        },
        {
          Type: "RECEIVE",
          Contact: { Name: "Brand Escrow Replenishment - Stripe" },
          Total: 5000.00,
          Status: "AUTHORISED",
          Reference: "AUTO-ACH-ESCROW-TOPUP"
        }
      ]
    }, null, 2),
    metrics: [
      { label: 'Carrier Daily Spend', value: '$4,182.40', isPositive: true },
      { label: 'Escrow Reserves', value: '$68,400 Healthy', isPositive: true }
    ]
  },
  {
    id: 'xero-profit-loss',
    name: 'Xero Executive Profit & Loss Telemetry',
    service: 'Xero Accounting Platform',
    serviceIconName: 'dollar',
    category: 'accounting',
    categoryLabel: 'Accounting & Billing (Xero)',
    url: 'https://api.xero.com/api.xro/2.0/Reports/ProfitAndLoss',
    method: 'GET',
    authType: 'OAuth 2.0',
    status: 'healthy',
    latencyMs: 310,
    uptimePct: 99.85,
    lastChecked: '6m ago',
    rateLimit: { current: 6, max: 60, resetIn: '42s' },
    description: 'Live executive view of Starshippp gross operational margins, warehouse labor efficiency ratio, packaging materials margin, and facilities overhead.',
    docUrl: 'https://developer.xero.com/documentation/api/accounting/reports#profit-and-loss',
    envVarRequired: ['VITE_XERO_CLIENT_ID', 'VITE_XERO_TENANT_ID'],
    headers: {
      'Authorization': 'Bearer xero_tok_841029...'
    },
    sampleResponse: JSON.stringify({
      ReportName: "Profit and Loss - Pontiac Hub",
      Period: "Current Month MTD",
      GrossProfitMargin: "48.2%",
      FulfillmentRevenue: 94800,
      PostagePassThrough: 118400,
      WarehouseLaborCOGS: 38200,
      NetOperatingIncome: 34100
    }, null, 2),
    metrics: [
      { label: 'Gross Fulfillment Margin', value: '48.2%', change: '+3.1%', isPositive: true },
      { label: 'Labor Efficiency Index', value: '1.84x Target', isPositive: true }
    ]
  },

  // ==========================================
  // UPCOMING LOGISTICS SOFTWARE INGESTION
  // ==========================================
  {
    id: 'logistics-wms-sync',
    name: 'Logistics WMS Ingestion Pipeline (Staged)',
    service: 'Starshippp Ingestion Engine',
    serviceIconName: 'truck',
    category: 'logistics-ingestion',
    categoryLabel: 'Logistics Ingestion Pipeline',
    url: 'https://api.starshippp.internal/v1/ingestion/wms-sync',
    method: 'POST',
    authType: 'mTLS',
    status: 'staged',
    latencyMs: 42,
    uptimePct: 99.99,
    lastChecked: 'Awaiting deployment',
    rateLimit: { current: 0, max: 100000, resetIn: 'Ready' },
    description: 'High-throughput ingestion bridge staging existing proprietary company software, warehouse floor scanners, and legacy logistics databases into the unified management portal.',
    docUrl: '#',
    envVarRequired: ['VITE_INTERNAL_INGESTION_KEY', 'VITE_WMS_MTLS_CERT'],
    headers: {
      'X-Internal-Token': 'ingest_sec_staging_9918...',
      'Content-Type': 'application/json'
    },
    samplePayload: JSON.stringify({
      sourceSystem: "LegacyCompanyLogisticsERP",
      targetHub: "Pontiac_Hub_01",
      syncMode: "CDC_STREAM",
      entities: ["orders", "inventory_bins", "carrier_manifests", "barcode_scans"]
    }, null, 2),
    sampleResponse: JSON.stringify({
      status: "INGESTION_STAGED",
      architecture: "Kafka/EventBridge buffer ready",
      endpointsPrepared: 12,
      pendingIngestion: true
    }, null, 2),
    metrics: [
      { label: 'Architecture Ready', value: 'Stage 1 Configured', isPositive: true },
      { label: 'Throughput Cap', value: '5,000 events/sec', isPositive: true },
      { label: 'Status', value: 'Ready to ingest', isPositive: true }
    ]
  },
  {
    id: 'logistics-order-dispatch-hook',
    name: 'Floor Pick-Pack Order Dispatch Webhook Buffer',
    service: 'Starshippp Ingestion Engine',
    serviceIconName: 'truck',
    category: 'logistics-ingestion',
    categoryLabel: 'Logistics Ingestion Pipeline',
    url: 'https://api.starshippp.internal/v1/ingestion/orders',
    method: 'POST',
    authType: 'Bearer Token',
    status: 'staged',
    latencyMs: 38,
    uptimePct: 100.0,
    lastChecked: 'Awaiting deployment',
    rateLimit: { current: 0, max: 250000, resetIn: 'Ready' },
    description: 'Buffering layer designed to capture outbound label prints, scale weights, barcode validations, and same-day 1:00 PM cutoff compliance metrics from Pontiac pack stations.',
    docUrl: '#',
    envVarRequired: ['VITE_INTERNAL_DISPATCH_SECRET'],
    headers: {
      'Authorization': 'Bearer dispatch_stage_key_01'
    },
    metrics: [
      { label: 'SLA Engine', value: '1:00 PM EST Cutoff Hook', isPositive: true },
      { label: 'Pack Station Nodes', value: '8 Physical Stations', isPositive: true }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'log-1',
    timestamp: '14:04:12 EST',
    service: 'Google Analytics 4',
    action: 'POST /v1beta/properties/384910244:runRealtimeReport',
    status: '200 OK',
    latencyMs: 165,
    initiator: 'GA4 Realtime Poller'
  },
  {
    id: 'log-2',
    timestamp: '14:03:55 EST',
    service: 'Twenty CRM',
    action: 'POST /rest/webhooks/leads [Brand: Apex Athleisure]',
    status: '201 Created',
    latencyMs: 110,
    initiator: 'Website Quote Form'
  },
  {
    id: 'log-3',
    timestamp: '14:03:10 EST',
    service: 'GoDaddy DNS',
    action: 'GET /v1/domains/starshippp.com/records',
    status: '200 OK',
    latencyMs: 112,
    initiator: 'DNS Health Probe'
  },
  {
    id: 'log-4',
    timestamp: '14:01:40 EST',
    service: 'Xero Accounting',
    action: 'GET /api.xro/2.0/Invoices?Statuses=AUTHORISED',
    status: '200 OK',
    latencyMs: 230,
    initiator: 'Executive AR Sync'
  },
  {
    id: 'log-5',
    timestamp: '14:00:02 EST',
    service: 'Gmail API',
    action: 'GET /gmail/v1/users/ops@starshippp.com/profile',
    status: '200 OK',
    latencyMs: 124,
    initiator: 'SLA Floor Heartbeat'
  },
  {
    id: 'log-6',
    timestamp: '13:58:30 EST',
    service: 'Google Calendar',
    action: 'GET /calendar/v3/calendars/primary/events',
    status: '200 OK',
    latencyMs: 142,
    initiator: 'Tour Scheduler Sync'
  },
  {
    id: 'log-7',
    timestamp: '13:55:18 EST',
    service: 'Google Search Console',
    action: 'POST /webmasters/v3/sites/.../searchAnalytics/query',
    status: '200 OK',
    latencyMs: 148,
    initiator: 'Organic Traffic Telemetry'
  },
  {
    id: 'log-8',
    timestamp: '13:50:00 EST',
    service: 'GoDaddy SSL',
    action: 'GET /v1/certificates/starshippp.com',
    status: '200 OK',
    latencyMs: 76,
    initiator: 'TLS Expiry Monitor'
  }
];

export const INITIAL_CREDENTIALS: ApiCredentialSummary[] = [
  {
    name: 'GoDaddy Personal Access Token (PAT)',
    envVar: 'VITE_GODADDY_PAT',
    service: 'GoDaddy DNS & Domains',
    status: 'configured',
    expiresIn: 'Active Personal Access Token',
    maskedKey: 'gd_pat_SBU8••••••••••••••89fa',
    lastRotated: '2026-09-25',
    scope: 'domains:read, domains:write, certificates:read, dns:manage'
  },
  {
    name: 'Google Workspace & Cloud OAuth2 Service Account',
    envVar: 'VITE_GOOGLE_SERVICE_ACCOUNT_KEY',
    service: 'Google Search Console / GA4 / Gmail / Calendar',
    status: 'configured',
    expiresIn: 'Automatic Token Refresh (Active)',
    maskedKey: 'gcp-sa-starshippp-ops••••••••.json',
    lastRotated: '2026-09-01',
    scope: 'webmasters.readonly, analytics.readonly, gmail.send, calendar.events'
  },
  {
    name: 'Twenty CRM Secret Key',
    envVar: 'VITE_TWENTY_API_KEY',
    service: 'Twenty CRM (twenty.com)',
    status: 'configured',
    expiresIn: 'Permanent Secret',
    maskedKey: '20_sec_live_99••••••••••••382a',
    lastRotated: '2026-09-10',
    scope: 'people:all, opportunities:all, webhooks:write'
  },
  {
    name: 'Xero Accounting OAuth 2.0 Credentials',
    envVar: 'VITE_XERO_CLIENT_SECRET',
    service: 'Xero Accounting Platform',
    status: 'configured',
    expiresIn: 'Refresh Token Valid (58 days)',
    maskedKey: 'xr_sec_99182••••••••••••0129',
    lastRotated: '2026-09-18',
    scope: 'accounting.transactions, accounting.reports.read, accounting.contacts'
  },
  {
    name: 'Logistics WMS Ingestion mTLS Key (Staged)',
    envVar: 'VITE_INTERNAL_INGESTION_KEY',
    service: 'Internal Logistics Software Bridge',
    status: 'pending',
    expiresIn: 'Pending System Ingestion',
    maskedKey: 'int_wms_stage_••••••••••001',
    lastRotated: 'Pending Ingestion',
    scope: 'wms:internal, order:dispatch, inventory:sync'
  }
];
