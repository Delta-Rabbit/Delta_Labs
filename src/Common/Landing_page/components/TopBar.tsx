'use client';
import { useState } from 'react';
import LanguageDropdown from './LanguageDropdown';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import AIBotModal from './AIBotModal';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

export default function TopBar() {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleOpenSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  return (
    <>
      <header className="h-[70px] bg-[#174A5F] flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src="assets/icons/Vector.svg" alt="Vector icon" width={24} height={24} />
          <img
            src="assets/icons/Public landing logo.svg"
            alt="Delta Labs Logo"
            width={140}
            height={28}
          />
        </div>

        <div className="flex items-center space-x-4">
          <LanguageDropdown />
          <img
            src="assets/icons/AI Bot.svg"
            alt="AI Bot"
            width={32}
            height={32}
            className="cursor-pointer"
            onClick={() => setIsAIModalOpen(true)}
          />
          <LoginButton onClick={handleOpenLogin} />
          <SignupButton onClick={handleOpenSignUp} />
        </div>
      </header>

      {/* Modals */}
      <AIBotModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} />
    </>
  );
}
