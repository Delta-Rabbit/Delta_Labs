import { useState } from "react";
import { AuthProvider } from "./modules/Auth";
import { TabProvider } from "./contexts/TabContext";
import { TabContentRouter } from "./components/TabContentRouter";
import { NavigationLayout } from "./components/NavigationLayout";
import LandingPage from "./Common/Landing_page/pages/LandingPage";

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'course'>('landing');

  return (
    <AuthProvider>
      <TabProvider>
        {/* Landing Page - Entry Point */}
        {currentView === 'landing' && (
          <LandingPage onNavigateToCourse={() => setCurrentView('course')} />
        )}

        {/* Course Module - Main Application */}
        {currentView === 'course' && (
          <NavigationLayout onBackToLanding={() => setCurrentView('landing')}>
            <TabContentRouter />
          </NavigationLayout>
        )}
      </TabProvider>
    </AuthProvider>
  );
}

export default App;
