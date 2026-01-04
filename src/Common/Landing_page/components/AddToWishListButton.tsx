interface AddToWishListButtonProps {
  className?: string
}

export default function AddToWishListButton({ className }: AddToWishListButtonProps) {
  return (
    <button
      className={`
        text-[#174A5F]
        transition-all
        duration-300
        hover:bg-[#d9d9d9]
        whitespace-nowrap
        ${className || ""}
      `}
      style={{
        width: "200px",
        height: "50px",
        backgroundColor: "#E9E9E9",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 600,
        fontSize: "12px",
        padding: "10px 25px",
        clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0% 100%)",
        border: "none",
      }}
    >
      ADD TO WISH LIST
    </button>
  )
}
