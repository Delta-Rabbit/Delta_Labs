"use client"

import type React from "react"
import { useState } from "react"

interface Comment {
  id: number
  author: string
  text: string
  likes: number
  dislikes: number
  shares: number
  isReply?: boolean
  parentId?: number
}

export function ContentTitleCard() {
  const [keyframeTime, setKeyframeTime] = useState("0:00")
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: "Leul Solomon", text: "Great Job!", likes: 0, dislikes: 0, shares: 0 },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const handleLike = (id: number) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)))
  }

  const handleDislike = (id: number) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, dislikes: c.dislikes + 1 } : c)))
  }

  const handleShare = (id: number) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, shares: c.shares + 1 } : c)))
  }

  const handleAddComment = () => {
    if (newMessage.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        author: "You",
        text: newMessage,
        likes: 0,
        dislikes: 0,
        shares: 0,
        isReply: replyingTo !== null,
        parentId: replyingTo || undefined,
      }
      setComments([...comments, newComment])
      setNewMessage("")
      setReplyingTo(null)
    }
  }

  const handleReply = (id: number) => {
    setReplyingTo(replyingTo === id ? null : id)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddComment()
    }
  }

  return (
    <div
      className="flex flex-col gap-4 max-h-[calc(100vh-200px)] pr-2 overflow-y-scroll pb-40"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="w-[440px] p-6 rounded-lg border border-dashed border-[#D9D9D9] bg-white">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Write a tag here..."
            className="w-full px-4 py-3 text-sm text-gray-600 bg-white border border-[#D9D9D9] rounded-lg outline-none focus:border-[#174a5f] placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Keyframe Time:</span>
          <input
            type="text"
            value={keyframeTime}
            onChange={(e) => setKeyframeTime(e.target.value)}
            placeholder="0:00"
            className="w-16 px-2 py-1 text-sm text-center text-gray-700 bg-white border border-[#D9D9D9] rounded-lg outline-none focus:border-[#174a5f]"
          />
        </div>
      </div>

      <div className="w-[440px] p-4 rounded-lg border border-[#D9D9D9] bg-white">
        <textarea
          placeholder="Write your description here..."
          className="w-full px-0 py-1 text-sm text-gray-600 bg-white border-none outline-none resize-none placeholder:text-gray-400 min-h-[60px]"
        />
      </div>

      <div className="w-[440px]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-semibold text-[#174A5F]">Comments</span>
          <span className="text-lg text-[#174A5F]">{comments.length}</span>
        </div>

        {comments.map((comment) => (
          <div key={comment.id} className={`flex items-start gap-3 mb-4 ${comment.isReply ? "pl-8" : ""}`}>
            <div className="w-[35px] h-[35px] rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              <img
                src="/assets/images/profile.png"
                alt={comment.author}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <span className="text-sm font-medium text-black">{comment.author}</span>
              <p className="text-sm text-black mt-1">{comment.text}</p>

              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1 text-[#174A5F] hover:opacity-70 transition-opacity"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                  <span className="text-xs">{comment.likes}</span>
                </button>

                <button
                  onClick={() => handleDislike(comment.id)}
                  className="flex items-center gap-1 text-[#174A5F] hover:opacity-70 transition-opacity"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                  </svg>
                  <span className="text-xs">{comment.dislikes}</span>
                </button>

                <button
                  onClick={() => handleShare(comment.id)}
                  className="flex items-center gap-1 text-[#174A5F] hover:opacity-70 transition-opacity"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  <span className="text-xs">{comment.shares}</span>
                </button>

                <button
                  onClick={() => handleReply(comment.id)}
                  className={`flex items-center gap-1 text-sm ml-auto transition-opacity hover:opacity-70 ${replyingTo === comment.id ? "text-[#db6f3d]" : "text-[#174A5F]"}`}
                >
                  <span>Reply</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="rounded-lg border border-[#D9D9D9] bg-white p-3 flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={replyingTo ? "Write your reply..." : "Write your message"}
            className="flex-1 text-sm text-black bg-transparent border-none outline-none placeholder:text-gray-400"
          />
          <button
            onClick={handleAddComment}
            className="text-sm text-[#174A5F] font-medium hover:opacity-70 transition-opacity"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
