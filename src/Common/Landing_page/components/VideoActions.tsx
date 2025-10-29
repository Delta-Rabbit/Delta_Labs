'use client'

import { useState } from 'react'

const HeartOutline = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24" {...props}>
    <path
      fill="#174A5F"
      d="M20.16 5A6.29 6.29 0 0 0 12 4.36a6.27 6.27 0 0 0-8.16 9.48l6.21 6.22a2.78 2.78 0 0 0 3.9 0l6.21-6.22a6.27 6.27 0 0 0 0-8.84Zm-1.41 7.46l-6.21 6.21a.76.76 0 0 1-1.08 0l-6.21-6.24a4.29 4.29 0 0 1 0-6a4.27 4.27 0 0 1 6 0a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 0a4.29 4.29 0 0 1 .08 6Z"
    ></path>
  </svg>
)

const HeartFilled = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 16 16" {...props}>
    <path
      fill="#174A5F"
      d="M12 2S9 2 8 5C7 2 4 2 4 2C1.8 2 0 3.8 0 6c0 4.1 8 9 8 9s8-5 8-9c0-2.2-1.8-4-4-4z"
    ></path>
  </svg>
)

const Comment = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 32 32" {...props}>
    <path
      fill="#174A5F"
      d="M3 6v20h9.586L16 29.414L19.414 26H29V6zm2 2h22v16h-8.414L16 26.586L13.414 24H5zm4 3v2h14v-2zm0 4v2h14v-2zm0 4v2h10v-2z"
    ></path>
  </svg>
)

const ShareBoxed = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 8 8" {...props}>
    <path
      fill="#174A5F"
      d="M.75 0C.34 0 0 .34 0 .75v5.5c0 .41.34.75.75.75h4.5c.41 0 .75-.34.75-.75V5H5v1H1V1h2V0H.75zM6 0v1C3.95 1 2.3 2.54 2.06 4.53C2.27 3.65 3.05 3 4 3h2v1l2-2l-2-2z"
    ></path>
  </svg>
)

interface VideoActionsProps {
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
  likesCount?: number
  commentsCount?: number
  sharesCount?: number
}

export default function VideoActions({
  onLike,
  onComment,
  onShare,
  likesCount = 0,
  commentsCount = 0,
  sharesCount = 0,
}: VideoActionsProps) {
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    onLike && onLike()
  }

  const circleClass =
    'w-14 h-14 flex items-center justify-center rounded-full bg-white/90 border border-black/30 shadow-md transition-transform'

  return (
    <div className="flex flex-col items-center space-y-5 absolute right-8 bottom-28 z-20">
      <button onClick={handleLike} className="flex flex-col items-center focus:outline-none">
        <div className={circleClass}>
          {liked ? <HeartFilled /> : <HeartOutline />}
        </div>
        <span
          className={`text-xs mt-1 font-semibold transition-colors ${
            liked ? 'text-[#174A5F]' : 'text-black'
          }`}
        >
          {liked ? likesCount + 1 : likesCount}
        </span>
      </button>

      <button onClick={onComment} className="flex flex-col items-center focus:outline-none">
        <div className={circleClass}>
          <Comment />
        </div>
        <span className="text-xs mt-1 text-black">{commentsCount}</span>
      </button>

      <button onClick={onShare} className="flex flex-col items-center focus:outline-none">
        <div className={circleClass}>
          <ShareBoxed />
        </div>
        <span className="text-xs mt-1 text-black">{sharesCount}</span>
      </button>
    </div>
  )
}
