'use client'

import { useState, useEffect, useRef } from 'react'
import VideoCard from './VideoCard'

export default function VideoFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const videos = [
    {
      profilePic: '/assets/images/profile.jpg',
      name: 'Abebe Kebede',
      description:
        "Explore Newton's First Law: Objects stay still or move at constant speed unless a force acts on them.",
      hashtags: ['#Physics', '#NewtonFirstLaw'],
    },
    {
      profilePic: '/assets/images/profile.jpg',
      name: 'Sara Mekonnen',
      description: 'Learn the basics of gravity and how it affects motion.',
      hashtags: ['#Science', '#Gravity'],
    },
    {
      profilePic: '/assets/images/profile.jpg',
      name: 'John Doe',
      description: 'Discover how energy transforms from one form to another!',
      hashtags: ['#Energy', '#Physics'],
    },
  ]

  const handleScroll = (e: WheelEvent) => {
    e.preventDefault()
    if (isAnimating) return
    setIsAnimating(true)

    if (e.deltaY > 0) {
      setCurrentIndex((prev) => (prev + 1) % videos.length) 
    } else if (e.deltaY < 0) {
      setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
    }

    setTimeout(() => setIsAnimating(false), 600)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isAnimating) return
    setIsAnimating(true)

    if (e.key === 'ArrowDown') {
      setCurrentIndex((prev) => (prev + 1) % videos.length)
    } else if (e.key === 'ArrowUp') {
      setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
    }

    setTimeout(() => setIsAnimating(false), 600)
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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {videos.map((video, index) => (
        <div
          key={index}
          className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
          style={{
            transform: `translateY(${(index - currentIndex) * 100}%)`,
          }}
        >
          <VideoCard
            key={index}
            videoOffsetY="58px"
            videoOffsetX="0px"
            buttonsOffsetY="-105px"
            buttonsOffsetX="35px"
            infoOffsetY="-130px"
            infoOffsetX="0px"
          />
        </div>
      ))}
    </div>
  )
}
