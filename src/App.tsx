import { useState } from "react";
import { AuthModal, AuthProvider } from "./modules/Auth";
import { TabProvider } from "./contexts/TabContext";
import { TabContentRouter } from "./components/TabContentRouter";
import { NavigationLayout } from "./components/NavigationLayout";
import LandingPage from "./Common/Landing_page/pages/LandingPage";

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'course'>('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'signup'>('login');

  const handleLoginClick = () => {
    setAuthModalType('login');
    setShowAuthModal(true);
  };

  const handleSignUpClick = () => {
    setAuthModalType('signup');
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setCurrentView('course'); // Navigate to course after successful auth
  };

  return (
    <AuthProvider>
      <TabProvider>
        {/* Landing Page - Entry Point */}
        {currentView === 'landing' && (
          <LandingPage 
            onNavigateToCourse={() => setCurrentView('course')}
            onLoginClick={handleLoginClick}
            onSignUpClick={handleSignUpClick}
          />
        )}

        {/* Course Module - Main Application */}
        {currentView === 'course' && (
          <NavigationLayout onBackToLanding={() => setCurrentView('landing')}>
            <TabContentRouter />
          </NavigationLayout>
        )}

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultType={authModalType}
          onAuthSuccess={handleAuthSuccess}
        />
      </TabProvider>
    </AuthProvider>
  );
}

export default App;
