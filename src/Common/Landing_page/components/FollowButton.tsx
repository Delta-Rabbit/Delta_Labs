'use client'

import { useState } from "react"

interface FollowButtonProps {
  initialFollowed?: boolean
}

export default function FollowButton({ initialFollowed = false }: FollowButtonProps) {
  const [followed, setFollowed] = useState(initialFollowed)

  const handleClick = () => {
    setFollowed(prev => !prev)
  }

  return (
    <button
      onClick={handleClick}
      className={`
        px-8 py-2
        rounded-[30px]
        font-medium
        transition-all
        duration-300
        ${followed
          ? 'bg-white text-[#174A5F] border border-[#174A5F] shadow-[0_2px_6px_rgba(23,74,95,0.25)]'
          : 'bg-[#174A5F] text-white shadow-[0_2px_6px_rgba(23,74,95,0.35)]'}
      `}
    >
      {followed ? "Following" : "Follow"}
    </button>
  )
}
