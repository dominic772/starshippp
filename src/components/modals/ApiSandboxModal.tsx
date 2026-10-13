import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  Code2, 
  RotateCw, 
  Zap, 
  ShieldCheck, 
  Package, 
  Printer, 
  Anchor, 
  CreditCard 
} from 'lucide-react';

interface ApiSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEndpoint?: string;
}

type HttpMethod = 'GET' | 'POST';

interface EndpointSpec {
  id: string;
  name: string;
  method: HttpMethod;
  path: string;
  category: string;
  icon: React.ElementType;
  description: string;
  defaultPayload?: Record<string, unknown>;
  generateResponse: (payload?: Record<string, unknown>) => Record<string, unknown>;
}

export const ENDPOINT_SPECS: EndpointSpec[] = [
  {
    id: 'dim-arbitrage',
    name: 'Calculate DIM Arbitrage Rate',
    method: 'POST',
    path: '/v1/rates/dim-arbitrage',
    category: 'Postage & DIM Engine',
    icon: Package,
    description: 'Calculates dimensional weight arbitrage comparing standard commercial divisor (139) against Starshippp negotiated contract divisor (250).',
    defaultPayload: {
      origin_zip: "48341", // Pontiac, MI
      destination_zip: "90210",
      carrier_service: "USPS_GROUND_ADVANTAGE",
      package: {
        length_inches: 40,
        width_inches: 20,
        height_inches: 20,
        scale_weight_lbs: 14.5
      }
    },
    generateResponse: (payload) => {
      const pkg = (payload?.package as Record<string, number>) || { length_inches: 40, width_inches: 20, height_inches: 20, scale_weight_lbs: 14.5 };
      const cubicInches = (pkg.length_inches || 40) * (pkg.width_inches || 20) * (pkg.height_inches || 20);
      const standardDimWeight = Math.ceil(cubicInches / 139);
      const starshipppDimWeight = Math.ceil(cubicInches / 250);
      const scaleWeight = pkg.scale_weight_lbs || 14.5;
      
      const billableStandard = Math.max(scaleWeight, standardDimWeight);
      const billableStarshippp = Math.max(scaleWeight, starshipppDimWeight);
      
      const standardCost = Number((billableStandard * 0.68 + 14.20).toFixed(2));
      const starshipppCost = Number((billableStarshippp * 0.68 + 14.20).toFixed(2));
      const dollarSavings = Number((standardCost - starshipppCost).toFixed(2));
      const percentSavings = Number(((dollarSavings / standardCost) * 100).toFixed(1));

      return {
        status: "success",
        timestamp: new Date().toISOString(),
        cubic_dimensions: {
          length_in: pkg.length_inches,
          width_in: pkg.width_inches,
          height_in: pkg.height_inches,
          total_cubic_inches: cubicInches,
          total_cubic_feet: Number((cubicInches / 1728).toFixed(2))
        },
        weights: {
          scale_actual_lbs: scaleWeight,
          carrier_standard_divisor: 139,
          carrier_standard_billable_lbs: billableStandard,
          starshippp_contract_divisor: 250,
          starshippp_contract_billable_lbs: billableStarshippp,
          weight_relief_lbs: billableStandard - billableStarshippp
        },
        arbitrage_comparison: {
          carrier_rack_estimated_cost_usd: standardCost,
          starshippp_commercial_cost_usd: starshipppCost,
          net_postage_savings_usd: dollarSavings,
          savings_percentage: `${percentSavings}%`
        },
        dispatch_facility: "Pontiac Central Hub (48341)",
        recommendation: "Approved for Tier-1 Commercial Ground Advantage injection."
      };
    }
  },
  {
    id: 'orders-dispatch',
    name: 'Create & Dispatch Order',
    method: 'POST',
    path: '/v1/orders/dispatch',
    category: 'Warehouse Floor Ops',
    icon: Zap,
    description: 'Injects an e-commerce order with custom luxury kitting instructions directly into the Pontiac pack bench queue.',
    defaultPayload: {
      client_id: "cl_starship_nastyhawgs",
      order_number: "ORD-94218-MI",
      recipient: {
        name: "Marcus Vance",
        address_line1: "1840 Woodward Ave",
        city: "Detroit",
        state: "MI",
        zip: "48226",
        country: "US"
      },
      line_items: [
        { sku: "NH-HANDLEBAR-APE-16IN", quantity: 1, declared_value_usd: 249.00 },
        { sku: "NH-GRIP-SET-ALUM", quantity: 1, declared_value_usd: 89.00 }
      ],
      packaging_instructions: {
        box_profile: "OVERSIZE_40x20x10",
        custom_unboxing: ["branded_black_tissue", "custom_die_cut_sticker", "wax_seal_stamp"],
        slack_alert_on_pack: true
      }
    },
    generateResponse: (payload) => {
      const orderNum = (payload?.order_number as string) || "ORD-94218-MI";
      return {
        status: "queued_for_fulfillment",
        order_id: `shp_${Math.random().toString(36).substring(2, 10)}`,
        order_number: orderNum,
        fulfillment_zone: "Zone 1 (Pontiac Local Injection - 1 Day Ground)",
        allocated_bench: "Bench 04 - High-Cube Oversized",
        floor_lead: "Marcus T. (Pontiac Ops)",
        slack_notification_channel: "#starshippp-ops-floor",
        kitting_manifest: [
          { item: "Branded Black Tissue Paper (Single Wrap)", status: "staged" },
          { item: "Custom Die-Cut Vinyl Sticker Insert", status: "staged" },
          { item: "Handcrafted Wax Seal Stamp", status: "staged" }
        ],
        carrier_assignment: {
          carrier: "USPS Ground Advantage Commercial Plus",
          estimated_dispatch_cutoff: "Today 1:00 PM EST",
          tracking_pre_allocation: `9400111899562810${Math.floor(100000 + Math.random() * 900000)}`
        },
        routing_sla: "Same-Day Dispatch Guaranteed"
      };
    }
  },
  {
    id: 'pod-queue',
    name: 'Queue On-Demand Print Job',
    method: 'POST',
    path: '/v1/pod/queue-job',
    category: 'In-House Print on Demand',
    icon: Printer,
    description: 'Submits an apparel or sticker print job directly to our Pontiac warehouse floor direct-to-garment & vinyl printing stations.',
    defaultPayload: {
      merchant_id: "merch_starship_velocity",
      job_type: "DIRECT_TO_GARMENT",
      garment_spec: {
        blank_sku: "GILDAN-HAMMER-TEE-BLK",
        size: "XL",
        color: "Pitch Black",
        print_location: "FRONT_CHEST_AND_BACK"
      },
      artwork: {
        front_art_url: "https://assets.starshippp.com/demo/distressed-starship-logo.png",
        dpi: 300,
        curing_temp_f: 320
      },
      kitting_merge_order_id: "ORD-94218-MI"
    },
    generateResponse: (payload) => {
      const garment = (payload?.garment_spec as Record<string, string>) || {};
      return {
        status: "in_production_queue",
        job_id: `pod_${Math.random().toString(36).substring(2, 9)}`,
        print_queue_position: 2,
        estimated_cycle_time_seconds: 195,
        printer_station: "Pontiac DTG Station Alpha (Epson SureColor F3070 Dual-Platen)",
        garment_staged: `${garment.blank_sku || 'GILDAN-HAMMER-TEE-BLK'} (${garment.size || 'XL'})`,
        pre_treatment_status: "verified_dry",
        curing_tunnel_assigned: "Tunnel #1 (Infrared Precision)",
        unit_manufacturing_cost_usd: 5.40,
        printful_comparative_cost_usd: 12.95,
        unit_merchant_savings_usd: 7.55,
        post_print_action: "Auto-transfer to Packing Bench 04 for same-day package consolidation"
      };
    }
  },
  {
    id: 'ftz-micro-release',
    name: 'Bonded FTZ Micro-Release',
    method: 'POST',
    path: '/v1/ftz/micro-release',
    category: 'Foreign Trade Zone (FTZ)',
    icon: Anchor,
    description: 'Micro-releases cartons or pallets from the bonded customs zone as items sell, deferring duty on the remaining shipment for up to 2 years.',
    defaultPayload: {
      bond_entry_number: "FTZ-2026-MI-00892",
      container_bill_of_lading: "MSKU982104921",
      country_of_origin: "CN",
      release_scope: "CARTON_MICRO_RELEASE",
      cartons_to_release: 3,
      total_cartons_in_bond: 480,
      carton_unit_sku: "MOTO-CYLINDER-HEAD-CNC",
      units_per_carton: 8,
      declared_unit_customs_value_usd: 85.00,
      harmonized_tariff_code: "8714.10.0050",
      duty_rate_percentage: 6.5
    },
    generateResponse: (payload) => {
      const cartons = Number(payload?.cartons_to_release) || 3;
      const totalCartons = Number(payload?.total_cartons_in_bond) || 480;
      const unitsPerCarton = Number(payload?.units_per_carton) || 8;
      const unitValue = Number(payload?.declared_unit_customs_value_usd) || 85.00;
      const dutyRate = Number(payload?.duty_rate_percentage) || 6.5;

      const releasedUnits = cartons * unitsPerCarton;
      const releasedCustomsValue = releasedUnits * unitValue;
      const dutyDueOnReleased = Number(((releasedCustomsValue * dutyRate) / 100).toFixed(2));

      const totalRemainingCartons = totalCartons - cartons;
      const deferredDutySavings = Number((((totalRemainingCartons * unitsPerCarton * unitValue) * dutyRate) / 100).toFixed(2));

      return {
        status: "customs_micro_release_authorized",
        clearance_id: `cbp_ftz_${Math.random().toString(36).substring(2, 9)}`,
        timestamp: new Date().toISOString(),
        bonded_facility: "Pontiac Foreign Trade Zone #70 Sub-Zone",
        cbp_form_reference: "CBP Form 214 / 7501 Micro-Permit",
        release_metrics: {
          cartons_cleared: cartons,
          total_units_unlocked: releasedUnits,
          declared_customs_value_usd: releasedCustomsValue,
          duty_payable_now_usd: dutyDueOnReleased
        },
        working_capital_advantage: {
          remaining_cartons_in_bond: totalRemainingCartons,
          total_duty_currently_deferred_usd: deferredDutySavings,
          max_deferral_period: "2 Years from Bill of Lading Intake",
          cash_flow_benefit_narrative: `You only paid $${dutyDueOnReleased.toFixed(2)} in duty for the ${cartons} cartons being sold today. Your remaining $${deferredDutySavings.toLocaleString()} in import duty stays completely deferred in our bonded facility.`
        },
        floor_action: "Quarantine tag removed. Cartons transferred to active pick bin B-12-04."
      };
    }
  },
  {
    id: 'merchant-wallet',
    name: 'Get Merchant Wallet & Telemetry',
    method: 'GET',
    path: '/v1/merchants/wallet/telemetry',
    category: 'Billing & Payment Processors',
    icon: CreditCard,
    description: 'Retrieves merchant prepaid postage balance, automated ACH replenishment status, and bi-directional Xero reconciliation records.',
    defaultPayload: undefined,
    generateResponse: () => {
      return {
        status: "healthy",
        merchant_account: {
          id: "mch_starship_4812",
          business_name: "Nasty Hawgs Motorcycle Works LLC",
          tier: "Tier-1 Commercial (Divisor 250 Active)",
          monthly_account_minimum_usd: 250.00,
          current_month_accumulated_fees_usd: 482.50,
          minimum_fee_satisfied: true
        },
        wallet_balances: {
          current_available_postage_balance_usd: 1842.10,
          auto_replenish_enabled: true,
          low_balance_trigger_usd: 500.00,
          replenish_amount_usd: 2000.00,
          primary_payment_method: "ACH Direct Debit (JPMorgan Chase ****4918)",
          backup_payment_method: "Stripe Card Processing (Amex Commercial ****1004)"
        },
        xero_integration: {
          status: "connected_and_synced",
          last_invoice_reconciled: new Date(Date.now() - 3600000 * 4).toISOString(),
          unbilled_carrier_postage_pass_through_usd: 312.40,
          sync_frequency: "Every 60 Minutes"
        },
        compliance: {
          pci_dss_level: "Level 1 Compliant",
          mtls_device_enforcement: "Enabled on Pontiac Floor"
        }
      };
    }
  }
];

