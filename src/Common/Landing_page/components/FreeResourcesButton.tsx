'use client';

import * as React from 'react';

export default function FreeResourcesButton({
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`
        relative inline-flex items-center justify-center 
        h-16 px-8 font-semibold text-white transition-all duration-300 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
        disabled:opacity-50 disabled:pointer-events-none
        ${className}
      `}
      {...props}
    >
      {/* Skewed SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 191 64"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="free-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#174A5F" />
            <stop offset="100%" stopColor="#1E6A83" />
          </linearGradient>
        </defs>
        <path
          d="M0 0H191L158 64H4.80084H0C0 60.8111 0 57.8009 0 54.9238C0 35.2519 0 21.8046 0 0Z"
          fill="url(#free-gradient)"
          className="drop-shadow-[0_4px_20px_rgba(23,74,95,0.4)] transition-all duration-300"
        />
      </svg>

      {/* Button Label */}
      <span className="relative z-10 font-poppins font-medium text-base">
        Free Resources
      </span>
    </button>
  );
}
