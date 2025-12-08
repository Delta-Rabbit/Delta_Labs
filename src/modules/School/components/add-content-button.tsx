"use client"

export function AddContentButton() {
  return (
    <button className="w-[125px] h-[95px] rounded-lg border border-[#D9D9D9] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Plus sign */}
        <path
          d="M27.25 21H21M21 21H14.75M21 21V14.75M21 21V27.25"
          stroke="#174A5F"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Circular arrow */}
        <path
          d="M10.5827 2.9531C13.647 1.1805 17.2048 0.166 20.9993 0.166C32.5052 0.166 41.8327 9.4934 41.8327 20.9993C41.8327 32.5052 32.5052 41.8327 20.9993 41.8327C9.4934 41.8327 0.166 32.5052 0.166 20.9993C0.166 17.2048 1.1805 13.647 2.9531 10.5827"
          stroke="#174A5F"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}
