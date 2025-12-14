import React, { useState } from 'react';
import type { Sponsor, CartItem } from '../types';

interface SponsorshipRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsor: Sponsor | null;
  cartItems: CartItem[];
  totalAmount: number;
  onSubmit: (message: string) => void;
}

export const SponsorshipRequestModal: React.FC<SponsorshipRequestModalProps> = ({
  isOpen,
  onClose,
  sponsor,
  cartItems,
  totalAmount,
  onSubmit
}) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isCertified, setIsCertified] = useState(false);

  if (!isOpen || !sponsor) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      alert('Please provide a message explaining why you need sponsorship');
      return;
    }

    if (!isCertified) {
      alert('Please certify that the information provided is true and complete');
      return;
    }

    setIsSubmitting(true);
    await onSubmit(message);
    setIsSubmitting(false);
    setMessage('');
    setUploadedFiles([]);
    setIsCertified(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Request Sponsorship</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Sponsor Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <img 
              src={sponsor.avatar} 
              alt={sponsor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-900">{sponsor.name}</h3>
              {sponsor.organization && (
                <p className="text-sm text-gray-500">{sponsor.organization}</p>
              )}
            </div>
          </div>

          {/* Cart Items Summary */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Items Requesting Sponsorship</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={item.resource.imageUrl} 
                    alt={item.resource.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{item.resource.title}</p>
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">${item.resource.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <span className="font-semibold text-gray-900">Total Amount Needed:</span>
            <span className="text-2xl font-bold text-[#174A5F]">${totalAmount.toLocaleString()}</span>
          </div>

          {/* Message Field */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Your Message <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Explain why you need this sponsorship and how it will help your education
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174A5F] focus:border-transparent resize-none"
              placeholder="Dear sponsor, I am requesting your support because..."
            />
            <p className="text-xs text-gray-500 mt-1">{message.length} / 500 characters</p>
          </div>

          {/* Evidence Documents */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Evidence Documents (Optional)
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Upload documents that support your request (e.g., financial statements, student ID, recommendation letters)
            </p>
            
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#174A5F] transition-colors">
              <input
                type="file"
                id="evidence-upload"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="evidence-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">Click to upload files</span>
                <span className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</span>
              </label>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certification Checkbox */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isCertified}
                onChange={(e) => setIsCertified(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#174A5F] border-gray-300 rounded focus:ring-[#174A5F]"
              />
              <span className="text-sm text-gray-700 flex-1">
                <span className="font-semibold">Certification: </span>
                I certify that the information provided in this application is true and complete to the best of my knowledge. I understand that providing false information may result in the denial of my sponsorship request.
                <span className="text-red-500 ml-1">*</span>
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !message.trim() || !isCertified}
              className="flex-1 py-3 bg-[#174A5F] text-white font-semibold rounded-lg hover:bg-[#123644] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
