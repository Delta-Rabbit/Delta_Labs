'use client'

import { useState } from "react"

interface Video {
  id: number
  title: string
  creator: string
  likes: number
  comments: number
  shares: number
  liked: boolean
}

const videos: Video[] = [
  { id: 1, title: "Learn React in 60 seconds", creator: "@devmaster", likes: 1200, comments: 340, shares: 120, liked: false },
  { id: 2, title: "AI Tips & Tricks", creator: "@aiexpert", likes: 2500, comments: 680, shares: 450, liked: false },
  { id: 3, title: "Web Development Hacks", creator: "@webdev_pro", likes: 1800, comments: 520, shares: 280, liked: false },
  { id: 4, title: "TypeScript Best Practices", creator: "@typescript_guru", likes: 3200, comments: 920, shares: 610, liked: false },
  { id: 5, title: "Tailwind CSS Mastery", creator: "@css_wizard", likes: 2100, comments: 580, shares: 340, liked: false },
]

export default function ShortVideo() {
  const [videoList] = useState<Video[]>(videos)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      setCurrentIndex((prev) => (prev + 1) % videoList.length)
    } else {
      setCurrentIndex((prev) => (prev - 1 + videoList.length) % videoList.length)
    }
  }

  const currentVideo = videoList[currentIndex]
  const scale = 0.6
  const videoHeight = 742 * scale
  const contentHeight = 600 * scale

  const wrapperWidth = 400

  return (
    <div
      className="flex-1 h-screen overflow-hidden flex flex-col items-center justify-center relative p-6"
      onWheel={handleScroll}
    >
      <div
        className="flex flex-col items-center justify-center relative"
        style={{ width: `${wrapperWidth}px` }}
      >

        <div
          className="w-full bg-gradient-to-br from-[#174A5F] to-[#0a2a3a] flex flex-col items-center justify-center relative overflow-hidden rounded-lg"
          style={{ height: `${contentHeight}px` }}
        >

          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h3>
            <p className="text-gray-300 text-sm">{currentVideo.creator}</p>
          </div>

          <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
            {currentIndex + 1} / {videoList.length}
          </div>
        </div>
      </div>
    </div>
  )
}
