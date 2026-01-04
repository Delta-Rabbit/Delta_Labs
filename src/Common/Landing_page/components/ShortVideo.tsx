'use client'

import { useState, useRef, useEffect } from 'react'

interface ShortVideoProps {
  isActive?: boolean
  onPlay?: () => void
  onPause?: () => void
  onScrollAway?: () => void
}

export default function ShortVideo({ 
  isActive = false, 
  onPlay, 
  onPause, 
  onScrollAway 
}: ShortVideoProps) {
  const videoSrc = "/assets/videos/video1.mp4"
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false)

  const videoWidth = 500
  const videoHeight = 360

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isActive && !isPlaying) {
      video.play()
        .then(() => {
          setIsPlaying(true)
          onPlay?.()
        })
        .catch(err => {
          console.warn('Auto-play failed:', err)
        })
    } else if (!isActive && isPlaying) {
      video.pause()
      setIsPlaying(false)
      onPause?.()
    }
  }, [isActive, isPlaying, onPlay, onPause])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
        onPause?.()
      } else {
        if (!isActive) {
          onScrollAway?.()
        }
        
        videoRef.current.play()
        setIsPlaying(true)
        onPlay?.()
      }
      
      setShowPlayPauseIcon(true)
      
      setTimeout(() => {
        setShowPlayPauseIcon(false)
      }, 1000)
    }
  }

  const handleVideoClick = () => {
    togglePlayPause()
  }

  return (
    <div className="flex-1 h-screen flex items-center justify-center p-6">
      <div
        className="relative w-full cursor-pointer"
        style={{ width: `${videoWidth}px`, height: `${videoHeight}px` }}
        onClick={handleVideoClick}
      >
        <div className="relative w-full h-full overflow-hidden rounded-t-xl bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {showPlayPauseIcon && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
                {isPlaying ? (
                  <svg 
                    className="w-12 h-12 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg 
                    className="w-12 h-12 text-white ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}