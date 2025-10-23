'use client'

import type React from "react"
import { useState } from "react"
import FreeResourcesButton from "./FreeResourcesButton"
import AddToWishListButton from "./AddToWishListButton"
import EnrollNowButton from "./EnrollNowButton"

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
  {
    id: 1,
    title: "Learn React in 60 seconds",
    creator: "@devmaster",
    likes: 1200,
    comments: 340,
    shares: 120,
    liked: false,
  },
  {
    id: 2,
    title: "AI Tips & Tricks",
    creator: "@aiexpert",
    likes: 2500,
    comments: 680,
    shares: 450,
    liked: false,
  },
  {
    id: 3,
    title: "Web Development Hacks",
    creator: "@webdev_pro",
    likes: 1800,
    comments: 520,
    shares: 280,
    liked: false,
  },
  {
    id: 4,
    title: "TypeScript Best Practices",
    creator: "@typescript_guru",
    likes: 3200,
    comments: 920,
    shares: 610,
    liked: false,
  },
  {
    id: 5,
    title: "Tailwind CSS Mastery",
    creator: "@css_wizard",
    likes: 2100,
    comments: 580,
    shares: 340,
    liked: false,
  },
]

export default function ShortVideo() {
  const [videoList, setVideoList] = useState<Video[]>(videos)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleLike = (id: number) => {
    setVideoList(
      videoList.map((video) =>
        video.id === id
          ? { ...video, liked: !video.liked, likes: video.liked ? video.likes - 1 : video.likes + 1 }
          : video,
      ),
    )
  }

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
  const videoWidth = 614 * scale
  const videoHeight = 742 * scale
  const contentHeight = 580 * scale
  const buttonHeight = 162 * scale

  return (
    <div
      className="flex-1 h-screen overflow-hidden flex flex-col items-center justify-center relative p-6"
      onWheel={handleScroll}
    >
      <div
        className="flex flex-col items-center justify-center relative"
        style={{ width: `${videoWidth}px`, height: `${videoHeight}px` }}
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

        <div className="w-full flex gap-3 p-4 bg-black/40 backdrop-blur-sm" style={{ height: `${buttonHeight}px` }}>
          <FreeResourcesButton />
          <AddToWishListButton />
          <EnrollNowButton />
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-20">
          <button onClick={() => handleLike(currentVideo.id)} className="flex flex-col items-center gap-2 group">
            <div className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all group-hover:scale-110">
              <svg
                className={`w-6 h-6 transition-all ${currentVideo.liked ? "fill-red-500 text-red-500" : "text-white"}`}
                fill={currentVideo.liked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-white text-xs font-semibold">{currentVideo.likes}</span>
          </button>

          <button className="flex flex-col items-center gap-2 group">
            <div className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all group-hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <span className="text-white text-xs font-semibold">{currentVideo.comments}</span>
          </button>

          <button className="flex flex-col items-center gap-2 group">
            <div className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all group-hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
            <span className="text-white text-xs font-semibold">{currentVideo.shares}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
