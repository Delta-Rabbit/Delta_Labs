"use client"

import type React from "react"
import { Link, Send, Share2 } from "lucide-react"
import { useState } from "react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  shareCount?: number
  position?: {
    top?: string | number
    right?: string | number
    bottom?: string | number
    left?: string | number
  }
}

export const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onClose, 
  shareCount = 3,
  position = { top: '50%', right: '80px' }
}) => {
  const [showCopied, setShowCopied] = useState(false)

  if (!isOpen) return null

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 1500) // Hide after 1.5 seconds
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleSendToFriend = () => {
    // Handle send to friend logic
    console.log("Send to friend")
  }

  const handleShareToTelegram = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://t.me/share/url?url=${url}`, "_blank")
  }

  const handleShareToFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
  }

  const handleShareToTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?url=${url}`, "_blank")
  }

  // Build position style dynamically
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    ...position
  }

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {/* Position modal with customizable positioning */}
      <div
        className="bg-white rounded-lg p-2 w-48 shadow-lg"
        style={positionStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Share Options */}
        <div className="space-y-2">
          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors group relative"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Link className="w-4 h-4 text-[#174a5f]" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-gray-900 group-hover:text-[#174a5f]">Copy Link</span>
            
            {/* Copied Notification */}
            {showCopied && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                copied
              </div>
            )}
          </button>

          {/* Send to Friend - Number removed */}
          <button
            onClick={handleSendToFriend}
            className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors group"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Send className="w-4 h-4 text-[#174a5f]" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-gray-900 group-hover:text-[#174a5f]">Send to friend</span>
          </button>

          {/* Share to Telegram */}
          <button
            onClick={handleShareToTelegram}
            className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors group"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#174a5f]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-900 group-hover:text-[#174a5f]">Telegram</span>
          </button>

          {/* Share to Facebook */}
          <button
            onClick={handleShareToFacebook}
            className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors group"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#174a5f]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-900 group-hover:text-[#174a5f]">Facebook</span>
          </button>

          {/* Share to Twitter */}
          <button
            onClick={handleShareToTwitter}
            className="w-full flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition-colors group"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#174a5f]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-900 group-hover:text-[#174a5f]">Twitter</span>
          </button>
        </div>
      </div>
    </div>
  )
}