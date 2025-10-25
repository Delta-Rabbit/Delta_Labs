interface EnrollNowButtonProps {
  className?: string
}

export default function EnrollNowButton({ className }: EnrollNowButtonProps) {
  return (
    <button
      className={`
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
        width: "183px",
        height: "50px",
        clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
      }}
    >
      Enroll Now
    </button>
  )
}