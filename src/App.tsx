import { useState } from "react";
import { AuthModal, AuthProvider } from "./modules/Auth";
// import WorkingAuthTest from "./WorkingAuthTest";

function App() {
  const [showAuthModal, setShowAuthModal] = useState(true);
  // return <WorkingAuthTest />;
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* Simple Demo UI */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-primary-600">Delta Labs Auth Demo</h1>
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Open Auth Modal
          </button>
          
          {/* Production Auth Modal */}
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)}
            defaultType="login"
          />
        </div>
        
        {/* Uncomment below to see old test UI */}
        {/* <WorkingAuthTest /> */}
      </div>
    </AuthProvider>
  );
}

export default App;
