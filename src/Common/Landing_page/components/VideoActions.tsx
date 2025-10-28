'use client'

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
  return (
    <div className="flex flex-col items-center space-y-4 absolute right-4 bottom-24 z-20">

      <button
        onClick={onLike}
        className="flex flex-col items-center text-white focus:outline-none"
      >
        <img
          src="/assets/icons/like.svg"
          alt="Like"
          className="w-10 h-10"
        />
        <span className="text-xs mt-1">{likesCount}</span>
      </button>

      <button
        onClick={onComment}
        className="flex flex-col items-center text-white focus:outline-none"
      >
        <img
          src="/assets/icons/comment.svg"
          alt="Comment"
          className="w-10 h-10"
        />
        <span className="text-xs mt-1">{commentsCount}</span>
      </button>


      <button
        onClick={onShare}
        className="flex flex-col items-center text-white focus:outline-none"
      >
        <img
          src="/assets/icons/share.svg"
          alt="Share"
          className="w-10 h-10"
        />
        <span className="text-xs mt-1">{sharesCount}</span>
      </button>
    </div>
  )
}
