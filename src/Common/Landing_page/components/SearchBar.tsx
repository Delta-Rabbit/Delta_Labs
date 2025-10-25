'use client'

interface SearchBarProps {
  placeholder?: string
  leftIconSrc?: string
  rightIconSrc?: string
}

export default function SearchBar({
  placeholder = "Search...",
  leftIconSrc = "/assets/icons/left-icon.svg",
  rightIconSrc = "/assets/icons/search-icon.svg",
}: SearchBarProps) {
  return (
    <div className="flex items-center bg-white border border-[#174A5F] rounded-[20px] px-3 py-2 w-full max-w-md">
      
      {leftIconSrc && (
        <img src={leftIconSrc} alt="Left Icon" className="w-5 h-5 mr-2" />
      )}

      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
      />

      {rightIconSrc && (
        <img src={rightIconSrc} alt="Search Icon" className="w-5 h-5 ml-2" />
      )}
    </div>
  )
}
