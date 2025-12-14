import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsorName: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, sponsorName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Request Sent Successfully!
        </h3>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">
          Your sponsorship request has been sent to <span className="font-semibold text-gray-900">{sponsorName}</span>. 
          They will review your request and respond soon.
        </p>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">What's next?</span>
            <br />
            You'll receive an email notification when the sponsor responds to your request. You can also check the status in your dashboard.
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#174A5F] text-white font-semibold rounded-lg hover:bg-[#123644] transition-colors"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
};
