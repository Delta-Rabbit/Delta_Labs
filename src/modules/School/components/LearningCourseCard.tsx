"use client"

interface LearningCourseCardProps {
  isSelected?: boolean
  onToggle?: () => void
  courseTitle?: string
  institution?: string
  rating?: string
  imageUrl?: string
}

export function LearningCourseCard({
  isSelected = false,
  onToggle,
  courseTitle = "Learning JavaScript With Imagination",
  institution = "AAU",
  rating = "4.8 Reviews",
  imageUrl = "/laptopworkspace.jpg",
}: LearningCourseCardProps) {
  return (
    <div className="flex items-start gap-2">
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          isSelected ? "bg-[#174A5F] border-[#174A5F]" : "bg-white border-gray-300 hover:border-[#174A5F]"
        }`}
      >
        {isSelected && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="w-[220px] rounded-2xl border-2 border-gray-300 bg-white p-3 shadow-sm">
        {/* Course image with overlay icons */}
        <div className="relative mb-4">
          <img
            src={imageUrl || "/play-button.png"}
            alt="Course preview"
            className="w-full h-[130px] object-cover rounded-xl"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/play-button.png"
              alt="Play"
              className="w-12 h-12 opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
            />
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {/* People icon */}
            <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  stroke="#174A5F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                  stroke="#174A5F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  stroke="#174A5F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Document icon */}
            <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  stroke="#174A5F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
                  stroke="#174A5F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Download icon */}
            <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                  stroke="#174A5F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <h3 className="text-sm font-bold text-gray-900 mb-2">{courseTitle}</h3>

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-600">{institution}</span>

          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#F8BC24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-[10px] text-gray-500">({rating})</span>
          </div>
        </div>
      </div>
    </div>
  )
}
