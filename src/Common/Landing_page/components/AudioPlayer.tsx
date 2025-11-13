'use client'

import { useEffect, useRef, useState } from 'react'
import ButtonRowWithIcon from './ButtonRowWithIcon'
import VideoInfo from './ContentOwner'
import VideoActions from './ReactionButtons'

interface AudioPlayerProps {
  src?: string
  posterSrc?: string
  className?: string
  audioContainerOffsetY?: string
  audioContainerOffsetX?: string
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
  hideReactionButtons?: boolean
}

export default function AudioPlayer({
  src = '/assets/audio/audio1.mp3',
  posterSrc = '/assets/images/AudioPlayerImage.png',
  className = '',
  audioContainerOffsetY = "85px",
  audioContainerOffsetX = "0px",
  buttonsOffsetY = "5px",
  buttonsOffsetX = "35px",
  infoOffsetY = "40px",
  infoOffsetX = "0px",
  actionsOffsetY = "2px",
  actionsOffsetX = "-150px",
  isActive = false,
  onPlay,
  onPause,
  onScrollAway,
  onCommentClick,
  hideReactionButtons = false,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLInputElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoaded = () => setDuration(audio.duration || 0)
    const onTime = () => {
      if (!seeking) setCurrentTime(audio.currentTime)
    }
    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      onPause?.()
    }

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
    }
  }, [seeking, onPause])

  useEffect(() => {
    if (!isActive && isPlaying) {
      const audio = audioRef.current
      if (audio) {
        audio.pause()
        setIsPlaying(false)
        onPause?.()
      }
    }
  }, [isActive, isPlaying, onPause])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
        onPause?.()
      } else {
        if (!isActive) {
          onScrollAway?.()
        }
        
        await audio.play()
        setIsPlaying(true)
        onPlay?.()
      }
    } catch (err) {
      console.warn('Unable to play audio programmatically', err)
    }
  }

  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return '0:00'
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setCurrentTime(val)
  }

  const handleSeekCommit = () => {
    const audio = audioRef.current
    const input = progressRef.current
    if (!audio || !input) return
    audio.currentTime = Number(input.value)
    setSeeking(false)
  }

  const handleSeekStart = () => setSeeking(true)

  const skipForward = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(audio.currentTime + 10, duration)
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(audio.currentTime - 10, 0)
  }

  const togglePlaybackRate = () => {
    const audio = audioRef.current
    if (!audio) return
    const newRate = playbackRate === 1 ? 1.5 : 1
    setPlaybackRate(newRate)
    audio.playbackRate = newRate
  }

  const CcIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <path fill="currentColor" d="M472 64H40a24.028 24.028 0 0 0-24 24v336a24.028 24.028 0 0 0 24 24h432a24.028 24.028 0 0 0 24-24V88a24.028 24.028 0 0 0-24-24Zm-8 352H48V96h416Z"></path>
      <path fill="currentColor" d="M184 344a87.108 87.108 0 0 0 54.484-18.891l-19.825-25.119A55.41 55.41 0 0 1 184 312a56 56 0 0 1 0-112a55.41 55.41 0 0 1 34.659 12.01l19.825-25.119A87.108 87.108 0 0 0 184 168a88 88 0 0 0 0 176Zm163.429 0a87.108 87.108 0 0 0 54.484-18.891l-19.825-25.119A55.414 55.414 0 0 1 347.429 312a56 56 0 0 1 0-112a55.414 55.414 0 0 1 34.659 12.01l19.825-25.119A87.108 87.108 0 0 0 347.429 168a88 88 0 0 0 0 176Z"></path>
    </svg>
  )

  const BackwardIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path d="m12 5l-1.104-1.545c-.41-.576-.617-.864-.487-1.13c.13-.268.46-.283 1.12-.314Q11.763 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12a9.99 9.99 0 0 1 4-8"></path>
        <path d="M7.992 11.004C8.52 10.584 9 9.89 9.3 10.02c.3.128.204.552.204 1.212v4.776m6.498-3.408c0-1.38.066-1.752-.198-2.196s-.924-.406-1.584-.406s-1.14-.038-1.458.322c-.39.42-.222 1.2-.27 2.28c.108 1.44-.186 2.58.264 3.06c.324.396.9.336 1.584.348c.68-.008 1.092.024 1.428-.36c.372-.336.192-1.668.234-3.048"></path>
      </g>
    </svg>
  )

  const ForwardIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25a.75.75 0 0 1 .586 1.219l-2 2.5a.75.75 0 0 1-1.172-.938l.903-1.128A9.251 9.251 0 0 0 2.75 12A9.25 9.25 0 1 0 15.7 3.52a.75.75 0 0 1 .6-1.375A10.752 10.752 0 0 1 22.75 12c0 5.937-4.813 10.75-10.75 10.75S1.25 17.937 1.25 12Zm9.075-4.176a.75.75 0 0 1 .425.676v7a.75.75 0 0 1-1.5 0v-5.44l-1.281 1.026a.75.75 0 0 1-.938-1.172l2.5-2a.75.75 0 0 1 .794-.09ZM14.25 9.25a1 1 0 0 0-1 1v3.5a1 1 0 1 0 2 0v-3.5a1 1 0 0 0-1-1Zm-2.5 1a2.5 2.5 0 0 1 5 0v3.5a2.5 2.5 0 0 1-5 0v-3.5Z" clipRule="evenodd"></path>
    </svg>
  )

  return (
    <div className={`flex flex-col items-center justify-center relative h-full ${className}`}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div
        className="relative"
        style={{
          top: audioContainerOffsetY,
          left: audioContainerOffsetX,
        }}
      >
        <div className="w-full flex items-center justify-center mb-4">
          <img
            src={posterSrc}
            alt="Audio player poster"
            className="w-24 h-24 object-cover"
            draggable={false}
          />
        </div>

        <div className="w-full mb-4">
          <div className="relative w-full flex items-center">
            <input
              ref={progressRef}
              type="range"
              min={0}
              max={Math.max(0, Math.floor(duration))}
              value={Math.floor(currentTime)}
              onChange={handleSeekChange}
              onMouseDown={handleSeekStart}
              onTouchStart={handleSeekStart}
              onMouseUp={handleSeekCommit}
              onTouchEnd={handleSeekCommit}
              className="w-full max-w-[320px] h-1 appearance-none bg-transparent cursor-pointer range-slider"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none',
                background: `linear-gradient(to right, #174A5F ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%)`,
                borderRadius: '9999px',
              }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-700 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 text-center mb-1">
          Modern Physics
        </h2>

        <p className="text-sm text-gray-600 text-center mb-4">
          By Abebe Kebede
        </p>

        <div className="flex items-center justify-center gap-6 mb-4">
          <button
            onClick={togglePlaybackRate}
            className={`w-12 h-10 flex items-center justify-center text-[#174A5F] opacity-50 hover:opacity-70 transition ${
              playbackRate === 1.5 ? 'opacity-100' : ''
            }`}
            aria-label={`Playback rate ${playbackRate}x`}
          >
            <span className="text-sm font-medium">{playbackRate}x</span>
          </button>

          <button
            onClick={skipBackward}
            className="w-12 h-10 flex items-center justify-center text-[#174A5F] hover:text-[#163e4a] transition"
            aria-label="Skip backward 10 seconds"
          >
            <BackwardIcon className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="w-14 h-14 flex items-center justify-center rounded-md bg-[#174A5F] text-white hover:bg-[#163e4a] transition shadow-lg"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <button
            onClick={skipForward}
            className="w-12 h-10 flex items-center justify-center text-[#174A5F] hover:text-[#163e4a] transition"
            aria-label="Skip forward 10 seconds"
          >
            <ForwardIcon className="w-5 h-5" />
          </button>

          <button
            className="w-12 h-10 flex items-center justify-center text-[#174A5F] opacity-50 hover:opacity-70 transition"
            aria-label="Closed captions"
          >
            <CcIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Video Actions - Conditionally rendered */}
        {!hideReactionButtons && (
          <div 
            className="absolute h-full flex items-center z-30"
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
            hashtags={['Physics', 'NewtonsFirstLaw']}
          />
        </div>
      )}

      <style>
        {`
          .range-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 16px;
            background: #174a5f;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .range-slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
          }

          .range-slider::-moz-range-thumb {
            width: 16px;
            height: 12px;
            background: #174a5f;
            border-radius: 4px;
            cursor: pointer;
            border: none;
          }
        `}
      </style>
    </div>
  )
}