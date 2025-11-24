import React, { useState, useEffect } from "react";
import { NavigationProvider } from "./modules/School/components/NavigationContext";
import { useNavigation } from "./modules/School/components/NavigationContext";
import LandingPage from "./Common/Landing_page/pages/LandingPage";
import MySchool from "./modules/School/pages/MySchooPage";
import OffersPage from "./modules/School/pages/OffersPage";
import BuyAndSellPage from "./modules/School/pages/BuyAndSellPage";
import ArchivePage from "./modules/School/pages/ArchivePage";
import AddSchoolPage from "./modules/School/pages/AddSchoolPage";
import RootDepartmentPage from "./modules/School/pages/RootDepartmentPage";

function PageContent() {
  const { currentPage } = useNavigation();

  switch (currentPage) {
    case 'home':
      return <MySchool />;
    case 'offers':
      return <OffersPage />;
    case 'buy-sell':
      return <BuyAndSellPage />;
    case 'archive':
      return <ArchivePage />;
    case 'add-school':
      return <AddSchoolPage />;
    case 'root-department':
      return <RootDepartmentPage />;
    default:
      return <MySchool />;
  }
}

function AppContent() {
  const [currentApp, setCurrentApp] = useState('landing');

  useEffect(() => {
    const handleNavigateToSchool = () => {
      setCurrentApp('school');
    };

    const handleNavigateToLanding = () => {
      setCurrentApp('landing');
    };

    window.addEventListener('navigateToSchool', handleNavigateToSchool);
    window.addEventListener('navigateToLanding', handleNavigateToLanding);

    return () => {
      window.removeEventListener('navigateToSchool', handleNavigateToSchool);
      window.removeEventListener('navigateToLanding', handleNavigateToLanding);
    };
  }, []);

  return (
    <div>
      {currentApp === 'landing' && <LandingPage />}
      {currentApp === 'school' && (
        <NavigationProvider>
          <PageContent />
        </NavigationProvider>
      )}
    </div>
  );
}

export default AppContent;