import { useEffect, useRef } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToSignUp }: LoginModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(23, 74, 95, 0.25)' }}
    >
      <div
        ref={modalRef}
        className="relative w-[480px] max-w-[90%] bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-600 text-lg font-bold"
        >
          ✕
        </button>

        <div className="mt-10 flex flex-col items-center w-full">
          <h2
            className="text-center text-[#525252]"
            style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px' }}
          >
            Login to Your Account
          </h2>
          <p
            className="mt-2 text-center text-[#525252]"
            style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
          >
            Learn more and do more
          </p>
        </div>

        <div className="w-full mt-5 flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="login-input"
              className="mb-1 text-[#828282]"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
            >
              Email or phone number
            </label>
            <input
              id="login-input"
              type="text"
              placeholder="mail@abc.com"
              className="
                w-full
                border border-[#DED2D9]
                rounded-[6px] 
                px-3 py-2 
                text-sm text-[#000000] 
                placeholder-[#E0E0E0]
                font-['Nunito_Sans'] font-normal
                focus:outline-none focus:ring-1 focus:ring-[#DED2D9]
                transition
              "
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="pass-input"
              className="mb-1 text-[#828282]"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
            >
              Password
            </label>
            <input
              id="pass-input"
              type="password"
              placeholder="*****************"
              className="
                w-full
                border border-[#DED2D9]
                rounded-[6px] 
                px-3 py-2 
                text-sm text-[#000000] 
                placeholder-[#E0E0E0]
                font-['Nunito_Sans'] font-normal
                focus:outline-none focus:ring-1 focus:ring-[#DED2D9]
                transition
              "
            />
          </div>

          <div className="flex items-center justify-between w-full mt-1">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-3 h-3 border border-[#DED2D9] rounded mr-2"
              />
              <label
                htmlFor="remember"
                className="text-[#A1A1A1]"
                style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '12px' }}
              >
                Remember Me
              </label>
            </div>
            <button
              type="button"
              className="text-[#0C6AA0] text-sm"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="button"
            className="w-full h-11 rounded-[6px] bg-[#174A5F] text-white text-sm font-['Poppins'] font-semibold"
          >
            Login
          </button>

          <div className="flex items-center w-full justify-center my-2 text-center text-xs">
            <span className="text-[#DDDDDD] font-['Nunito_Sans'] font-semibold">
              ------------- 
            </span>
            <span className="px-2 text-[#A1A1A1] font-['Nunito_Sans'] font-regular">
              Or Sign in with
            </span>
            <span className="text-[#DDDDDD] font-['Nunito_Sans'] font-semibold">
              -------------
            </span>
          </div>

          <div className="flex justify-center mt-1 w-full">
            <div className="flex items-center justify-center border border-[#DED2D9] rounded-[6px] h-10 w-full px-3 bg-white space-x-2">
              <img src="/assets/icons/google.svg" alt="Google" width={24} height={24} />
              <img src="/assets/icons/apple.svg" alt="Apple" width={24} height={24} />
              <img src="/assets/icons/git-hub-logo.svg" alt="GitHub" width={24} height={24} />
              <img src="/assets/icons/facebook.svg" alt="Facebook" width={24} height={24} />
            </div>
          </div>

          <div className="flex justify-center items-center mt-12 gap-2 text-sm">
            <span className="text-[#828282]" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>
              Not Registered Yet?
            </span>
            <button
              type="button"
              className="text-[#174A5F]"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              onClick={onSwitchToSignUp}
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
