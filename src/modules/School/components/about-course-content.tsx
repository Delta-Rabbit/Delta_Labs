"use client"

import type React from "react"

import { useState, useRef } from "react"

export function AboutCourseContent() {
  const [courseName, setCourseName] = useState("")
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const [courseDetails, setCourseDetails] = useState("")
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCoverClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setCoverImage(url)
    }
  } 
  return (
    <div className="flex flex-col">
        <div className="w-[90%] mx-auto mb-6">

        <div
          className={`relative px-6 py-6 rounded-lg overflow-hidden h-[180px] flex items-center justify-center cursor-pointer ${
            coverImage ? "bg-cover bg-center" : "bg-[#F8F8F8]"
          }`}
          style={coverImage ? { backgroundImage: `url(${coverImage})` } : {}}
          onClick={handleCoverClick}
        >
          {!coverImage && (
            <>
              <div className="flex items-center gap-4">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="24" rx="4" stroke="#174A5F" strokeWidth="2.5" fill="none" />
                  <circle cx="16" cy="17" r="2.5" fill="#174A5F" />
                  <path
                    d="M8 26 L16 20 L22 24 L32 16 L40 22"
                    stroke="#174A5F"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <h2 className="text-xl font-medium text-[#174A5F]">Course Cover Image</h2>
                  <p className="text-sm text-gray-500 mt-1">drop your image here</p>
                </div>
              </div>

              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="ml-8">
                <path
                  d="M15 3C9.477 3 5 7.089 5 12.083V22.743C5 24.275 6.526 25.097 7.749 24.188C8.641 23.553 9.799 23.562 10.594 24.474C11.551 25.499 13.449 25.499 14.406 24.474L14.935 24.102C15.383 23.734 16.617 23.734 17.065 24.102L17.594 24.474C18.551 25.499 20.449 25.499 21.406 24.474C22.201 23.562 23.359 23.553 24.251 24.188C25.473 25.097 27 24.275 27 22.743V12.083C27 7.089 22.523 3 15 3Z"
                  fill="#1C274C"
                />
                <circle cx="12.5" cy="14.458" r="1.5" fill="white" />
                <circle cx="19.5" cy="14.458" r="1.5" fill="white" />
              </svg>
            </>
          )}
          <input type="file" accept="image/*" ref={inputRef} className="hidden" onChange={handleFileChange} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <div className="bg-white px-6 py-6 flex flex-col gap-4">
          {/* Course Name Input Card */}
          <div className="bg-white rounded-lg border border-[#D9D9D9] p-4">
            <input
              type="text"
              placeholder="Write your Course Name here..."
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full text-gray-600 placeholder-gray-400 outline-none text-base"
            />
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L14.09 7.26L20 7.64L15.45 11.38L16.82 17L12 14.27L7.18 17L8.55 11.38L4 7.64L9.91 7.26L12 2Z"
                  fill="#DCE5E9"
                  stroke="#DCE5E9"
                  strokeWidth="2"
                />
              </svg>
            ))}
            <span className="text-sm text-[#5C5F62] ml-2">(0 Reviews)</span>
            <div className="w-px h-10 bg-black mx-2" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-[#DCE5E9] font-medium">0</span>
              <span className="text-xs text-gray-500">enrolled</span>
            </div>
          </div>

          {/* Welcome Message Card */}
          <div className="bg-white rounded-lg border border-[#D9D9D9] p-4">
            <textarea
              placeholder="Write your welcome message here..."
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="w-full text-gray-600 placeholder-gray-400 outline-none text-base resize-none min-h-[60px]"
            />
          </div>

          {/* Course Details Card - Taller */}
          <div className="bg-white rounded-lg border border-[#D9D9D9] p-4">
            <textarea
              placeholder="Write details about the course here..."
              value={courseDetails}
              onChange={(e) => setCourseDetails(e.target.value)}
              className="w-full text-gray-600 placeholder-gray-400 outline-none text-base resize-none min-h-[185px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
