'use client'

import { useState } from 'react'
import { ShareModal } from './ShareModal'

interface VideoActionsProps {
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
  likesCount?: number
  commentsCount?: number
  sharesCount?: number
  onCommentClick?: () => void
}

export default function VideoActions({
  onLike,
  onComment,
  onShare,
  likesCount = 0,
  commentsCount = 0,
  sharesCount = 0,
  onCommentClick,
}: VideoActionsProps) {
  const [liked, setLiked] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    onLike && onLike()
  }

  const handleCommentClick = () => {
    onComment && onComment()
    onCommentClick && onCommentClick()
  }
  const handleShareClick = () => {
    setShowShareModal(true) // Open the share modal
    onShare && onShare()
  }

  const ReactionButton = ({ icon, count, onClick }: { icon: 'like' | 'comment' | 'share', count: number, onClick?: () => void }) => {
    const icons = {
      like: liked ? (
        <svg width="52" height="82" viewBox="0 0 52 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_i_like)">
            <circle cx="26" cy="26" r="26" fill="white"/>
          </g>
          <path 
            d="M34.5 14C31.5 14 28.8 15.4 27 17.5C25.2 15.4 22.5 14 19.5 14C14.5 14 10.5 18 10.5 23C10.5 29 16.5 34.5 24.5 42L27 44.5L29.5 42C37.5 34.5 43.5 29 43.5 23C43.5 18 39.5 14 34.5 14Z" 
            fill="#174A5F"
          />
          <text fill="black" fontFamily="Poppins" fontSize="14" fontWeight="500" x="50%" y="76" textAnchor="middle">
            {likesCount + 1}
          </text>
          <defs>
            <filter id="filter0_i_like" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="1.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_like"/>
            </filter>
          </defs>
        </svg>
      ) : (
        <svg width="52" height="82" viewBox="0 0 52 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_i_like)">
            <circle cx="26" cy="26" r="26" fill="white"/>
          </g>
          <path 
            d="M34.5 14C31.5 14 28.8 15.4 27 17.5C25.2 15.4 22.5 14 19.5 14C14.5 14 10.5 18 10.5 23C10.5 29 16.5 34.5 24.5 42L27 44.5L29.5 42C37.5 34.5 43.5 29 43.5 23C43.5 18 39.5 14 34.5 14ZM27.5 39.5L27 40L26.5 39.5C19.5 32.5 14.5 27.5 14.5 23C14.5 19.5 17 17 19.5 17C22 17 24.5 18.5 25.5 21H28C29 18.5 31.5 17 34 17C36.5 17 39 19.5 39 23C39 27.5 34 32.5 27.5 39.5Z" 
            fill="#174A5F"
          />
          <text fill="black" fontFamily="Poppins" fontSize="14" fontWeight="500" x="50%" y="76" textAnchor="middle">
            {count}
          </text>
          <defs>
            <filter id="filter0_i_like" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="1.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_like"/>
            </filter>
          </defs>
        </svg>
      ),
      comment: (
        <svg width="52" height="82" viewBox="0 0 52 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_i_comment)">
            <circle cx="26" cy="26" r="26" fill="white"/>
          </g>
          <path d="M41.5 15C41.5 13.5 40.2 12 38.5 12H14.5C12.8 12 11.5 13.5 11.5 15V33C11.5 34.5 12.8 36 14.5 36H35.5L41.5 42V15ZM38.5 15V35L36.5 33H14.5V15H38.5ZM17.5 27H35.5V30H17.5V27ZM17.5 22.5H35.5V25.5H17.5V22.5ZM17.5 18H35.5V21H17.5V18Z" fill="#174A5F"/>
          <text fill="black" fontFamily="Poppins" fontSize="14" fontWeight="500" x="50%" y="76" textAnchor="middle">
            {count}
          </text>
          <defs>
            <filter id="filter0_i_comment" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="1.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_comment"/>
            </filter>
          </defs>
        </svg>
      ),
      share: (
        <svg width="52" height="82" viewBox="0 0 52 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_i_share)">
            <circle cx="26" cy="26" r="26" fill="white"/>
          </g>
          <path d="M20.5 32C20 32 19.5 31.8 19 31.5C18.5 31.2 18.2 30.8 18 30.3V21.5C18 20.5 18.4 19.7 19.2 19C20 18.3 20.8 18 21.8 18H36.5L33 14.5C32.5 14 32.2 13.5 32.2 12.8C32.2 12.1 32.5 11.6 33 11C33.5 10.4 34 10.2 34.7 10.2C35.4 10.2 35.9 10.4 36.5 11L41.5 16C42 16.5 42.2 17 42.2 17.7C42.2 18.4 42 18.9 41.5 19.5L36.5 24.5C36 25 35.5 25.2 34.8 25.2C34.1 25.2 33.6 25 33 24.5C32.4 23.9 32.2 23.4 32.2 22.7C32.2 22 32.4 21.5 33 21L36.5 17.5H21.8V30.3C21.8 30.8 21.6 31.2 21.2 31.5C20.8 31.8 20.3 32 20.5 32ZM15.5 42C14.5 42 13.7 41.6 13 40.8C12.3 40 12 39.2 12 38.2V14.8C12 14.3 12.2 13.8 12.5 13.5C12.8 13.2 13.3 13 13.8 13C14.3 13 14.8 13.2 15.1 13.5C15.4 13.8 15.5 14.3 15.5 14.8V38.2H36V33.5C36 33 36.2 32.5 36.5 32.2C36.8 31.9 37.3 31.8 37.8 31.8C38.3 31.8 38.8 31.9 39.1 32.2C39.4 32.5 39.5 33 39.5 33.5V38.2C39.5 39.2 39.1 40 38.3 40.8C37.5 41.6 36.7 42 35.7 42H15.5Z" fill="#174A5F"/>
          <text fill="black" fontFamily="Poppins" fontSize="14" fontWeight="500" x="50%" y="76" textAnchor="middle">
            {count}
          </text>
          <defs>
            <filter id="filter0_i_share" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="1.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_share"/>
            </filter>
          </defs>
        </svg>
      ),
    };

    return (
      <button 
        className="flex flex-col items-center gap-2 focus:outline-none"
        onClick={onClick}
      >
        {icons[icon]}
      </button>
    );
  };

  return (
    <>
      <div className="hidden lg:flex flex-col justify-between h-[320px] w-[52px]">
        <ReactionButton 
          icon="like" 
          count={likesCount} 
          onClick={handleLike}
        />
        <ReactionButton 
          icon="comment" 
          count={commentsCount} 
          onClick={handleCommentClick}
        />
        <ReactionButton 
          icon="share" 
          count={sharesCount} 
          onClick={handleShareClick} // Updated to use the new handler
        />
      </div>

      {/* Share Modal */}
      <ShareModal 
  isOpen={showShareModal}
  onClose={() => setShowShareModal(false)}
  shareCount={sharesCount}
  position={{
    top: '55%',     // Customize as needed
    right: '140px', // Customize as needed
    // Or use other positioning:
    // bottom: '20px',
    // left: '50%',
    // transform: 'translateX(-50%)'
  }}
/>
    </>
  );
}