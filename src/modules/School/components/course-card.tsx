"use client"

// Book Icon Component
function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 21.5H6C5.60218 21.4995 5.22064 21.3414 4.93934 21.0602C4.65804 20.7789 4.5 20.3977 4.5 20V2C4.5 1.60232 4.65804 1.22107 4.93934 0.93986C5.22064 0.65864 5.60218 0.5 6 0.5H18C18.3977 0.5 18.779 0.65864 19.0602 0.93986C19.3414 1.22107 19.5 1.60232 19.5 2V14.4636L15.75 12.5886L12 14.4636V2H6V20H18V17H19.5V20C19.5 20.3977 19.3414 20.7789 19.0602 21.0602C18.779 21.3414 18.3977 21.5 18 21.5ZM15.75 10.9114L18 12.0364V2H13.5V12.0364L15.75 10.9114Z"
        fill="#1a1a1a"
      />
    </svg>
  )
}

// Star Icon Component
function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M7.082 4.742C7.41 4.086 8.34 4.113 8.641 4.742L10.445 8.379L14.438 8.953C15.148 9.062 15.422 9.938 14.902 10.457L12.031 13.273L12.715 17.238C12.824 17.949 12.059 18.496 11.43 18.168L7.875 16.281L4.293 18.168C3.664 18.496 2.898 17.949 3.008 17.238L3.691 13.273L0.82 10.457C0.301 9.938 0.574 9.062 1.285 8.953L5.305 8.379L7.082 4.742Z"
        fill="#F8BC24"
      />
    </svg>
  )
}

// Three Dots Menu Icon
function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="4" cy="8" r="1.5" fill="#1C274C" />
      <circle cx="8" cy="8" r="1.5" fill="#1C274C" opacity="0.5" />
      <circle cx="12" cy="8" r="1.5" fill="#1C274C" />
    </svg>
  )
}

export interface Course {
  id: string
  title: string
  code: string
  description: string
  rating?: number
}

interface CourseCardProps {
  course: Course
  onGoToCourse?: (course: Course) => void
}

export function CourseCard({ course, onGoToCourse }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-[298px] overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
            <BookIcon />
          </div>
          <h3 className="text-base font-medium text-[#1a1a1a]">{course.title}</h3>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
          <MoreIcon />
        </button>
      </div>

      <div className="px-4 pb-3">
        <p className="text-sm text-gray-500">{course.description || course.code}</p>
      </div>

      <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <StarIcon />
          <span className="text-sm text-gray-600">({course.rating?.toFixed(1) || "4.8"} Reviews)</span>
        </div>
        <button
          onClick={() => onGoToCourse?.(course)}
          className="px-4 h-9 bg-[#174a5f] hover:bg-[#174a5f]/90 text-white rounded-md text-sm font-medium transition-colors whitespace-nowrap"
        >
          Go to Course
        </button>
      </div>
    </div>
  )
}
