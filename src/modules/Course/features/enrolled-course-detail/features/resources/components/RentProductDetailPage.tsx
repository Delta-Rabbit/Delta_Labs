/**
 * RentProductDetailPage Component - Compact Version
 * Product details on left, rental form on right with calendar date/time pickers
 */

import React, { useState } from 'react';
import type { ResourceItem } from '../types';

interface RentProductDetailPageProps {
  resource: ResourceItem;
  onBack: () => void;
  onComplete?: () => void;
  onSubmitRequest: (rentalData: RentalRequestData) => void;
}

interface RentalRequestData {
  resourceId: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  totalPrice: number;
  deposit: number;
  purpose: string;
  agreeToTerms: boolean;
}

// Rental Success Modal Component (Matches design of SuccessModal)
const RentalSuccessModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  sellerName: string;
}> = ({ isOpen, onClose, sellerName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl transform transition-all scale-100 opacity-100 animate-fadeIn">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
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
          Your rental request has been sent to <span className="font-semibold text-gray-900">{sellerName}</span>. 
          They will review your request and respond soon.
        </p>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">What's next?</span>
            <br />
            You'll receive an email notification when the seller responds to your request. You can also check the status in your dashboard.
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#174A5F] text-white font-semibold rounded-lg hover:bg-[#123644] transition-colors shadow-md active:transform active:scale-95"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
};

// Mini Calendar Component
const MiniCalendar: React.FC<{
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
}> = ({ selectedDate, onSelectDate, minDate }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const isDateDisabled = (day: number) => {
    if (!minDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const min = new Date(minDate);
    min.setHours(0, 0, 0, 0);
    return date < min;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentMonth.getMonth() && 
           selectedDate.getFullYear() === currentMonth.getFullYear();
  };

  return (
    <div className="p-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-1 hover:bg-gray-100 rounded">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-xs font-semibold">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-1 hover:bg-gray-100 rounded">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      {/* Days */}
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {dayNames.map(d => <div key={d} className="text-[9px] text-gray-400 py-0.5">{d}</div>)}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isDateDisabled(day);
          const selected = isDateSelected(day);
          return (
            <button
              key={day}
              onClick={() => !disabled && onSelectDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
              disabled={disabled}
              className={`text-[10px] py-1 rounded ${disabled ? 'text-gray-200' : selected ? 'bg-[#174A5F] text-white font-bold' : 'hover:bg-gray-100'}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const RentProductDetailPage: React.FC<RentProductDetailPageProps> = ({ resource, onBack, onComplete, onSubmitRequest }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [purpose, setPurpose] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showStartCal, setShowStartCal] = useState(false);
  const [showEndCal, setShowEndCal] = useState(false);

  const dailyRate = Math.round(resource.price * 0.03);
  const deposit = Math.round(resource.price * 0.2);
  
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const diff = endDate.getTime() - startDate.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const totalPrice = dailyRate * calculateDays();

  const formatDate = (date: Date | null) => date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
  const formatTime = (t: string) => { const [h, m] = t.split(':').map(Number); return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!startDate || !endDate || !purpose || !agreeToTerms) { alert('Please fill all fields'); return; }
    
    // Show success modal
    setShowSuccess(true);
    
    // Call submit handler
    onSubmitRequest({ 
      resourceId: resource.id, 
      startDate: startDate.toISOString(), 
      startTime, 
      endDate: endDate.toISOString(), 
      endTime, 
      totalPrice, 
      deposit, 
      purpose, 
      agreeToTerms 
    });
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    if (onComplete) {
      onComplete();
    } else {
      onBack();
    }
  };

  return (
    <>
      <RentalSuccessModal 
        isOpen={showSuccess} 
        onClose={handleCloseSuccess} 
        sellerName={resource.seller.name} 
      />
      <div className="w-full font-primary py-4">
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-[#174A5F] mb-4 text-sm font-medium transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Resources
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left - Product (Wider) */}
        <div className="flex-1 space-y-4">
          {/* Main Card */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex gap-6">
            <div className="w-1/3 aspect-square bg-gray-50 rounded-xl flex items-center justify-center p-4">
              <img src={resource.imageUrl} alt={resource.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>
            <div className="flex-1 py-2">
              <div className="flex items-start justify-between mb-2">
                <div>
                  {resource.badges && resource.badges.length > 0 && (
                    <span className="inline-block px-2.5 py-0.5 bg-[#22C55E] text-white text-xs font-medium rounded-full mb-2">
                      {resource.badges[0].label}
                    </span>
                  )}
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{resource.title}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < resource.rating ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({resource.ratingCount} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Daily Rate</p>
                  <p className="text-xl font-bold text-[#174A5F]">ETB {dailyRate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
                <img src={resource.seller.logo} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900">{resource.seller.name}</p>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                    <span className="text-xs text-gray-500">Verified Seller</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Condition</p>
                  <p className="font-semibold text-gray-900">Excellent</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="font-semibold text-gray-900">{resource.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium quality {resource.title} available for immediate rental. 
              This item is well-maintained, fully functional, and ready for use. 
              Perfect for short-term projects or temporary needs. Includes all necessary accessories.
            </p>
          </div>
        </div>

        {/* Right - Form (Compact but fixed width) */}
        <div className="w-full lg:w-80 flex-shrink-0 bg-white rounded-xl border border-gray-100 p-5 h-fit sticky top-4 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#174A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Rental Request
          </h2>

          {/* Date/Time Selection */}
          <div className="space-y-3 mb-4">
            {/* Start */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-700 mb-1">Start Date & Time</label>
              <button 
                onClick={() => { setShowStartCal(!showStartCal); setShowEndCal(false); }} 
                className={`w-full p-2.5 border rounded-lg text-left text-xs flex items-center justify-between transition-colors ${startDate ? 'border-[#174A5F] bg-[#174A5F]/5' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-2">
                  <svg className={`w-4 h-4 ${startDate ? 'text-[#174A5F]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className={`font-medium ${startDate ? 'text-[#174A5F]' : 'text-gray-500'}`}>
                    {startDate ? `${formatDate(startDate)}` : 'Select Start Date'}
                  </span>
                </div>
                {startDate && <span className="text-gray-500">{startTime}</span>}
              </button>
              
              {showStartCal && (
                <div className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl w-64 p-2 left-0">
                  <MiniCalendar 
                    selectedDate={startDate} 
                    onSelectDate={(d) => { setStartDate(d); if (!endDate || d > endDate) setEndDate(null); }} 
                    minDate={new Date()} 
                  />
                  <div className="p-2 border-t mt-2">
                    <label className="text-xs font-medium text-gray-500 block mb-1">Pickup Time</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full text-sm p-1.5 border rounded-lg bg-gray-50" />
                    <button onClick={() => setShowStartCal(false)} className="w-full mt-2 py-1.5 bg-[#174A5F] text-white text-xs rounded-lg font-medium">Confirm</button>
                  </div>
                </div>
              )}
            </div>

            {/* End */}
            <div className="relative">
              <label className="block text-xs font-medium text-gray-700 mb-1">End Date & Time</label>
              <button 
                onClick={() => { setShowEndCal(!showEndCal); setShowStartCal(false); }} 
                disabled={!startDate}
                className={`w-full p-2.5 border rounded-lg text-left text-xs flex items-center justify-between transition-colors ${endDate ? 'border-[#174A5F] bg-[#174A5F]/5' : 'border-gray-200 hover:border-gray-300'} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-center gap-2">
                  <svg className={`w-4 h-4 ${endDate ? 'text-[#174A5F]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className={`font-medium ${endDate ? 'text-[#174A5F]' : 'text-gray-500'}`}>
                    {endDate ? `${formatDate(endDate)}` : 'Select End Date'}
                  </span>
                </div>
                {endDate && <span className="text-gray-500">{endTime}</span>}
              </button>
              
              {showEndCal && startDate && (
                <div className="absolute z-20 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl w-64 p-2 right-0">
                  <MiniCalendar 
                    selectedDate={endDate} 
                    onSelectDate={(d) => setEndDate(d)} 
                    minDate={startDate} 
                  />
                  <div className="p-2 border-t mt-2">
                    <label className="text-xs font-medium text-gray-500 block mb-1">Return Time</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full text-sm p-1.5 border rounded-lg bg-gray-50" />
                    <button onClick={() => setShowEndCal(false)} className="w-full mt-2 py-1.5 bg-[#174A5F] text-white text-xs rounded-lg font-medium">Confirm</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Duration Display */}
          {startDate && endDate && (
            <div className="bg-[#174A5F]/5 rounded-xl p-3 mb-4 flex items-center justify-between border border-[#174A5F]/10">
              <span className="text-xs font-medium text-[#174A5F]">Total Duration</span>
              <span className="text-sm font-bold text-[#174A5F]">{calculateDays()} days</span>
            </div>
          )}

          {/* Purpose */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">Purpose *</label>
            <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Why do you need this?" rows={2} className="w-full p-2.5 text-xs border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-[#174A5F] transition-all" />
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Rental Fee</span>
              <span className="font-medium">ETB {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Security Deposit</span>
              <span className="font-medium">ETB {deposit.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
              <span className="font-bold text-sm text-gray-900">Total</span>
              <span className="font-bold text-lg text-[#174A5F]">ETB {(totalPrice + deposit).toLocaleString()}</span>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer mb-4 group">
            <input type="checkbox" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} className="w-4 h-4 rounded text-[#174A5F] mt-0.5 border-gray-300 focus:ring-[#174A5F]" />
            <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">I agree to the <a href="#" className="text-[#174A5F] hover:underline font-medium">terms & conditions</a></span>
          </label>

          {/* Submit */}
          <button 
            onClick={handleSubmit} 
            disabled={!startDate || !endDate || !purpose || !agreeToTerms} 
            className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-sm transition-all transform active:scale-95 ${
              !startDate || !endDate || !purpose || !agreeToTerms 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-[#174A5F] hover:bg-[#123644] hover:shadow-md'
            }`}
          >
            Send Rental Request
          </button>
        </div>
      </div>
    </div>
    </>
  );
};
