import { useState } from "react";
import { AuthModal, AuthProvider } from "./modules/Auth";
import { TabProvider } from "./contexts/TabContext";
import { TabContentRouter } from "./components/TabContentRouter";
import { NavigationLayout } from "./components/NavigationLayout";
import { CourseModuleButton } from "./components/CourseModuleButton";

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState<'course' | 'demo'>('demo');

  return (
    <AuthProvider>
      <TabProvider>
        {/* Demo View - For testing Auth */}
        {currentView === 'demo' && (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold text-primary-600">Delta Labs Auth Demo</h1>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Auth Modal
                </button>
                
                <CourseModuleButton onClick={() => setCurrentView('course')} />
              </div>
              
              <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)}
                defaultType="login"
              />
            </div>
          </div>
        )}

        {/* Tab-based view - Main View */}
        {currentView === 'course' && (
          <NavigationLayout>
            <TabContentRouter />
          </NavigationLayout>
        )}
      </TabProvider>
    </AuthProvider>
  );
}

export default App;
