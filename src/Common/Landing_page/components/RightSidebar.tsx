'use client'

import { useState } from 'react'

interface RightSidebarProps {
  onSelectFeed: (feed: 'video' | 'audio' | 'bot' | 'simulation') => void
}

export default function RightSidebar({ onSelectFeed }: RightSidebarProps) {
  const [selectedIcon, setSelectedIcon] = useState<'video' | 'audio' | 'bot' | 'simulation'>('video')

  const handleClick = (icon: 'video' | 'audio' | 'bot' | 'simulation') => {
    setSelectedIcon(icon)
    onSelectFeed(icon)
  }

  return (
    <aside className="w-24 flex flex-col items-center justify-center space-y-0 py-6 min-h-screen">
      <div
        className={`p-30 w-[60px] h-[120px] flex items-center justify-center transition-all duration-200 cursor-pointer
        ${selectedIcon === 'video' ? 'bg-[#174A5F] text-white' : 'bg-white text-[#174A5F] hover:bg-[#174A5F] hover:text-white'}`}
        onClick={() => handleClick('video')}
      >
        <VideoClipMultiple24Regular className="w-7 h-7 text-current" />
      </div>

      <div
        className={`p-3 w-[60px] h-[120px] flex items-center justify-center transition-all duration-300 cursor-pointer
        ${selectedIcon === 'audio' ? 'bg-[#174A5F] text-white' : 'bg-white text-[#174A5F] hover:bg-[#174A5F] hover:text-white'}`}
        onClick={() => handleClick('audio')}
      >
        <Headphones className="w-7 h-7 text-current" />
      </div>

      <div
        className={`p-3 w-[60px] h-[120px] flex items-center justify-center transition-all duration-300 cursor-pointer
        ${selectedIcon === 'bot' ? 'bg-[#174A5F] text-white' : 'bg-white text-[#174A5F] hover:bg-[#174A5F] hover:text-white'}`}
        onClick={() => handleClick('bot')}
      >
        <Bot className="w-7 h-7 text-current" />
      </div>

      <div
        className={`p-3 w-[60px] h-[120px] flex items-center justify-center transition-all duration-300 cursor-pointer
        ${selectedIcon === 'simulation' ? 'bg-[#174A5F] text-white' : 'bg-white text-[#174A5F] hover:bg-[#174A5F] hover:text-white'}`}
        onClick={() => handleClick('simulation')}
      >
        <SimulationOutline className="w-7 h-7 text-current" />
      </div>
    </aside>
  )
}

export const VideoClipMultiple24Regular = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M8 7.752v5.497a.75.75 0 0 0 1.155.631l4.618-2.959a.5.5 0 0 0 0-.842L9.155 7.12A.75.75 0 0 0 8 7.752ZM5.25 3A3.25 3.25 0 0 0 2 6.25v9a3.25 3.25 0 0 0 3.25 3.25h10.5A3.25 3.25 0 0 0 19 15.25v-9A3.25 3.25 0 0 0 15.75 3H5.25ZM3.5 6.25c0-.966.784-1.75 1.75-1.75h10.5c.966 0 1.75.784 1.75 1.75v9A1.75 1.75 0 0 1 15.75 17H5.25a1.75 1.75 0 0 1-1.75-1.75v-9ZM5.01 19.5A3.247 3.247 0 0 0 7.75 21h8.5c2.9 0 5.25-2.35 5.25-5.25v-7A3.25 3.25 0 0 0 20 6.01v9.74a3.75 3.75 0 0 1-3.75 3.75H5.01Z" />
  </svg>
)

export const Headphones = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M12 1c-5 0-9 4-9 9v7a3 3 0 0 0 3 3h3v-8H5v-2a7 7 0 0 1 7-7a7 7 0 0 1 7 7v2h-4v8h3a3 3 0 0 0 3-3v-7c0-5-4.03-9-9-9Z" />
  </svg>
)

export const Bot = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 0 0 1.99 12v2a1 1 0 0 0 1 1H3v5c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5a1 1 0 0 0 1-1v-1.938a1.006 1.006 0 0 0-.072-.455zM5 20V8h14l.001 3.996L19 12v2l.001.005l.001 5.995H5z" />
    <ellipse cx="8.5" cy="12" fill="currentColor" rx="1.5" ry="2"></ellipse>
    <ellipse cx="15.5" cy="12" fill="currentColor" rx="1.5" ry="2"></ellipse>
    <path fill="currentColor" d="M8 16h8v2H8z"></path>
  </svg>
)

export const SimulationOutline = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M8 17v-.575q0-1.1 1.1-1.763T12 14t2.9.663t1.1 1.762V17zm4-4q-.825 0-1.412-.587T10 11t.588-1.412T12 9t1.413.588T14 11t-.587 1.413T12 13M3 9.2v7.65q.35.325.85.563t1.15.362V9.85q-.55-.125-1.062-.287T3 9.2m18-.025q-.425.2-.925.363T19 9.825v7.95q.65-.125 1.15-.362t.85-.563zM7 20.15q-2.875-.35-4.437-1.175T1 17V7q0-1.425 2.838-2.2T12 4.025t8.163.775T23 7v10q0 1.15-1.562 1.975T17 20.15v-12q1.275-.2 2.263-.488t1.412-.562Q19.6 6.675 17 6.338T12 6t-5 .338t-3.675.762q.425.3 1.413.575T7 8.15zM3 9.2v8.575zm18-.025v8.6z" />
  </svg>
)
