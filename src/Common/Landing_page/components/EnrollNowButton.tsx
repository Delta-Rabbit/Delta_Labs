interface EnrollNowButtonProps {
  className?: string
}

export default function EnrollNowButton({ className }: EnrollNowButtonProps) {
  return (
    <button
      className={`
        flex-1
        bg-[#174A5F]
        text-white
        font-poppins
        font-medium
        py-3
        px-8
        transition-colors
        rounded-r-lg
        ${className || ""}
      `}
      style={{
        clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
      }}
    >
      Enroll Now
    </button>
  )
}
