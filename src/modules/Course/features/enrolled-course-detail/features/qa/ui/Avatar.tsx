/**
 * Avatar Atom Component
 * Displays user avatar with fallback to initials
 */

import React from 'react';

interface AvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-12 h-12 text-base',
};

export const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  avatar, 
  size = 'md',
  className = '' 
}) => {
  const sizeClass = sizeClasses[size];
  const initials = name.charAt(0).toUpperCase();

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`${sizeClass} rounded-full ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 ${className}`}
      aria-label={`${name}'s avatar`}
    >
      <span className={`font-semibold text-primary-600`}>
        {initials}
      </span>
    </div>
  );
};


