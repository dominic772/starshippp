import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { MichiganFulfillmentPage } from './pages/MichiganFulfillmentPage';
import { MotorcyclePowersportsPage } from './pages/MotorcyclePowersportsPage';
import { AutomotivePanelsPage } from './pages/AutomotivePanelsPage';
import { BulkyDimWeightPage } from './pages/BulkyDimWeightPage';
import { ApparelFashionPage } from './pages/ApparelFashionPage';
import { CosmeticsSkincarePage } from './pages/CosmeticsSkincarePage';
import { TikTokShopPage } from './pages/TikTokShopPage';
import { CustomUnboxingPage } from './pages/CustomUnboxingPage';
import { AlternativesShipbobPage } from './pages/AlternativesShipbobPage';
import { AlternativesShipmonkPage } from './pages/AlternativesShipmonkPage';
import { AlternativesInHousePage } from './pages/AlternativesInHousePage';
import { ShopifyFulfillmentPage } from './pages/ShopifyFulfillmentPage';
import { ManagementPortalPage } from './pages/ManagementPortalPage';
import { AuditUploadModal } from './components/modals/AuditUploadModal';
import { InstantContactModal } from './components/modals/InstantContactModal';
import { PexelsConfigModal } from './components/video/PexelsConfigModal';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path === '' ? '/' : path;
    }
    return '/';
  });

  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('starshippp_theme', 'dark');
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path === '' ? '/' : path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    // If it's an anchor on homepage
    if (path.startsWith('/#')) {
      const targetId = path.replace('/#', '');
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render view matching current path
  const renderCurrentPage = () => {
    const normPath = currentPath.endsWith('/') && currentPath.length > 1 ? currentPath : `${currentPath}/`;

    switch (normPath) {
      case '/michigan-fulfillment/':
        return (
          <MichiganFulfillmentPage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/motorcycle-powersports-fulfillment/':
        return (
          <MotorcyclePowersportsPage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/automotive-parts-fulfillment/':
        return (
          <AutomotivePanelsPage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/bulky-oversized-fulfillment/':
        return (
          <BulkyDimWeightPage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/apparel-fashion-fulfillment/':
        return (
          <ApparelFashionPage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/cosmetics-skincare-fulfillment/':
        return (
          <CosmeticsSkincarePage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/tiktok-shop-fulfillment/':
        return (
          <TikTokShopPage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/custom-unboxing-3pl/':
        return (
          <CustomUnboxingPage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/alternatives/shipbob/':
        return (
          <AlternativesShipbobPage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/alternatives/shipmonk/':
        return (
          <AlternativesShipmonkPage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/alternatives/in-house-fulfillment/':
        return (
          <AlternativesInHousePage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/shopify-3pl-fulfillment/':
        return (
          <ShopifyFulfillmentPage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
          />
        );
      case '/portal/':
      case '/management/':
        return <ManagementPortalPage onBackToWebsite={() => navigate('/')} />;
      case '/':
      default:
        return (
          <HomePage
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="starshippp-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenAuditModal={() => setIsAuditModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>{renderCurrentPage()}</main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigate}
        onOpenAuditModal={() => setIsAuditModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Interactive Global Modals */}
      <InstantContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <AuditUploadModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      <PexelsConfigModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
}

export default App;
