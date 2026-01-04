import { useRef, useEffect } from 'react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignUpModal({ isOpen, onClose, onSwitchToLogin }: SignUpModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#174A5F]/25 transition-opacity">
      <div
        ref={modalRef}
        className="relative w-[480px] max-w-[90%] bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transform transition-transform"
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
            Create Your Account
          </h2>
          <p
            className="mt-2 text-center text-[#525252]"
            style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
          >
            Learn More, Do More
          </p>
        </div>

        <div className="w-full mt-5 flex flex-col gap-3">

          <div className="flex flex-col">
            <label
              htmlFor="first-name"
              className="mb-1 text-[#828282]"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
            >
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Abel"
              className="w-full border border-[#DED2D9] rounded-[6px] px-3 py-2 text-sm text-[#000000] placeholder-[#E0E0E0] font-['Nunito_Sans'] focus:outline-none focus:ring-1 focus:ring-[#DED2D9] transition"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="last-name"
              className="mb-1 text-[#828282]"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
            >
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Bekele"
              className="w-full border border-[#DED2D9] rounded-[6px] px-3 py-2 text-sm text-[#000000] placeholder-[#E0E0E0] font-['Nunito_Sans'] focus:outline-none focus:ring-1 focus:ring-[#DED2D9] transition"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="signup-username"
              className="mb-1 text-[#828282]"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}
            >
              User Name
            </label>
            <input
              id="signup-username"
              type="text"
              placeholder="Enter User Name"
              className="w-full border border-[#DED2D9] rounded-[6px] px-3 py-2 text-sm text-[#000000] placeholder-[#E0E0E0] font-['Nunito_Sans'] focus:outline-none focus:ring-1 focus:ring-[#DED2D9] transition"
            />
          </div>

          <button
            type="button"
            className="w-full h-11 rounded-[6px] bg-[#174A5F] text-white text-sm font-['Poppins'] font-semibold"
          >
            Continue
          </button>

          <div className="flex items-center w-full justify-center my-2 text-center text-xs">
            <span className="text-[#DDDDDD] font-['Nunito_Sans'] font-semibold">-------------</span>
            <span className="px-2 text-[#A1A1A1] font-['Nunito_Sans'] font-regular">
              Or Sign up with
            </span>
            <span className="text-[#DDDDDD] font-['Nunito_Sans'] font-semibold">-------------</span>
          </div>

          <div className="flex justify-center mt-1 w-full">
            <div className="flex items-center justify-center border border-[#DED2D9] rounded-[6px] h-10 w-full px-3 bg-white space-x-2">
              <img src="/assets/icons/google.svg" alt="Google" width={24} height={24} />
              <img src="/assets/icons/apple.svg" alt="Apple" width={24} height={24} />
              <img src="/assets/icons/git-hub-logo.svg" alt="GitHub" width={24} height={24} />
              <img src="/assets/icons/facebook.svg" alt="Facebook" width={24} height={24} />
            </div>
          </div>

          <div className="flex justify-center items-center mt-8 gap-2 text-sm">
            <span className="text-[#828282]" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>
              Already have an account?
            </span>
            <button
              type="button"
              className="text-[#174A5F]"
              style={{ fontFamily: 'Poppins', fontWeight: 500 }}
              onClick={onSwitchToLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
