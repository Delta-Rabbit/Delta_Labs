'use client'

import SubscribeButton from './SubscribeButton'

interface SubscriptionCardProps {
  className?: string;
}

export default function SubscriptionCard({ className = '' }: SubscriptionCardProps) {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
        <img 
          src="/assets/images/profile.png" 
          alt="bot Profile"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="white"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-poppins font-medium text-black text-lg">
          HrU bot
        </h3>

        <p className="font-poppins font-normal text-black text-sm mt-1">
          Modern Physics bot
        </p>

        <div className="font-poppins font-medium text-sm mt-1" style={{ color: '#174A5F' }}>
          #chat_bot #Newton's First Law
        </div>
      </div>

      <div className="flex-shrink-0">
        <SubscribeButton size="sm" />
      </div>
    </div>
  )
}