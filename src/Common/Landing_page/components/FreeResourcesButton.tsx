interface FreeResourcesButtonProps {
  className?: string
}

export default function FreeResourcesButton({ className }: FreeResourcesButtonProps) {
  return (
    <button
      className={`
        flex-1
        text-[#174A5F]
        transition-all
        duration-300
        hover:bg-[#b0b0b0]
        leading-none
        whitespace-nowrap
        ${className || ""}
      `}
      style={{
        backgroundColor: "#C6C6C6",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 600,
        fontSize: "16px",
        padding: "10px 24px",
        clipPath: "polygon(0 0, 100% 0, 81% 100%, 0% 100%)",
        border: "none",
      }}
    >
      Free Resources
    </button>
  );
}
