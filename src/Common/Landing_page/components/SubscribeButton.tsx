'use client'

import { useState } from 'react';

interface SubscribeButtonProps {
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SubscribeButton({ 
  onClick, 
  className = '',
  size = 'lg'
}: SubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-6 py-2 text-sm';
      case 'lg':
        return 'px-24 py-4 text-lg';
      case 'md':
      default:
        return 'px-8 py-3 text-base';
    }
  };

  const handleClick = () => {
    setIsSubscribed(!isSubscribed);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        rounded-full font-medium transition-all duration-200
        hover:opacity-90 active:scale-95 border
        ${getSizeClasses()}
        ${className}
      `}
      style={{
        backgroundColor: isSubscribed ? 'transparent' : '#174A5F',
        color: isSubscribed ? '#174A5F' : 'white',
        borderColor: '#174A5F'
      }}
    >
      {isSubscribed ? 'Subscribed' : 'Subscribe'}
    </button>
  );
}