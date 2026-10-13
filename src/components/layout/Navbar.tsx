import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Send,
  Terminal,
  Copy,
  Check,
} from 'lucide-react';
import { StarshipppLogo } from '../ui/StarshipppLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenAuditModal: () => void;
  onOpenTourModal?: () => void;
  onOpenContactModal?: () => void;
  onOpenSandboxModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenAuditModal: _onOpenAuditModal,
  onOpenTourModal: _onOpenTourModal,
  onOpenContactModal,
  onOpenSandboxModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const mockApiKey = 'sk_live_starship_4a9f82c1e847a9d3';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnchorClick = (e: React.MouseEvent, anchorId: string) => {
    if (currentPath === '/') {
      e.preventDefault();
      document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleLinkClick(`/#${anchorId}`);
    }
  };

  const handleCopyMockKey = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(mockApiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const verticals = [
    { title: 'Motorcycle & Powersports', path: '/motorcycle-powersports-fulfillment/', desc: 'Exhausts, fenders & saddlebags with negotiated DIM relief' },
    { title: 'Automotive Body Panels & Aero', path: '/automotive-parts-fulfillment/', desc: 'Bumpers, splitters & spoilers with high-cube storage' },
    { title: 'Bulky & DIM-Weight Parcels', path: '/bulky-oversized-fulfillment/', desc: 'Large boxes, low actual weight, cut carrier DIM markups' },
    { title: 'Print On Demand (POD) In-House', path: '/print-on-demand-fulfillment/', desc: 'Direct-to-garment apparel, vinyl stickers & same-day kitting' },
    { title: 'Bonded FTZ Customs Deferral', path: '/bonded-ftz-fulfillment/', desc: 'Micro-release duty carton-by-carton as items sell' },
    { title: 'Michigan & Midwest Freight Hub', path: '/michigan-fulfillment/', desc: '1-Day ground reach to 68% of US via USPS & FedEx' },
    { title: 'Shopify 3PL Fulfillment', path: '/shopify-3pl-fulfillment/', desc: 'Native 60-sec sync, instant tracking & $250 fair minimum' },
    { title: 'Anti-ShipBob Alternative', path: '/alternatives/shipbob/', desc: 'Escape $1,500 minimum penalties & punitive DIM rates' },
    { title: 'Custom Packaging & Kitting', path: '/custom-unboxing-3pl/', desc: 'Premium white-glove packaging, foam blocking & cards' },
    { title: 'ShipMonk Alternative', path: '/alternatives/shipmonk/', desc: 'Zero software markups & direct floor Slack channel' },
    { title: 'In-House Fulfillment Transition', path: '/alternatives/in-house-fulfillment/', desc: 'Stop packing boxes at 2 AM and reclaim 20 hrs/wk' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        backgroundColor: isScrolled ? 'rgba(5, 8, 17, 0.96)' : 'rgba(5, 8, 17, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${
          isScrolled 
            ? 'rgba(255, 107, 0, 0.35)' 
            : 'rgba(255, 255, 255, 0.08)'
        }`,
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.6)' : 'none',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Top Interactive Developer Mock API Key Bar */}
      <div
        style={{
          backgroundColor: '#040712',
          borderBottom: '1px solid rgba(255, 107, 0, 0.25)',
          padding: '0.3rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-dim)',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#34D399', fontWeight: 700 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#34D399', display: 'inline-block', boxShadow: '0 0 6px #34D399' }} />
            <span>OPEN API v2.4 (LIVE)</span>
          </div>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
          <span className="telemetry-hide-sm" style={{ color: 'var(--text-secondary)' }}>
            Instant DIM 250 Rates &middot; Warehouse Floor Dispatch &middot; Bonded FTZ
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 107, 0, 0.35)',
              padding: '0.18rem 0.55rem',
              borderRadius: 3,
            }}
          >
            <span style={{ color: 'var(--text-dim)', fontSize: '0.66rem' }}>KEY:</span>
            <code style={{ color: '#FFA733', fontSize: '0.68rem', letterSpacing: '0.02em' }}>
              {mockApiKey.substring(0, 16)}...
            </code>
            <button
              onClick={handleCopyMockKey}
              title="Copy mock API key"
              style={{
                background: 'none',
                border: 'none',
                color: copiedKey ? '#34D399' : 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.1rem 0.25rem',
                marginLeft: '0.2rem',
              }}
            >
              {copiedKey ? <Check size={11} /> : <Copy size={11} />}
              <span style={{ fontSize: '0.62rem', marginLeft: '0.2rem' }}>
                {copiedKey ? 'COPIED' : 'COPY'}
              </span>
            </button>
          </div>

          {onOpenSandboxModal && (
            <button
              onClick={onOpenSandboxModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'rgba(255, 107, 0, 0.15)',
                border: '1px solid rgba(255, 107, 0, 0.5)',
                color: '#FF8500',
                padding: '0.18rem 0.55rem',
                borderRadius: 3,
                fontSize: '0.68rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Terminal size={11} />
              <span>TEST API LIVE &rarr;</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className="container"
        style={{
          minHeight: 74,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingTop: '0.25rem',
          paddingBottom: '0.25rem',
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleLinkClick('/')}
          style={{ cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center' }}
          aria-label="starshippp.com homepage"
        >
          <StarshipppLogo 
            variant="horizontal" 
            colorMode="dark" 
            height={56} 
            showTagline={true}
            taglineText="3PL, WAREHOUSING & LOGISTICS"
            taglineColor="#FF8500"
          />
        </div>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}
          className="desktop-nav"
        >
          {/* Solutions Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: solutionsOpen ? 'var(--brand-orange)' : 'var(--nav-link-color)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.92rem',
                fontWeight: 600,
                padding: '0.45rem 0',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span>Solutions</span>
              <ChevronDown 
                size={13} 
                style={{ 
                  transform: solutionsOpen ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.2s ease',
                  opacity: 0.7,
                }} 
              />
            </button>

            {/* Dropdown Menu */}
            {solutionsOpen && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: 380,
                  maxHeight: 'calc(100vh - 100px)',
                  overflowY: 'auto',
                  backgroundColor: '#090E1E',
                  border: '1px solid rgba(255, 107, 0, 0.35)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.7)',
                  padding: '0.6rem',
                  display: 'grid',
                  gap: '0.35rem',
                  zIndex: 999,
                }}
              >
                {verticals.map((v) => (
                  <div
                    key={v.path}
                    onClick={() => handleLinkClick(v.path)}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: 4,
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                      backgroundColor: currentPath === v.path ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 107, 0, 0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = currentPath === v.path ? 'rgba(255, 107, 0, 0.15)' : 'transparent')}
                  >
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff' }}>
                      {v.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                      {v.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Compare */}
          <a
            href="/#arbitrage-grid"
            onClick={(e) => handleAnchorClick(e, 'arbitrage-grid')}
            style={{
              fontSize: '0.92rem',
              fontWeight: 600,
              color: 'var(--nav-link-color)',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-heading)',
              transition: 'color 0.15s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--nav-link-color)')}
          >
            Compare
          </a>

          {/* Rates */}
          <a
            href="/#calculators"
            onClick={(e) => handleAnchorClick(e, 'calculators')}
            style={{
              fontSize: '0.92rem',
              fontWeight: 600,
              color: 'var(--nav-link-color)',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-heading)',
              transition: 'color 0.15s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--nav-link-color)')}
          >
            Rates
          </a>

          {/* Facility */}
          <a
            href="/#transit-map"
            onClick={(e) => handleAnchorClick(e, 'transit-map')}
            style={{
              fontSize: '0.92rem',
              fontWeight: 600,
              color: 'var(--nav-link-color)',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-heading)',
              transition: 'color 0.15s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--nav-link-color)')}
          >
            Facility
          </a>

          {/* Floor Live */}
          <a
            href="/#slack-floor"
            onClick={(e) => handleAnchorClick(e, 'slack-floor')}
            style={{
              fontSize: '0.92rem',
              fontWeight: 600,
              color: 'var(--nav-link-color)',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-heading)',
              transition: 'color 0.15s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--nav-link-color)')}
          >
            Floor Live
          </a>

          {/* Interactive Developer Sandbox Direct Nav */}
          {onOpenSandboxModal && (
            <button
              onClick={onOpenSandboxModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.92rem',
                fontWeight: 600,
                color: '#38BDF8',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                transition: 'all 0.15s ease',
                padding: '0.45rem 0',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#7DD3FC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#38BDF8')}
            >
              <Terminal size={14} />
              <span>API Sandbox</span>
            </button>
          )}

          {/* Contact */}
          <a
            href="/#contact"
            onClick={(e) => {
              if (onOpenContactModal) {
                e.preventDefault();
                onOpenContactModal();
              } else {
                handleAnchorClick(e, 'contact');
              }
            }}
            style={{
              fontSize: '0.92rem',
              fontWeight: 600,
              color: 'var(--nav-link-color)',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-heading)',
              transition: 'color 0.15s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-orange)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--nav-link-color)')}
          >
            Contact
          </a>
        </nav>

        {/* Action Controls & High-Polish CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }} className="desktop-nav">
          {/* Live Floor Ops Telemetry Radar Indicator */}
          <div className="nav-telemetry-badge" title="Live Starshippp fulfillment operations floor status">
            <span className="nav-telemetry-blip" />
            <span>Starship Active</span>
          </div>

          {/* High-Polish Primary CTA: Get Quote */}
          <button
            onClick={onOpenContactModal}
            className="btn-primary"
            style={{
              padding: '0.65rem 1.35rem',
              fontSize: '0.95rem',
              fontWeight: 800,
              whiteSpace: 'nowrap',
            }}
          >
            <Send size={15} />
            <span>Get Quote</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="mobile-toggle">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              color: 'var(--text-white)',
              padding: '0.4rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'rgba(5, 8, 17, 0.98)',
            borderBottom: '2px solid var(--brand-orange)',
            padding: '1.25rem',
            display: 'grid',
            gap: '0.85rem',
          }}
        >
          {/* Quick Anchor Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <button
              onClick={(e) => { setMobileMenuOpen(false); handleAnchorClick(e, 'arbitrage-grid'); }}
              style={{ padding: '0.4rem 0.75rem', background: 'var(--theme-btn-bg)', border: '1px solid var(--theme-btn-border)', color: 'var(--nav-link-color)', fontSize: '0.85rem', fontWeight: 600 }}
            >
              Compare
            </button>
            <button
              onClick={(e) => { setMobileMenuOpen(false); handleAnchorClick(e, 'calculators'); }}
              style={{ padding: '0.4rem 0.75rem', background: 'var(--theme-btn-bg)', border: '1px solid var(--theme-btn-border)', color: 'var(--nav-link-color)', fontSize: '0.85rem', fontWeight: 600 }}
            >
              Rates
            </button>
            <button
              onClick={(e) => { setMobileMenuOpen(false); handleAnchorClick(e, 'transit-map'); }}
              style={{ padding: '0.4rem 0.75rem', background: 'var(--theme-btn-bg)', border: '1px solid var(--theme-btn-border)', color: 'var(--nav-link-color)', fontSize: '0.85rem', fontWeight: 600 }}
            >
              Facility
            </button>
            <button
              onClick={(e) => { setMobileMenuOpen(false); handleAnchorClick(e, 'slack-floor'); }}
              style={{ padding: '0.4rem 0.75rem', background: 'var(--theme-btn-bg)', border: '1px solid var(--theme-btn-border)', color: 'var(--nav-link-color)', fontSize: '0.85rem', fontWeight: 600 }}
            >
              Floor Live
            </button>
            {onOpenSandboxModal && (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenSandboxModal(); }}
                style={{ padding: '0.4rem 0.75rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38BDF8', color: '#38BDF8', fontSize: '0.85rem', fontWeight: 700 }}
              >
                API Sandbox
              </button>
            )}
          </div>

          <div style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '0.2rem 0' }} />

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenContactModal) onOpenContactModal();
            }}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '1.05rem', fontSize: '1.05rem', fontWeight: 800 }}
          >
            <Send size={16} /> Get Quote & Floor Access
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .telemetry-item { display: none !important; }
          .telemetry-hide-sm { display: none !important; }
        }
      `}</style>
    </header>
  );
};
