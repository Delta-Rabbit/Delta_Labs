'use client'

import { useState, useEffect } from 'react'

interface RightSidebarProps {
  onSelectFeed: (feed: 'video' | 'audio' | 'bot' | 'simulation') => void
  currentFeed?: 'video' | 'audio' | 'bot' | 'simulation'
}

export default function RightSidebar({ onSelectFeed, currentFeed }: RightSidebarProps) {
  const [selectedIcon, setSelectedIcon] = useState<'video' | 'audio' | 'bot' | 'simulation'>(currentFeed || 'video')

  const handleClick = (icon: 'video' | 'audio' | 'bot' | 'simulation') => {
    setSelectedIcon(icon)
    onSelectFeed(icon)
  }

  useEffect(() => {
    if (currentFeed) {
      setSelectedIcon(currentFeed)
    }
  }, [currentFeed])

  return (
    <div className="flex items-center justify-center h-full bg-transparent">
      <div className="flex flex-col w-[40px] bg-transparent">
        {/* Video Button */}
        <button 
          className={`w-[40px] h-[100px] flex flex-col items-center justify-center group transition-colors ${
            selectedIcon === 'video' 
              ? 'bg-[#174A5F]' 
              : 'bg-transparent hover:bg-[#174A5F]'
          }`}
          onClick={() => handleClick('video')}
        >
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M15.2257 15.7502L20.0673 12.6585C20.4368 12.4446 20.6215 12.1141 20.6215 11.6668C20.6215 11.2196 20.4368 10.8891 20.0673 10.6752L15.2257 7.5835C14.8368 7.33072 14.4382 7.31127 14.0298 7.52516C13.6215 7.73905 13.4173 8.07933 13.4173 8.546V14.7877C13.4173 15.2543 13.6215 15.5946 14.0298 15.8085C14.4382 16.0224 14.8368 16.0029 15.2257 15.7502ZM9.33398 21.0002C8.69232 21.0002 8.14321 20.7719 7.68665 20.3153C7.22932 19.858 7.00065 19.3085 7.00065 18.6668V4.66683C7.00065 4.02516 7.22932 3.47566 7.68665 3.01833C8.14321 2.56177 8.69232 2.3335 9.33398 2.3335H23.334C23.9757 2.3335 24.5252 2.56177 24.9825 3.01833C25.439 3.47566 25.6673 4.02516 25.6673 4.66683V18.6668C25.6673 19.3085 25.439 19.858 24.9825 20.3153C24.5252 20.7719 23.9757 21.0002 23.334 21.0002H9.33398ZM9.33398 18.6668H23.334V4.66683H9.33398V18.6668ZM4.66732 25.6668C4.02565 25.6668 3.47654 25.4386 3.01998 24.982C2.56265 24.5247 2.33398 23.9752 2.33398 23.3335V8.16683C2.33398 7.83627 2.44598 7.559 2.66998 7.335C2.89321 7.11177 3.1701 7.00016 3.50065 7.00016C3.83121 7.00016 4.10848 7.11177 4.33248 7.335C4.55571 7.559 4.66732 7.83627 4.66732 8.16683V23.3335H19.834C20.1645 23.3335 20.4414 23.4455 20.6647 23.6695C20.8887 23.8927 21.0007 24.1696 21.0007 24.5002C21.0007 24.8307 20.8887 25.1076 20.6647 25.3308C20.4414 25.5548 20.1645 25.6668 19.834 25.6668H4.66732Z" 
              className={selectedIcon === 'video' ? 'fill-white' : 'fill-[#174A5F] group-hover:fill-white'}
            />
          </svg>
        </button>

        {/* Audio Button */}
        <button 
          className={`w-[40px] h-[100px] flex flex-col items-center justify-center group transition-colors ${
            selectedIcon === 'audio' 
              ? 'bg-[#174A5F]' 
              : 'bg-transparent hover:bg-[#174A5F]' // Changed bg-white to bg-transparent
          }`}
          onClick={() => handleClick('audio')}
        >
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M23.5707 21.3091C23.3848 21.3091 23.2344 21.1587 23.2344 20.9728V14.0575C23.2344 12.8216 22.991 11.6185 22.507 10.4837C22.0422 9.38721 21.375 8.40283 20.5301 7.55518C19.6824 6.70752 18.698 6.04307 17.6016 5.57822C16.4668 5.09697 15.2664 4.85088 14.0277 4.85088C12.7918 4.85088 11.5887 5.09424 10.4539 5.57822C9.35742 6.04307 8.37305 6.71025 7.52539 7.55518C6.67773 8.40283 6.01328 9.38721 5.54844 10.4837C5.06719 11.6185 4.82109 12.8188 4.82109 14.0575V20.97C4.82109 21.156 4.6707 21.3063 4.48477 21.3063C4.29883 21.3063 4.14844 21.156 4.14844 20.97V14.0575C4.14844 12.7286 4.41094 11.438 4.92773 10.2212C5.42813 9.04541 6.1418 7.98994 7.04961 7.07939C7.95742 6.17158 9.01563 5.45791 10.1914 4.95752C11.4082 4.44072 12.6988 4.17822 14.0277 4.17822C15.3566 4.17822 16.6473 4.44072 17.8641 4.95752C19.0398 5.45791 20.0953 6.17158 21.0059 7.07939C21.9137 7.98721 22.6273 9.04541 23.1277 10.2212C23.6445 11.438 23.907 12.7286 23.907 14.0575V20.97C23.907 21.1587 23.7566 21.3091 23.5707 21.3091Z" 
              className={selectedIcon === 'audio' ? 'fill-white' : 'fill-[#174A5F] group-hover:fill-white'}
            />
            <path 
              d="M2.73125 23.2611C1.76328 23.2611 0.978516 22.4764 0.978516 21.5084V16.9119C0.978516 15.9439 1.76328 15.1592 2.73125 15.1592C3.69922 15.1592 4.48398 15.9439 4.48398 16.9119V21.5084C4.48398 22.4764 3.69922 23.2611 2.73125 23.2611Z" 
              className={selectedIcon === 'audio' ? 'fill-white' : 'fill-[#174A5F] group-hover:fill-white'}
            />
            <path 
              d="M25.323 23.2614C24.3551 23.2614 23.5703 22.4766 23.5703 21.5086V16.9122C23.5703 15.9442 24.3551 15.1594 25.323 15.1594C26.291 15.1594 27.0758 15.9442 27.0758 16.9122V21.5086C27.0758 22.4766 26.291 23.2614 25.323 23.2614Z" 
              className={selectedIcon === 'audio' ? 'fill-white' : 'fill-[#174A5F] group-hover:fill-white'}
            />
          </svg>
        </button>

        {/* Bot Button */}
        <button 
          className={`w-[40px] h-[100px] flex flex-col items-center justify-center group transition-colors ${
            selectedIcon === 'bot' 
              ? 'bg-[#174A5F]' 
              : 'bg-transparent hover:bg-[#174A5F]' // Changed bg-white to bg-transparent
          }`}
          onClick={() => handleClick('bot')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill="none" 
              stroke={selectedIcon === 'bot' ? 'white' : '#174A5F'} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              d="M8 17.75h8m3.5-5.5h.75a1.5 1.5 0 0 1 1.5 1.5v2a1.5 1.5 0 0 1-1.5 1.5h-.75m-15-5h-.75a1.5 1.5 0 0 0-1.5 1.5v2a1.5 1.5 0 0 0 1.5 1.5h.75M12 8V6m1.5-1.5A1.5 1.5 0 0 1 12 6a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 3a1.5 1.5 0 0 1 1.5 1.5m2.75 8.75a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5m-5.5 0a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5M8.25 8.5h7.5a3.74 3.74 0 0 1 3.75 3.75v5A3.74 3.74 0 0 1 15.75 21h-7.5a3.74 3.74 0 0 1-3.75-3.75v-5A3.74 3.74 0 0 1 8.25 8.5"
              className="group-hover:stroke-white"
            />
          </svg>
        </button>

        {/* Simulation Button */}
        <button 
          className={`w-[40px] h-[100px] flex flex-col items-center justify-center group transition-colors ${
            selectedIcon === 'simulation' 
              ? 'bg-[#174A5F]' 
              : 'bg-transparent hover:bg-[#174A5F]' // Changed bg-white to bg-transparent
          }`}
          onClick={() => handleClick('simulation')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill={selectedIcon === 'simulation' ? 'white' : '#174A5F'} 
              d="M8.616 16.385v-.48q0-.926.936-1.492T12 13.846t2.448.567t.937 1.493v.479zM12 13q-.69 0-1.191-.501t-.501-1.191t.5-1.192q.502-.5 1.192-.5t1.191.5t.501 1.192q0 .69-.5 1.191Q12.69 13 12 13M3.02 8.72v8.15q.214.459.964.831t1.824.555V9.83q-.973-.183-1.668-.46q-.696-.279-1.12-.652m17.96-.006q-.424.373-1.116.651t-1.672.461v8.43q1.074-.182 1.824-.554t.965-.832zM6.809 19.536q-2.26-.293-3.495-.954t-1.294-1.6V7.404q0-1.195 2.51-1.796q2.512-.602 7.47-.602t7.47.602q2.51.602 2.51 1.796v9.577q-.057.938-1.292 1.6t-3.496.954V8.977q1.449-.258 2.398-.651t1.316-.899q-.787-.713-3.05-1.07T12 6q-3.67 0-6.029.386q-2.36.385-2.877 1.041q.31.512 1.259.902t2.455.648zM3.019 8.719v9.152zm17.962-.005v9.157z"
              className="group-hover:fill-white"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}