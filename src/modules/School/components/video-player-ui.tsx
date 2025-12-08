"use client"

interface VideoPlayerUIProps {
  className?: string
}

export function VideoPlayerUI({ className = "" }: VideoPlayerUIProps) {
  return (
    <div className={`relative w-[60vw] h-[258.5px] ${className}`}>
      {/* Outer container with white background and dashed border */}
      <div className="absolute inset-0 bg-white rounded-lg border-2 border-dashed border-[#D9D9D9]" />

      {/* Main video player icon - Camera with play button */}
      <div className="absolute top-[50px] left-1/2 transform -translate-x-1/2">
        <svg width="100" height="110" viewBox="0 0 100 110" fill="none">
          {/* Camera top curve */}
          <path
            d="M76.308 25C77.451 18.476 72.431 12.5 65.808 12.5H11.188C4.565 12.5 -0.455 18.476 0.688 25"
            stroke="#174A5F"
            strokeOpacity="0.7"
            strokeWidth="3.75"
            transform="translate(12, 0)"
          />
          {/* Camera upper section */}
          <path
            d="M65.999 12.5C66.141 11.205 66.212 10.557 66.213 10.022C66.225 4.904 62.369 0.603 57.28 0.057C56.748 0 56.097 0 54.794 0H22.205C20.902 0 20.25 0 19.718 0.057C14.629 0.603 10.774 4.904 10.785 10.022C10.786 10.557 10.857 11.205 10.999 12.5"
            stroke="#174A5F"
            strokeOpacity="0.7"
            strokeWidth="3.75"
            transform="translate(12, 0)"
          />
          {/* Camera body */}
          <path
            d="M84.468 73.965C82.719 86.369 81.845 92.572 77.359 96.286C72.873 100 66.256 100 53.023 100H23.977C10.744 100 4.128 100 -0.358 96.286C-4.844 92.572 -5.719 86.369 -7.468 73.965L-9.582 58.965C-11.813 43.147 -12.928 35.238 -8.188 30.119C-3.449 25 4.988 25 21.862 25H55.138C72.012 25 80.449 25 85.189 30.119C88.933 34.163 89.023 39.949 87.796 50"
            stroke="#174A5F"
            strokeOpacity="0.7"
            strokeWidth="3.75"
            strokeLinecap="round"
            transform="translate(12, 0)"
          />
          {/* Play button triangle */}
          <path
            d="M51.406 58.079C54.198 59.81 54.198 64.291 51.406 66.022L34.548 76.472C31.835 78.154 28.5 75.965 28.5 72.501V51.6C28.5 48.136 31.835 45.947 34.548 47.629L51.406 58.079Z"
            stroke="#174A5F"
            strokeOpacity="0.7"
            strokeWidth="3.75"
            transform="translate(12, 0)"
          />
        </svg>
      </div>

      {/* Text below icon */}
      <div className="absolute top-[170px] left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-400 text-sm">You can upload course into video here</p>
      </div>

      {/* Video control bar */}
      <div className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 w-fit h-[46px] bg-[#174A5F] rounded flex items-center px-4 gap-3">
        {/* Upload icon */}
        <div className="flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M11 16V5M11 5L14.5 8M11 5L7.5 8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.8 21H15.2C18.17 21 19.655 21 20.577 20.392C21.5 19.783 21.5 18.804 21.5 16.846V16.153C21.5 14.195 21.5 13.216 20.577 12.607C19.771 12.075 18.534 12.008 16.25 12M5.75 12C3.466 12.008 2.229 12.075 1.423 12.607C0.5 13.216 0.5 14.195 0.5 16.153V16.846C0.5 18.804 0.5 19.783 1.423 20.392C1.737 20.599 2.118 20.736 2.6 20.826"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Upload text */}
        <span className="text-white text-xs whitespace-nowrap overflow-hidden text-ellipsis">
          Upload your course intro video
        </span>
      </div>
    </div>
  )
}
