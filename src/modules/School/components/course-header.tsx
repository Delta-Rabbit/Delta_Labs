"use client"

interface CourseHeaderProps {
  title: string
  onBack?: () => void
}

// Back Arrow Icon
const BackArrowIcon = () => (
  <svg width="28" height="30" viewBox="0 0 28 30" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.197 16.003L10.7008 15.4992L10.197 14.9954C9.91872 15.2736 9.91872 15.7247 10.197 16.003ZM11.7084 15.4992L17.8546 9.35303C18.1328 9.07478 18.1328 8.62365 17.8546 8.3454C17.5763 8.06716 17.1252 8.06716 16.847 8.3454L10.197 14.9954L10.7008 15.4992L10.197 16.003L16.847 22.653C17.1252 22.9313 17.5763 22.9313 17.8546 22.653C18.1328 22.3747 18.1328 21.9237 17.8546 21.6454L11.7084 15.4992Z"
      fill="#323338"
    />
  </svg>
)

// Book Icon
const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 21.5H2C1.60232 21.4995 1.22102 21.3414 0.939781 21.0602C0.658565 20.7789 0.500455 20.3977 0.5 20V2C0.500455 1.6023 0.658565 1.221 0.939781 0.93978C1.22102 0.65856 1.60232 0.5004 2 0.5H14C14.3977 0.50046 14.779 0.65864 15.0602 0.93984C15.3414 1.22105 15.4995 1.60232 15.5 2V14.4636L11.75 12.5886L8 14.4636V2H2V20H14V17H15.5V20C15.4995 20.3977 15.3413 20.7789 15.0601 21.0601C14.7789 21.3413 14.3977 21.4995 14 21.5ZM11.75 10.9114L14 12.0364V2H9.5V12.0364L11.75 10.9114Z"
      fill="black"
    />
  </svg>
)

// Integrate Icon (wrench tool)
const IntegrateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M14.246 4.13281L8.133 10.2464L11.66 13.7734C13.348 15.4616 16.085 15.4616 17.773 13.7734C19.462 12.0852 19.462 9.3481 17.773 7.6599L14.246 4.13281Z"
      stroke="#174A5F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M9.212 8.5028L7 6.291" stroke="#174A5F" strokeWidth="2" strokeLinecap="round" />
    <path d="M12.503 5.21183L10.291 3" stroke="#174A5F" strokeWidth="2" strokeLinecap="round" />
    <path d="M17.773 13.7734L19.184 15.1842L24 20" stroke="#174A5F" strokeWidth="2" strokeLinecap="round" />
    <path d="M7.193 11.188L15.188 3.19336" stroke="#174A5F" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// Robot/Automate Icon
const AutomateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3.199 17V10C3.199 8.3432 4.542 7 6.199 7H15.799C17.456 7 18.799 8.3432 18.799 10V17C18.799 18.6569 17.456 20 15.799 20H6.199C4.542 20 3.199 18.6569 3.199 17Z"
      stroke="#174A5F"
      strokeWidth="2"
    />
    <path d="M11 4V7" stroke="#174A5F" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M19 11H20C21.105 11 22 11.8954 22 13V14.4459C22 15.2637 21.502 15.9992 20.743 16.3029L19 17"
      stroke="#174A5F"
      strokeWidth="2"
    />
    <path
      d="M3 11H2C0.895 11 0 11.8954 0 13V14.4459C0 15.2637 0.498 15.9992 1.257 16.3029L3 17"
      stroke="#174A5F"
      strokeWidth="2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 10.1504C15.47 10.1504 15.85 10.531 15.85 11.0004V13.0004C15.85 13.4698 15.47 13.8504 15 13.8504C14.531 13.8504 14.15 13.4698 14.15 13.0004V11.0004C14.15 10.531 14.531 10.1504 15 10.1504Z"
      fill="#174A5F"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 10.1504C7.47 10.1504 7.85 10.531 7.85 11.0004V13.0004C7.85 13.4698 7.47 13.8504 7 13.8504C6.531 13.8504 6.15 13.4698 6.15 13.0004V11.0004C6.15 10.531 6.531 10.1504 7 10.1504Z"
      fill="#174A5F"
    />
    <path
      d="M11 4C12.105 4 13 3.10457 13 2C13 0.89543 12.105 0 11 0C9.895 0 9 0.89543 9 2C9 3.10457 9.895 4 11 4Z"
      fill="#174A5F"
    />
    <path d="M9 16H13" stroke="#174A5F" strokeWidth="2" strokeLinecap="round" />
    <path d="M21 11V9" stroke="#174A5F" strokeWidth="2" strokeLinecap="round" />
    <path d="M1 11V9" stroke="#174A5F" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// Share/Invite Icon
