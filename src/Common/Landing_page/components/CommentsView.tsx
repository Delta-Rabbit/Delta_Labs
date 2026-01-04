'use client'

import { useState } from 'react'
import { ArrowRight, Heart } from "lucide-react"
import CommentItem from "./CommentItem"
import { ShareModal } from './ShareModal'

interface CommentsViewProps {
  onClose?: () => void
}

interface CommentType {
  id: number
  text: string
  likes: number
  dislikes: number
  replies: number
}

export default function CommentsView({ onClose }: CommentsViewProps) {
  const [commentText, setCommentText] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(1200000)
  const [showShareModal, setShowShareModal] = useState(false)
  const [comments, setComments] = useState<CommentType[]>([
    {
      id: 1,
      text: "She doesn't belong here but glad she's seeing the consequences to an action.",
      likes: 1597,
      dislikes: 1597,
      replies: 1597
    },
    {
      id: 2,
      text: "She doesn't belong here but glad she's seeing the consequences to an action.",
      likes: 1597,
      dislikes: 1597,
      replies: 1597
    },
    {
      id: 3,
      text: "She doesn't belong here but glad she's seeing the consequences to an action.",
      likes: 1597,
      dislikes: 1597,
      replies: 1597
    },
    {
      id: 4,
      text: "She doesn't belong here but glad she's seeing the consequences to an action.",
      likes: 1597,
      dislikes: 1597,
      replies: 1597
    }
  ])

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: CommentType = {
        id: Date.now(),
        text: commentText,
        likes: 0,
        dislikes: 0,
        replies: 0
      }
      setComments(prev => [newComment, ...prev])
      setCommentText('')
    }
  }

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing)
  }

  const handleLikeClick = () => {
    if (isLiked) {
      setIsLiked(false)
      setLikeCount(prev => prev - 1)
    } else {
      setIsLiked(true)
      setLikeCount(prev => prev + 1)
    }
  }

  const handleShareClick = () => {
    setShowShareModal(true)
  }

  // Function to format the like count as 1.2M
  const formatLikeCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }

  return (
    <>
      <div className="w-[520px] h-[calc(100vh-2rem)] bg-[#e9e9e9] overflow-y-auto">
        <div className="p-6">
          {/* Author Info Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-gray-200 shadow-md flex-shrink-0 overflow-hidden mt-1">
                  <img 
                    src="/assets/images/profile.png" 
                    alt="Abebe Kebede"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-[#131212] mb-2">Abebe Kebede</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2 line-clamp-2">
                    Explore Newton's First Law: Objects stay still or move at constant speed unless a force acts on them.
                  </p>
                  <div className="flex gap-3 flex-nowrap overflow-hidden">
                    <span className="text-sm text-[#174a5f] font-semibold whitespace-nowrap">#Physics</span>
                    <span className="text-sm text-[#174a5f] font-semibold whitespace-nowrap">#Newton's First Law</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleFollowClick}
                className={`rounded-full px-6 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition-all flex-shrink-0 border-2 ${
                  isFollowing 
                    ? 'bg-transparent border-[#174a5f] text-[#174a5f] hover:bg-gray-50' 
                    : 'bg-[#174a5f] border-[#174a5f] text-white hover:bg-[#0f3544]'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Stats - Comment icon now closes the view */}
            <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
              <button 
                onClick={handleLikeClick}
                className="flex items-center gap-2 text-gray-700 hover:text-[#174a5f] transition-colors cursor-pointer"
              >
                {isLiked ? (
                  <Heart className="w-5 h-5 text-[#174a5f]" fill="#174a5f" />
                ) : (
                  <Heart className="w-5 h-5" />
                )}
                <span className="text-base font-semibold">{formatLikeCount(likeCount)}</span>
              </button>
              <button 
                onClick={onClose}
                className="flex items-center gap-2 text-gray-700 hover:text-[#174a5f] transition-colors cursor-pointer"
              >
                {/* Comment Icon */}
                <svg className="w-5 h-5" viewBox="0 0 32 32">
                  <path fill="currentColor" d="M3 6v20h9.586L16 29.414L19.414 26H29V6zm2 2h22v16h-8.414L16 26.586L13.414 24H5zm4 3v2h14v-2zm0 4v2h14v-2zm0 4v2h10v-2z"/>
                </svg>
                <span className="text-base font-semibold">5514</span>
              </button>
              <button 
                onClick={handleShareClick}
                className="flex items-center gap-2 text-gray-700 hover:text-[#174a5f] transition-colors cursor-pointer"
              >
                {/* Share Icon */}
                <svg className="w-5 h-5" viewBox="0 0 64 64">
                  <path fill="currentColor" d="M29.5 42.6c1.2 0 2.3-1 2.3-2.3v-15c0-5.4 4.4-9.8 9.8-9.8h11.9L47.7 21c-.9.9-.9 2.3-.1 3.2c.4.5 1 .7 1.6.7q.9 0 1.5-.6l9.2-8.7c.6-.6 1-1.5 1-2.4s-.4-1.7-1-2.3l-9.2-8.5c-.9-.8-2.3-.8-3.2.1c-.8.9-.8 2.3.1 3.2l5.8 5.4h-12c-7.9 0-14.3 6.4-14.3 14.3v15c.2 1.2 1.2 2.2 2.4 2.2"/>
                  <path fill="currentColor" d="M59 38.1c-1.2 0-2.3 1-2.3 2.3v14.5c0 1.6-1.3 2.9-2.9 2.9H10.2c-1.6 0-2.9-1.3-2.9-2.9V40.3c0-1.2-1-2.3-2.3-2.3s-2.3 1-2.3 2.3v14.5c0 4.1 3.3 7.4 7.4 7.4h43.7c4.1 0 7.4-3.3 7.4-7.4V40.3c.1-1.2-.9-2.2-2.2-2.2"/>
                </svg>
                <span className="text-base font-semibold">1597</span>
              </button>
            </div>
          </div>

          {/* Write Comment */}
          <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200 mb-6 flex items-center gap-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a Comment"
              className="flex-1 outline-none bg-transparent text-black placeholder:text-gray-500 text-base"
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <button 
              onClick={handleAddComment}
              className="text-[#174a5f] hover:text-[#0f3544] transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-[#131212] mb-6">Comments</h2>

            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  id={comment.id}
                  text={comment.text}
                  likes={comment.likes}
                  dislikes={comment.dislikes}
                  replies={comment.replies}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareCount={1597}
        position={{
          top: '45%',
          right: '100px' // Adjust this based on your layout
        }}
      />
    </>
  )
}