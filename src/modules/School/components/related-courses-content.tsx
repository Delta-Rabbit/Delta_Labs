"use client"

export function RelatedCoursesContent() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="mb-6">
        <svg width="150" height="120" viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Back page */}
          <rect x="35" y="25" width="70" height="80" rx="4" fill="#F2F2F2" stroke="#BABABA" strokeWidth="1" />
          {/* Middle page */}
          <rect x="40" y="20" width="70" height="80" rx="4" fill="white" stroke="#BABABA" strokeWidth="1" />
          {/* Front page with content */}
          <rect x="45" y="15" width="70" height="80" rx="4" fill="white" stroke="#BABABA" strokeWidth="1" />
          {/* Bullet points - Row 1 */}
          <circle cx="53" cy="30" r="2" fill="#D2D2D2" />
          <line x1="60" y1="30" x2="105" y2="30" stroke="#D2D2D2" strokeWidth="2" strokeLinecap="round" />
          {/* Bullet points - Row 2 */}
          <circle cx="53" cy="42" r="2" fill="#D2D2D2" />
          <line x1="60" y1="42" x2="105" y2="42" stroke="#D2D2D2" strokeWidth="2" strokeLinecap="round" />
          {/* Bullet points - Row 3 */}
          <circle cx="53" cy="54" r="2" fill="#D2D2D2" />
          <line x1="60" y1="54" x2="105" y2="54" stroke="#D2D2D2" strokeWidth="2" strokeLinecap="round" />
          {/* Magnifying glass */}
          <circle cx="110" cy="65" r="15" stroke="#BABABA" strokeWidth="2" fill="white" />
          <line x1="120" y1="76" x2="130" y2="86" stroke="#BABABA" strokeWidth="2.5" strokeLinecap="round" />
          {/* Decorative elements */}
          <circle cx="30" cy="15" r="1.5" fill="#CFCFCF" />
          <circle cx="125" cy="25" r="1.5" fill="#CFCFCF" />
        </svg>
      </div>

      <p className="text-[#174a5f] text-base font-semibold mb-1">No Related Course</p>
      <p className="text-gray-400 text-sm mb-6">Add new related course</p>

      <div className="flex items-center gap-3">
        {/* Removed search icon from button */}
        <button className="bg-[#174a5f] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#123d4f] transition-colors">
          Search Related Course
        </button>

        <div className="w-10 h-10 rounded-full bg-[#1C274C] flex items-center justify-center">
          <svg width="20" height="22" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 27.243V15.833C15 7.089 21.716 0 30 0C38.284 0 45 7.089 45 15.833V27.243C45 29.275 42.974 30.597 41.251 29.688C39.859 28.953 38.201 29.062 36.906 29.974C35.449 30.999 33.551 30.999 32.094 29.974L31.565 29.602C30.617 28.934 29.383 28.934 28.435 29.602L27.906 29.974C26.449 30.999 24.551 30.999 23.094 29.974C21.799 29.062 20.141 28.953 18.749 29.688C17.027 30.597 15 29.275 15 27.243ZM36 13.458C36 14.77 35.328 15.833 34.5 15.833C33.672 15.833 33 14.77 33 13.458C33 12.147 33.672 11.083 34.5 11.083C35.328 11.083 36 12.147 36 13.458ZM25.5 15.833C26.328 15.833 27 14.77 27 13.458C27 12.147 26.328 11.083 25.5 11.083C24.672 11.083 24 12.147 24 13.458C24 14.77 24.672 15.833 25.5 15.833Z"
              fill="white"
              transform="translate(-15, 0)"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