const InviteIcon = () => (
  <svg width="17" height="18" viewBox="0 0 17 18" fill="none">
    <path
      d="M6.13 18.9173H10.88C14.83 18.9173 16.42 17.334 16.42 13.3756V8.6257C16.42 4.66732 14.83 3.08398 10.88 3.08398H6.13C2.17 3.08398 0.58 4.66732 0.58 8.6257V13.3756C0.58 17.334 2.17 18.9173 6.13 18.9173Z"
      stroke="#174A5F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.38 7.5801H10.74V10.9446"
      stroke="#174A5F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.74 7.5801L6.26 12.0609"
      stroke="#174A5F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.75 14.5703C6.83 15.5995 10.17 15.5995 13.25 14.5703"
      stroke="#174A5F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Link Icon
const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M10.13 2.23707C11.25 1.11721 12.97 1.02642 13.97 2.03429C14.97 3.04216 14.88 4.76699 13.77 5.88685L12.15 7.50906"
      stroke="#174A5F"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6.7 9.334C5.69 8.3261 5.78 6.60124 6.9 5.48138L8.33 4.04211"
      stroke="#174A5F"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9.3 6.66602C10.31 7.6739 10.22 9.3987 9.1 10.5186L7.49 12.1407L5.87 13.7629C4.75 14.8828 3.04 14.9735 2.03 13.9657C1.03 12.9578 1.12 11.2329 2.23 10.1131L3.85 8.4909"
      stroke="#174A5F"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

// Play Button Icon
const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M17.41 8.3526C19.53 9.5065 19.53 12.4935 17.41 13.6474L4.6 20.6145C2.53 21.736 0 20.2763 0 17.9671V4.0329C0 1.72368 2.53 0.26402 4.6 1.38548L17.41 8.3526Z"
      stroke="#174A5F"
      strokeWidth="1.75"
    />
  </svg>
)

export function CourseHeader({ title, onBack }: CourseHeaderProps) {
  return (
    <div className="flex items-center w-full h-[40px] px-4 bg-white border-b border-gray-100">
      {/* Left section: Back arrow + Book icon + Title */}
      <div className="flex items-center gap-3">
        {/* Back arrow icon */}
        <button onClick={onBack} className="flex items-center cursor-pointer hover:opacity-70 transition-opacity">
          <BackArrowIcon />
        </button>

        {/* Book icon */}
        <div className="flex items-center">
          <BookIcon />
        </div>

        {/* Title */}
        <span className="text-base font-medium text-gray-900">{title}</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right section: Action buttons */}
      <div className="flex items-center gap-5">
        {/* Integrate with icon */}
        <button className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
          <IntegrateIcon />
          <span className="text-sm text-gray-700">Integrate</span>
        </button>

        {/* Automate with icon */}
        <button className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
          <AutomateIcon />
          <span className="text-sm text-gray-700">Automate</span>
        </button>

        {/* Invite button with border */}
        <div className="flex items-center border border-[#174A5F]/40 rounded-[3px]">
          <button className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-gray-50 transition-colors">
            <InviteIcon />
            <span className="text-sm text-[#174A5F]">Invite</span>
          </button>
          {/* Separator */}
          <div className="h-[20px] w-px bg-[#174A5F]" />
          {/* Link icon */}
          <button className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-50 transition-colors">
            <LinkIcon />
          </button>
        </div>

        {/* Run with play button */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#174A5F]">Run</span>
          <button className="flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
            <PlayIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
