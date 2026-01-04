'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Reply } from "lucide-react"

interface ReplyType {
  id: number
  text: string
  likes: number
  dislikes: number
  userLiked: boolean
  userDisliked: boolean
}

interface CommentItemProps {
  id: number
  text: string
  likes: number
  dislikes: number
  replies: number
}

export default function CommentItem({ id, text, likes, dislikes, replies }: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [commentLikes, setCommentLikes] = useState(likes)
  const [commentDislikes, setCommentDislikes] = useState(dislikes)
  const [userLiked, setUserLiked] = useState(false)
  const [userDisliked, setUserDisliked] = useState(false)
  
  const [commentReplies, setCommentReplies] = useState<ReplyType[]>([
    {
      id: 1,
      text: "I completely agree with this perspective!",
      likes: 42,
      dislikes: 2,
      userLiked: false,
      userDisliked: false
    },
    {
      id: 2,
      text: "This is such an important discussion to have.",
      likes: 28,
      dislikes: 1,
      userLiked: false,
      userDisliked: false
    }
  ])

  const handleLike = () => {
    if (userLiked) {
      setCommentLikes(commentLikes - 1)
      setUserLiked(false)
    } else {
      setCommentLikes(commentLikes + 1)
      setUserLiked(true)
      if (userDisliked) {
        setCommentDislikes(commentDislikes - 1)
        setUserDisliked(false)
      }
    }
  }

  const handleDislike = () => {
    if (userDisliked) {
      setCommentDislikes(commentDislikes - 1)
      setUserDisliked(false)
    } else {
      setCommentDislikes(commentDislikes + 1)
      setUserDisliked(true)
      if (userLiked) {
        setCommentLikes(commentLikes - 1)
        setUserLiked(false)
      }
    }
  }

  const handleReplyLike = (replyId: number) => {
    setCommentReplies(prev => prev.map(reply => 
      reply.id === replyId 
        ? {
            ...reply,
            likes: reply.userLiked ? reply.likes - 1 : reply.likes + 1,
            dislikes: reply.userLiked && reply.userDisliked ? reply.dislikes : reply.dislikes,
            userLiked: !reply.userLiked,
            userDisliked: reply.userLiked ? false : reply.userDisliked
          }
        : reply
    ))
  }

  const handleReplyDislike = (replyId: number) => {
    setCommentReplies(prev => prev.map(reply => 
      reply.id === replyId 
        ? {
            ...reply,
            dislikes: reply.userDisliked ? reply.dislikes - 1 : reply.dislikes + 1,
            likes: reply.userDisliked && reply.userLiked ? reply.likes : reply.likes,
            userDisliked: !reply.userDisliked,
            userLiked: reply.userDisliked ? false : reply.userLiked
          }
        : reply
    ))
  }

  const handleAddReply = () => {
    if (replyText.trim()) {
      const newReply: ReplyType = {
        id: Date.now(),
        text: replyText,
        likes: 0,
        dislikes: 0,
        userLiked: false,
        userDisliked: false
      }
      setCommentReplies(prev => [...prev, newReply])
      setReplyText('')
      setShowReplyInput(false)
      setShowReplies(true)
    }
  }

  return (
    <div className="flex gap-3 mb-4">
      <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img 
          src="/assets/images/profile.png" 
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-800 leading-relaxed mb-2">{text}</p>

        <div className="flex items-center gap-4 mb-1">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${
              userLiked ? 'text-[#174a5f]' : 'text-gray-600 hover:text-[#174a5f]'
            }`}
          >
            {userLiked ? (
              <ThumbsUp className="w-3 h-3" fill="#174a5f" />
            ) : (
              <ThumbsUp className="w-3 h-3" />
            )}
            <span className="text-xs font-medium">{commentLikes}</span>
          </button>

          <button 
            onClick={handleDislike}
            className={`flex items-center gap-1 transition-colors ${
              userDisliked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
          >
            {userDisliked ? (
              <ThumbsDown className="w-3 h-3" fill="#ef4444" />
            ) : (
              <ThumbsDown className="w-3 h-3" />
            )}
            <span className="text-xs font-medium">{commentDislikes}</span>
          </button>

          <button 
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="flex items-center gap-1 text-gray-600 hover:text-[#174a5f] transition-colors"
          >
            <Reply className="w-3 h-3" />
            <span className="text-xs font-medium">Reply</span>
          </button>
        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 outline-none bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 text-sm text-black placeholder:text-gray-500"
              onKeyPress={(e) => e.key === 'Enter' && handleAddReply()}
            />
            <button 
              onClick={handleAddReply}
              className="bg-[#174a5f] text-white rounded-lg px-3 py-1 text-sm hover:bg-[#0f3544] transition-colors"
            >
              Post
            </button>
          </div>
        )}

        {/* View Replies Button */}
        {commentReplies.length > 0 && (
          <button 
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1 text-sm text-black hover:text-[#174a5f] transition-colors font-medium mt-2"
          >
            {showReplies ? 'Hide' : 'View'} {commentReplies.length} {commentReplies.length === 1 ? 'reply' : 'replies'}
            <svg className={`w-3 h-3 transition-transform ${showReplies ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        {/* Replies Section */}
        {showReplies && commentReplies.length > 0 && (
          <div className="mt-3 space-y-3 border-l-2 border-gray-200 pl-3 ml-2">
            {commentReplies.map((reply) => (
              <div key={reply.id} className="flex gap-2">
                <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src="/assets/images/profile.png" 
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-800 leading-relaxed mb-1">{reply.text}</p>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleReplyLike(reply.id)}
                      className={`flex items-center gap-1 transition-colors ${
                        reply.userLiked ? 'text-[#174a5f]' : 'text-gray-600 hover:text-[#174a5f]'
                      }`}
                    >
                      {reply.userLiked ? (
                        <ThumbsUp className="w-3 h-3" fill="#174a5f" />
                      ) : (
                        <ThumbsUp className="w-3 h-3" />
                      )}
                      <span className="text-xs font-medium">{reply.likes}</span>
                    </button>
                    <button 
                      onClick={() => handleReplyDislike(reply.id)}
                      className={`flex items-center gap-1 transition-colors ${
                        reply.userDisliked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}
                    >
                      {reply.userDisliked ? (
                        <ThumbsDown className="w-3 h-3" fill="#ef4444" />
                      ) : (
                        <ThumbsDown className="w-3 h-3" />
                      )}
                      <span className="text-xs font-medium">{reply.dislikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}