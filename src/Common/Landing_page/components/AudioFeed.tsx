'use client'

import { useState, useEffect, useRef } from 'react'
import AudioPlayer from './AudioPlayer'

interface AudioItem {
  src: string
  posterSrc: string
  title: string
  author: string
  description: string
  hashtags: string[]
}

export default function AudioFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [activeAudioId, setActiveAudioId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const audioItems: AudioItem[] = [
    {
      src: '/assets/audio/audio1.mp3',
      posterSrc: '/assets/images/AudioPlayerImage.png',
      title: 'Modern Physics',
      author: 'Abebe Kebede',
      description: "Explore Newton's First Law: Objects stay still or move at constant speed unless a force acts on them.",
      hashtags: ['Physics', 'NewtonsFirstLaw'],
    },
    {
      src: '/assets/audio/audio1.mp3',
      posterSrc: '/assets/images/AudioPlayerImage.png',
      title: 'Modern Physics',
      author: 'Abebe Kebede',
      description: "Explore Newton's First Law: Objects stay still or move at constant speed unless a force acts on them.",
      hashtags: ['Physics', 'NewtonsFirstLaw'],
    },
    {
      ssrc: '/assets/audio/audio1.mp3',
      posterSrc: '/assets/images/AudioPlayerImage.png',
      title: 'Modern Physics',
      author: 'Abebe Kebede',
      description: "Explore Newton's First Law: Objects stay still or move at constant speed unless a force acts on them.",
      hashtags: ['Physics', 'NewtonsFirstLaw'],
    },
  ]

  // Stop audio when scrolling to a new item
  const stopAllAudio = () => {
    setActiveAudioId(null)
    // You might need to add a way to communicate with AudioPlayer components
    // to stop them individually
  }

  const handleScroll = (e: WheelEvent) => {
    e.preventDefault()
    if (isAnimating) return
    setIsAnimating(true)

    // Stop current audio before scrolling
    stopAllAudio()

    if (e.deltaY > 0) {
      setCurrentIndex((prev) => (prev + 1) % audioItems.length) 
    } else if (e.deltaY < 0) {
      setCurrentIndex((prev) => (prev - 1 + audioItems.length) % audioItems.length)
    }

    setTimeout(() => setIsAnimating(false), 600)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isAnimating) return
    setIsAnimating(true)

    // Stop current audio before scrolling
    stopAllAudio()

    if (e.key === 'ArrowDown') {
      setCurrentIndex((prev) => (prev + 1) % audioItems.length)
    } else if (e.key === 'ArrowUp') {
      setCurrentIndex((prev) => (prev - 1 + audioItems.length) % audioItems.length)
    }

    setTimeout(() => setIsAnimating(false), 600)
  }

  const handleAudioPlay = (audioId: number) => {
    setActiveAudioId(audioId)
  }

  const handleAudioPause = (audioId: number) => {
    if (activeAudioId === audioId) {
      setActiveAudioId(null)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleScroll, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('wheel', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, isAnimating])

  // Stop audio when component unmounts
  useEffect(() => {
    return () => {
      stopAllAudio()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {audioItems.map((audio, index) => (
        <div
          key={index}
          className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
          style={{
            transform: `translateY(${(index - currentIndex) * 100}%)`,
          }}
        >
          <AudioPlayer
            src={audio.src}
            posterSrc={audio.posterSrc}
            audioContainerOffsetY="85px"
            audioContainerOffsetX="0px"
            buttonsOffsetY="65px"
            buttonsOffsetX="35px"
            infoOffsetY="40px"
            infoOffsetX="0px"
            isActive={activeAudioId === index}
            onPlay={() => handleAudioPlay(index)}
            onPause={() => handleAudioPause(index)}
            onScrollAway={stopAllAudio}
          />
        </div>
      ))}
    </div>
  )
}