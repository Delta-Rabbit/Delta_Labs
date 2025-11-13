'use client'

import ShortVideo from './ShortVideo'
import ButtonRowWithIcon from './ButtonRowWithIcon'
import VideoInfo from './ContentOwner'
import VideoActions from './ReactionButtons'

interface VideoCardProps {
  videoOffsetY?: string
  videoOffsetX?: string
  buttonsOffsetY?: string
  buttonsOffsetX?: string
  infoOffsetY?: string
  infoOffsetX?: string
  actionsOffsetY?: string
  actionsOffsetX?: string
  isActive?: boolean
  onPlay?: () => void
  onPause?: () => void
  onScrollAway?: () => void
  onCommentClick?: () => void
  hideReactionButtons?: boolean // Add this prop
}

export default function VideoCard({
  videoOffsetY = "58px",
  videoOffsetX = "0px",
  buttonsOffsetY = "-5px",
  buttonsOffsetX = "35px",
  infoOffsetY = "-130px",
  infoOffsetX = "0px",
  actionsOffsetY = "180px",
  actionsOffsetX = "-50px",  
  isActive = false,
  onPlay,
  onPause,
  onScrollAway,
  onCommentClick,
  hideReactionButtons = false, // Add default value
}: VideoCardProps) {
  return (
    <div className="flex flex-col items-center justify-center relative h-full">
      <div
        className="relative"
        style={{
          top: videoOffsetY,
          left: videoOffsetX,
        }}
      >
        <ShortVideo 
          isActive={isActive}
          onPlay={onPlay}
          onPause={onPause}
          onScrollAway={onScrollAway}
        />

        {/* Video Actions - Conditionally rendered */}
        {!hideReactionButtons && (
          <div 
            className="absolute flex items-center z-30"
            style={{
              top: actionsOffsetY,
              right: actionsOffsetX,
            }}
          >
            <VideoActions
              likesCount={0}
              commentsCount={0}
              sharesCount={0}
              onLike={() => console.log('Liked!')}
              onComment={onCommentClick}
              onShare={() => console.log('Share clicked')}
            />
          </div>
        )}
      </div>

      <div
        className="relative"
        style={{
          top: buttonsOffsetY,
          left: buttonsOffsetX,
        }}
      >
        <ButtonRowWithIcon />
      </div>

      {/* VideoInfo - Conditionally rendered */}
      {!hideReactionButtons && (
        <div
          className="relative"
          style={{
            top: infoOffsetY,
            left: infoOffsetX,
          }}
        >
          <VideoInfo
            profilePic="/assets/images/profile.jpg"
            name="Abebe Kebede"
            description="Explore Newton's First Law: Objects stay still or move at constant speed unless a force acts on them."
            hashtags={['#Physics #Newton’s First Law ']}
          />
        </div>
      )}
    </div>
  )
}