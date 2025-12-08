"use client"

// Course Intro Icon
function CourseIntroIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="8" cy="12" r="3" fill="#174a5f" />
      <circle cx="8" cy="24" r="3" fill="#174a5f" />
      <circle cx="8" cy="36" r="3" fill="#174a5f" />
      <rect x="18" y="9" width="24" height="6" rx="3" fill="#174a5f" />
      <rect x="18" y="21" width="24" height="6" rx="3" fill="#174a5f" />
      <rect x="18" y="33" width="24" height="6" rx="3" fill="#174a5f" />
    </svg>
  )
}

// Q&A Icon
function QAIconLarge() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="12" y="6" width="6" height="2" rx="1" fill="#174a5f" />
      <rect x="30" y="6" width="6" height="2" rx="1" fill="#174a5f" />
      <rect x="12" y="40" width="6" height="2" rx="1" fill="#174a5f" />
      <rect x="30" y="40" width="6" height="2" rx="1" fill="#174a5f" />
      <rect x="6" y="12" width="2" height="6" rx="1" fill="#174a5f" />
      <rect x="6" y="30" width="2" height="6" rx="1" fill="#174a5f" />
      <rect x="40" y="12" width="2" height="6" rx="1" fill="#174a5f" />
      <rect x="40" y="30" width="2" height="6" rx="1" fill="#174a5f" />
      <text x="24" y="32" fontSize="24" fill="#174a5f" fontWeight="bold" textAnchor="middle">
        ?
      </text>
    </svg>
  )
}

// Exercise Icon
function ExerciseIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="10" y="10" width="28" height="28" rx="4" fill="none" stroke="#174a5f" strokeWidth="2" />
      <text x="24" y="32" fontSize="24" fill="#174a5f" fontWeight="bold" textAnchor="middle">
        ?
      </text>
    </svg>
  )
}

// Fast Summary Icon
function FastSummaryIconLarge() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="12" y="8" width="24" height="32" rx="2" fill="none" stroke="#174a5f" strokeWidth="2" />
      <line x1="16" y1="16" x2="32" y2="16" stroke="#174a5f" strokeWidth="2" />
      <line x1="16" y1="22" x2="28" y2="22" stroke="#174a5f" strokeWidth="2" />
      <path d="M18 30C18 30 20 28 22 28C24 28 26 30 26 30" stroke="#174a5f" strokeWidth="2" fill="none" />
    </svg>
  )
}

// Report Icon
function ReportIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M12 10L12 38L18 32L24 38L24 10Z" fill="none" stroke="#174a5f" strokeWidth="2" />
    </svg>
  )
}

// Communication Icon
function CommunicationIconLarge() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="18" cy="16" r="6" fill="none" stroke="#174a5f" strokeWidth="2" />
      <circle cx="30" cy="16" r="6" fill="none" stroke="#174a5f" strokeWidth="2" />
      <path d="M12 36C12 32 14 28 18 28C22 28 24 32 24 36" fill="none" stroke="#174a5f" strokeWidth="2" />
      <path d="M24 36C24 32 26 28 30 28C34 28 36 32 36 36" fill="none" stroke="#174a5f" strokeWidth="2" />
    </svg>
  )
}

// Payment & Enrollment Icon
function PaymentIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="10" y="14" width="28" height="20" rx="2" fill="none" stroke="#174a5f" strokeWidth="2" />
      <line x1="10" y1="20" x2="38" y2="20" stroke="#174a5f" strokeWidth="2" />
      <path d="M16 28L20 32L30 22" stroke="#174a5f" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Course Config Icon
function CourseConfigIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="14" y="10" width="20" height="28" rx="2" fill="none" stroke="#174a5f" strokeWidth="2" />
      <circle cx="24" cy="24" r="6" fill="none" stroke="#174a5f" strokeWidth="2" />
      <circle cx="24" cy="24" r="2" fill="#174a5f" />
    </svg>
  )
}

// Other Icon
function OtherIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="14" cy="24" r="3" fill="#174a5f" />
      <circle cx="24" cy="24" r="3" fill="#174a5f" />
      <circle cx="34" cy="24" r="3" fill="#174a5f" />
    </svg>
  )
}

interface ContentOptionsModalProps {
  isOpen: boolean
  onClose: () => void
}

const options = [
  { id: "course-intro", label: "Course Intro", icon: CourseIntroIcon },
  { id: "qa", label: "Q&A", icon: QAIconLarge },
  { id: "exercise", label: "Exercise", icon: ExerciseIcon },
  { id: "fast-summary", label: "Fast Summary", icon: FastSummaryIconLarge },
  { id: "report", label: "Report", icon: ReportIcon },
  { id: "communication", label: "Communication", icon: CommunicationIconLarge },
  { id: "payment", label: "Payment &\nEnrollment", icon: PaymentIcon },
  { id: "config", label: "Course Config", icon: CourseConfigIcon },
  { id: "other", label: "Other", icon: OtherIcon },
]

export function ContentOptionsModal({ isOpen, onClose }: ContentOptionsModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#dce5e9] rounded-lg p-12 z-50 shadow-xl">
        <div className="grid grid-cols-3 gap-x-16 gap-y-12">
          {options.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.id}
                className="flex flex-col items-center justify-center gap-3 hover:opacity-70 transition-opacity"
                onClick={() => {
                  console.log(`Selected: ${option.label}`)
                  onClose()
                }}
              >
                <Icon />
                <span className="text-[#174a5f] text-sm font-medium text-center whitespace-pre-line">
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
