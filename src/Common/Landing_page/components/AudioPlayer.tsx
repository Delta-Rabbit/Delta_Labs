'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
  src?: string
  posterSrc?: string
  className?: string
}

export default function AudioPlayer({
  src = '/assets/audio/audio1.mp3',
  posterSrc = '/assets/images/AudioPlayerImage.png',
  className = '',
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLInputElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [seeking, setSeeking] = useState(false)

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
    }

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
    }
  }, [seeking])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
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

  return (
    <div className={`w-full max-w-[500px] mx-auto flex flex-col items-center ${className}`}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="w-full flex items-center justify-center">
        <img
          src={posterSrc}
          alt="Audio player poster"
          className="w-full max-w-[200px] object-cover select-none"
          draggable={false}
        />
      </div>

      
        <div className="w-full mt-5">
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
              className="w-full h-2 appearance-none bg-transparent cursor-pointer"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none',
                background: `linear-gradient(to right, #174A5F ${(currentTime / duration) * 100}%, #174A5F80 ${(currentTime / duration) * 100}%)`,
                borderRadius: '9999px',
                height: '6px',
              }}
            />

            <style jsx>{`
              input[type='range']::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 10px;
                height: 16px;
                background: #174a5f;
                border-radius: 4px;
                cursor: pointer;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
                transition: all 0.2s ease;
              }

              input[type='range']::-moz-range-thumb {
                width: 10px;
                height: 16px;
                background: #174a5f;
                border-radius: 4px;
                cursor: pointer;
                border: none;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
              }

              input[type='range']::-ms-thumb {
                width: 15px;
                height: 16px;
                background: #174a5f;
                border-radius: 4px;
                cursor: pointer;
              }
            `}</style>
          </div>

          <div className="flex justify-between text-xs text-gray-700 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

      <div className="w-full mt-4 px-2">
        <div className="flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-md bg-[#174A5F] text-white hover:bg-[#163e4a] transition"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                <rect x="14" y="4" width="4" height="16" fill="currentColor" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            )}
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
