'use client';

import { useState } from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

export default function AuthModalManager() {
  const [activeModal, setActiveModal] = useState<'login' | 'signup' | null>(null);

  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={() => setActiveModal('login')}
          className="bg-[#174A5F] text-white px-4 py-2 rounded"
        >
          Open Login
        </button>
        <button
          onClick={() => setActiveModal('signup')}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Open Sign Up
        </button>
      </div>

      <LoginModal
        isOpen={activeModal === 'login'}
        onClose={() => setActiveModal(null)}
        onSwitchToSignUp={() => setActiveModal('signup')}
      />

      <SignUpModal
        isOpen={activeModal === 'signup'}
        onClose={() => setActiveModal(null)}
        onSwitchToLogin={() => setActiveModal('login')}
      />
    </>
  );
}