export const ApiSandboxModal: React.FC<ApiSandboxModalProps> = ({
  isOpen,
  onClose,
  initialEndpoint
}) => {
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>(initialEndpoint || 'dim-arbitrage');
  const [apiKey, setApiKey] = useState<string>('sk_live_starship_9f4b82c1e847a9d3');
  const [requestPayloadText, setRequestPayloadText] = useState<string>(() => {
    const ep = ENDPOINT_SPECS.find(e => e.id === (initialEndpoint || 'dim-arbitrage'));
    return ep?.defaultPayload ? JSON.stringify(ep.defaultPayload, null, 2) : '';
  });
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [activeCodeLang, setActiveCodeLang] = useState<'curl' | 'typescript' | 'python' | 'go'>('curl');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentEndpoint = ENDPOINT_SPECS.find(e => e.id === selectedEndpointId) || ENDPOINT_SPECS[0];

  const handleSelectEndpoint = (ep: EndpointSpec) => {
    setSelectedEndpointId(ep.id);
    setRequestPayloadText(ep.defaultPayload ? JSON.stringify(ep.defaultPayload, null, 2) : '');
    setResponseOutput(null);
    setLatencyMs(null);
  };

  const handleGenerateNewKey = () => {
    const chars = '0123456789abcdef';
    let newKey = 'sk_live_starship_';
    for (let i = 0; i < 16; i++) {
      newKey += chars[Math.floor(Math.random() * chars.length)];
    }
    setApiKey(newKey);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleExecuteRequest = async () => {
    setIsLoading(true);
    setResponseOutput(null);

    // Simulate network round-trip latency
    const simulatedLatency = Math.floor(18 + Math.random() * 24);
    await new Promise((resolve) => setTimeout(resolve, simulatedLatency * 12));

    try {
      let parsedPayload: Record<string, unknown> | undefined = undefined;
      if (currentEndpoint.method === 'POST' && requestPayloadText.trim()) {
        parsedPayload = JSON.parse(requestPayloadText);
      }
      const responseData = currentEndpoint.generateResponse(parsedPayload);
      setResponseOutput(JSON.stringify(responseData, null, 2));
      setLatencyMs(simulatedLatency);
    } catch {
      setResponseOutput(JSON.stringify({
        error: "Bad Request",
        message: "Malformed JSON payload in request body.",
        code: 400
      }, null, 2));
      setLatencyMs(8);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCodeSnippet = () => {
    const baseUrl = 'https://api.starshippp.com';
    const endpointPath = currentEndpoint.path;
    const bodyStr = requestPayloadText.trim();

    switch (activeCodeLang) {
      case 'curl':
        if (currentEndpoint.method === 'GET') {
          return `curl -X GET "${baseUrl}${endpointPath}" \\\n  -H "Authorization: Bearer ${apiKey}" \\\n  -H "Accept: application/json"`;
        }
        return `curl -X POST "${baseUrl}${endpointPath}" \\\n  -H "Authorization: Bearer ${apiKey}" \\\n  -H "Content-Type: application/json" \\\n  -d '${bodyStr.replace(/'/g, "'\\''")}'`;

      case 'typescript':
        if (currentEndpoint.method === 'GET') {
          return `import axios from 'axios';\n\nconst response = await axios.get('${baseUrl}${endpointPath}', {\n  headers: {\n    'Authorization': 'Bearer ${apiKey}',\n    'Accept': 'application/json'\n  }\n});\nconsole.log(response.data);`;
        }
        return `import axios from 'axios';\n\nconst payload = ${bodyStr || '{}'};\n\nconst response = await axios.post(\n  '${baseUrl}${endpointPath}',\n  payload,\n  {\n    headers: {\n      'Authorization': 'Bearer ${apiKey}',\n      'Content-Type': 'application/json'\n    }\n  }\n);\nconsole.log(response.data);`;

      case 'python':
        if (currentEndpoint.method === 'GET') {
          return `import requests\n\nheaders = {\n    "Authorization": "Bearer ${apiKey}",\n    "Accept": "application/json"\n}\nresponse = requests.get("${baseUrl}${endpointPath}", headers=headers)\nprint(response.json())`;
        }
        return `import requests\n\npayload = ${bodyStr || '{}'}\nheaders = {\n    "Authorization": "Bearer ${apiKey}",\n    "Content-Type": "application/json"\n}\nresponse = requests.post(\n    "${baseUrl}${endpointPath}",\n    json=payload,\n    headers=headers\n)\nprint(response.json())`;

      case 'go':
        return `// Go Client Example\npackage main\n\nimport (\n    "fmt"\n    "net/http"\n    "io/ioutil"\n)\n\nfunc main() {\n    req, _ := http.NewRequest("${currentEndpoint.method}", "${baseUrl}${endpointPath}", nil)\n    req.Header.Set("Authorization", "Bearer ${apiKey}")\n    resp, err := http.DefaultClient.Do(req)\n    if err != nil { panic(err) }\n    defer resp.Body.Close()\n    body, _ := ioutil.ReadAll(resp.Body)\n    fmt.Println(string(body))\n}`;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(3, 5, 12, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: 1180,
          maxHeight: '92vh',
          backgroundColor: '#070C1B',
          border: '1px solid rgba(255, 107, 0, 0.45)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.85), 0 0 40px rgba(255, 107, 0, 0.15)',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '1.1rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0A1024',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 6,
                backgroundColor: 'rgba(255, 107, 0, 0.15)',
                border: '1px solid rgba(255, 107, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FF8500',
              }}
            >
              <Terminal size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
                  Starshippp Open Logistics API Playground
                </h2>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'rgba(52, 211, 153, 0.15)',
                    color: '#34D399',
                    border: '1px solid rgba(52, 211, 153, 0.4)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 3,
                    fontWeight: 700,
                  }}
                >
                  LIVE v2.4 SANDBOX
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Test production endpoints for negotiated Divisor 250 DIM rates, floor dispatch, POD routing, and bonded FTZ customs micro-releases.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              transition: 'color 0.15s ease',
            }}
            aria-label="Close API Sandbox"
          >
            <X size={22} />
          </button>
        </div>

        {/* API Key Inspector Bar */}
        <div
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#050811',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 280 }}>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Mock API Key:
            </span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 107, 0, 0.35)',
                padding: '0.35rem 0.75rem',
                borderRadius: 4,
                color: '#FFA733',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <ShieldCheck size={14} color="#34D399" />
              <span>{apiKey}</span>
            </div>
            <button
              onClick={handleCopyKey}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: copiedKey ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${copiedKey ? '#34D399' : 'rgba(255, 255, 255, 0.15)'}`,
                color: copiedKey ? '#34D399' : '#fff',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.35rem 0.65rem',
                borderRadius: 4,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {copiedKey ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedKey ? 'Copied!' : 'Copy Key'}</span>
            </button>
            <button
              onClick={handleGenerateNewKey}
              title="Rotate / generate new mock token"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.35rem',
                borderRadius: 4,
              }}
            >
              <RotateCw size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              Environment: <strong style={{ color: '#38BDF8' }}>api.starshippp.com (Sandbox Mode)</strong>
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              Rate Limit: <strong style={{ color: '#34D399' }}>1,200 req/min</strong>
            </span>
          </div>
        </div>

        {/* Main Sandbox Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '290px 1fr',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {/* Left Sidebar: Endpoints List */}
          <div
            style={{
              backgroundColor: '#080D1E',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              overflowY: 'auto',
              padding: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.25rem 0.5rem' }}>
              Select Operational API Route
            </div>

            {ENDPOINT_SPECS.map((ep) => {
              const IconComp = ep.icon;
              const isSelected = ep.id === selectedEndpointId;
              return (
                <button
                  key={ep.id}
                  onClick={() => handleSelectEndpoint(ep)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.25rem',
                    padding: '0.65rem 0.75rem',
                    borderRadius: 6,
                    backgroundColor: isSelected ? 'rgba(255, 107, 0, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${isSelected ? 'rgba(255, 107, 0, 0.5)' : 'transparent'}`,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', width: '100%' }}>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        padding: '0.12rem 0.35rem',
                        borderRadius: 3,
                        backgroundColor: ep.method === 'POST' ? 'rgba(255, 107, 0, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                        color: ep.method === 'POST' ? '#FF8500' : '#38BDF8',
                      }}
                    >
                      {ep.method}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: isSelected ? '#fff' : 'var(--text-secondary)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {ep.name}
                    </span>
                    <IconComp size={14} color={isSelected ? '#FF8500' : 'var(--text-dim)'} />
                  </div>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                    {ep.path}
                  </span>
                </button>
              );
            })}

            <div
              style={{
                marginTop: 'auto',
                padding: '0.75rem',
                backgroundColor: 'rgba(255, 107, 0, 0.05)',
                border: '1px solid rgba(255, 107, 0, 0.2)',
                borderRadius: 6,
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                lineHeight: 1.4,
              }}
            >
              <strong style={{ color: '#FF8500', display: 'block', marginBottom: '0.2rem' }}>
                Enterprise Integration:
              </strong>
              Have your developer token injected directly into your Shopify app, ShipStation webhook listener, or ERP system.
            </div>
          </div>

          {/* Right Main Body: Request & Response Inspector */}
          <div
            style={{
              overflowY: 'auto',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              backgroundColor: '#070C1B',
            }}
          >
            {/* Route Bar & Execute Action */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#0A1125',
                borderRadius: 6,
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  padding: '0.25rem 0.55rem',
                  borderRadius: 4,
                  backgroundColor: currentEndpoint.method === 'POST' ? 'rgba(255, 107, 0, 0.25)' : 'rgba(56, 189, 248, 0.25)',
                  color: currentEndpoint.method === 'POST' ? '#FF8500' : '#38BDF8',
                }}
              >
                {currentEndpoint.method}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: '#fff', fontWeight: 600, flex: 1 }}>
                https://api.starshippp.com{currentEndpoint.path}
              </span>
              <button
                onClick={handleExecuteRequest}
                disabled={isLoading}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#FF6B00',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 1.1rem',
                  borderRadius: 4,
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                  boxShadow: '0 4px 14px rgba(255, 107, 0, 0.4)',
                  transition: 'all 0.15s ease',
                }}
              >
                {isLoading ? <RotateCw size={14} className="spin-fast" /> : <Play size={14} fill="#fff" />}
                <span>{isLoading ? 'Executing...' : 'Run Request'}</span>
              </button>
            </div>

            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {currentEndpoint.description}
            </p>

            {/* Split Screen: Request Payload & Live Response */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '1rem',
              }}
            >
              {/* Request Payload Card */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#050811',
                  borderRadius: 6,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '0.5rem 0.85rem',
                    backgroundColor: '#0B1226',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Request Body (JSON)
                  </span>
                  {currentEndpoint.method === 'GET' && (
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                      No body required for GET
                    </span>
                  )}
                </div>

                {currentEndpoint.method === 'POST' ? (
                  <textarea
                    value={requestPayloadText}
                    onChange={(e) => setRequestPayloadText(e.target.value)}
                    style={{
                      width: '100%',
                      height: 250,
                      backgroundColor: 'transparent',
                      color: '#38BDF8',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      lineHeight: 1.5,
                      padding: '0.85rem',
                      border: 'none',
                      resize: 'none',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                ) : (
                  <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: '0.82rem', padding: '1rem', textAlign: 'center' }}>
                    Standard GET Request. Authenticate with Bearer token header to fetch live merchant ledger telemetry.
                  </div>
                )}
              </div>

              {/* Response Card */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#050811',
                  borderRadius: 6,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '0.5rem 0.85rem',
                    backgroundColor: '#0B1226',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Server Response
                  </span>
                  {latencyMs !== null && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#34D399', fontWeight: 700 }}>
                        200 OK
                      </span>
                      <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                        {latencyMs}ms
                      </span>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    height: 250,
                    overflowY: 'auto',
                    padding: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    lineHeight: 1.45,
                    color: responseOutput ? '#A7F3D0' : 'var(--text-dim)',
                    backgroundColor: '#050811',
                    whiteSpace: 'pre',
                  }}
                >
                  {responseOutput ? (
                    responseOutput
                  ) : (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-dim)' }}>
                      <Play size={20} style={{ opacity: 0.4 }} />
                      <span>Click &quot;Run Request&quot; to execute live endpoint call.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Code Generator Snippets */}
            <div
              style={{
                backgroundColor: '#050811',
                borderRadius: 6,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '0.5rem 0.85rem',
                  backgroundColor: '#0B1226',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code2 size={15} color="#FF8500" />
                  <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#fff', fontWeight: 700 }}>
                    Developer Code Generator
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {(['curl', 'typescript', 'python', 'go'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveCodeLang(lang)}
                      style={{
                        padding: '0.2rem 0.55rem',
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        backgroundColor: activeCodeLang === lang ? '#FF6B00' : 'transparent',
                        color: activeCodeLang === lang ? '#fff' : 'var(--text-dim)',
                        border: 'none',
                        borderRadius: 3,
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                  <button
                    onClick={handleCopyCode}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.2rem 0.55rem',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: copiedCode ? '#34D399' : '#fff',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: 3,
                      cursor: 'pointer',
                      marginLeft: '0.5rem',
                    }}
                  >
                    {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <pre
                style={{
                  margin: 0,
                  padding: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  lineHeight: 1.5,
                  color: '#F1F5F9',
                  overflowX: 'auto',
                }}
              >
                {generateCodeSnippet()}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
