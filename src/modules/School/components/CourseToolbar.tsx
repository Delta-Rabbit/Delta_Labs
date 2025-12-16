"use client"

import React from "react"

// Icon components using currentColor
const IntegrateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M14.246 4.13281L8.133 10.2464L11.66 13.7734C13.348 15.4616 16.085 15.4616 17.773 13.7734C19.462 12.0852 19.462 9.3481 17.773 7.6599L14.246 4.13281Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M9.212 8.5028L7 6.291" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12.503 5.21183L10.291 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M17.773 13.7734L19.184 15.1842L24 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M7.193 11.188L15.188 3.19336" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const Robot = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M9 15a1 1 0 1 0 1 1a1 1 0 0 0-1-1Zm-7-1a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm20 0a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1Zm-5-7h-4V5.72A2 2 0 0 0 14 4a2 2 0 0 0-4 0a2 2 0 0 0 1 1.72V7H7a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3Zm-3.28 2l-.5 2h-2.44l-.5-2ZM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1.22L9 12.24a1 1 0 0 0 1 .76h4a1 1 0 0 0 1-.76L15.78 9H17a1 1 0 0 1 1 1Zm-3-4a1 1 0 1 0 1 1a1 1 0 0 0-1-1Z"></path>
  </svg>
)

const InviteIcon = () => (
  <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/>
      <path d="M17 3a3 3 0 0 1 2.995 2.824L20 6v4.35l.594-.264c.614-.273 1.322.15 1.4.798L22 11v8a2 2 0 0 1-1.85 1.995L20 21H4a2 2 0 0 1-1.995-1.85L2 19v-8c0-.672.675-1.147 1.297-.955l.11.041l.593.264V6a3 3 0 0 1 2.824-2.995L7 3h10Zm3 9.539l-7.188 3.194a2 2 0 0 1-1.624 0L4 12.54V19h16v-6.461ZM17 5H7a1 1 0 0 0-1 1v5.239l6 2.667l6-2.667V6a1 1 0 0 0-1-1Zm-5 3a1 1 0 0 1 .117 1.993L12 10h-2a1 1 0 0 1-.117-1.993L10 8h2Z"/>
    </g>
  </svg>
)

const Link = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M14.9 1.1c-1.4-1.4-3.7-1.4-5.1 0L5.4 5.4C4 6.9 4 9.1 5.4 10.6c.1.1.3.2.4.3l1.5-1.5c-.1-.1-.3-.2-.4-.3c-.6-.6-.6-1.6 0-2.2l4.4-4.4c.6-.6 1.6-.6 2.2 0s.6 1.6 0 2.2L12.2 6c.4.8.5 1.7.4 2.5l2.3-2.3c1.5-1.4 1.5-3.7 0-5.1z"></path>
    <path d="M10.2 5.1L8.7 6.6s.3.2.4.3c.6.6.6 1.6 0 2.2l-4.4 4.4c-.6.6-1.6.6-2.2 0s-.6-1.6 0-2.2L3.8 10c-.4-.8-.1-1.3-.4-2.5L1.1 9.8c-1.4 1.4-1.4 3.7 0 5.1s3.7 1.4 5.1 0l4.4-4.4c1.4-1.4 1.4-3.7 0-5.1c-.2-.1-.4-.3-.4-.3z"></path>
  </svg>
)

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M17.41 8.3526C19.53 9.5065 19.53 12.4935 17.41 13.6474L4.6 20.6145C2.53 21.736 0 20.2763 0 17.9671V4.0329C0 1.72368 2.53 0.26402 4.6 1.38548L17.41 8.3526Z"
      stroke="currentColor"
      strokeWidth="1.75"
    />
  </svg>
)

export function CourseToolbar() {
  return (
    <div className="flex items-center gap-5 text-[#174A5F]">
      <button className="flex items-center gap-2">
        <IntegrateIcon />
        <span className="text-sm">Integrate</span>
      </button>

      <button className="flex items-center gap-2">
        <Robot />
        <span className="text-sm">Automate</span>
      </button>

      <div className="flex items-center border border-[#174A5F]/40 rounded-[3px]">
        <button className="flex items-center gap-2 px-3 py-1">
          <InviteIcon />
          <span className="text-sm">Invite</span>
        </button>

        <div className="h-[20px] w-px bg-[#174A5F]" />

        <button className="flex items-center px-2 py-1">
          <Link />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Run</span>
        <button className="flex items-center justify-center">
          <PlayIcon />
        </button>
      </div>
    </div>
  )
}
