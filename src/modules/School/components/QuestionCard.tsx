"use client"

import type React from "react"

interface QuestionCardProps {
  question: {
    id: number
    title: string
    preview: string
    tags: string[]
    author: string
    timeAgo: string
    votes: number
    answers: number
    views: number
  }
}

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 384 432" {...props}>
    <path
      fill="currentColor"
      d="M320 303q26 0 44 18.5t18 44t-18 44t-44 18.5t-44-18.5t-18-44.5q0-6 1-14l-151-88q-19 17-44 17q-27 0-45.5-18.5T0 216t18.5-45.5T64 152q25 0 44 17l150-87q-2-9-2-15q0-27 18.5-45.5T320 3t45.5 18.5t18.5 45t-18.5 45.5t-45.5 19q-25 0-44-18l-150 88q2 9 2 15t-2 15l152 88q18-16 42-16z"
    />
  </svg>
)

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow flex items-start">
      {/* LEFT COLUMN: Utility Icons (Bookmark, Delete, Share) */}
      <div className="flex flex-col gap-4 mr-4 pt-1 shrink-0 text-[#174A5F]">
        {/* Bookmark Icon */}
        <button className="p-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21L12 17L5 21V5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V21Z" />
          </svg>
        </button>

        {/* Delete Icon */}
        <button className="p-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6H21" />
            <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6" />
            <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" />
          </svg>
        </button>

        {/* Share Icon */}
        <button className="p-1">
          <ShareIcon width="20" height="20" />
        </button>
      </div>

      {/* MIDDLE SECTION: Question Content & Metadata */}
      <div className="flex-1 min-w-0 pr-0">
        <h3 className="text-lg font-medium text-[#174a5f] hover:text-[#2c6076] cursor-pointer mb-2 line-clamp-2">
          {question.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{question.preview}</p>

        {/* Tags and Author Info */}
        <div className="flex items-center gap-4 mb-3">
          {/* Tags */}
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-[#d8e0e6] text-[#2c6076] text-xs rounded-md font-medium cursor-pointer hover:bg-[#c2ced6]"
            >
              {tag}
            </span>
          ))}

          {/* Author Info */}
          <div className="flex items-center text-xs text-gray-500 ml-auto">
            <span className="w-4 h-4 mr-1 bg-gray-300 rounded-full flex items-center justify-center text-[10px] text-white">
              {question.author.charAt(0)}
            </span>
            <span className="text-[#174a5f] font-medium mr-2">{question.author}</span>
            <span className="text-gray-400 mr-6">{question.timeAgo}</span>
            <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline">Reply privately</button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Stats (Votes, Answers, Views) */}
      <div className="flex flex-col items-end min-w-[120px] text-right shrink-0 ml-4">
        <div className="flex items-center gap-2 mb-2">
          {/* Votes */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 font-medium">{question.votes}</span>
            <span className="text-xs text-gray-500">votes</span>
          </div>

          {/* Answers */}
          <div
            className={`flex flex-col items-center px-3 py-1 rounded-md min-w-[70px] transition-colors ${
              question.answers > 0 ? "bg-[#4CAF50] text-white" : "bg-gray-100 text-gray-600 border border-gray-300"
            }`}
          >
            <div className="flex items-center gap-1">
              {question.answers > 0 && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17L4 12" />
                </svg>
              )}
              <span className="text-sm font-bold">{question.answers}</span>
            </div>
            <span className="text-xs">answer</span>
          </div>

          {/* Views */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 font-medium">{question.views}</span>
            <span className="text-xs text-gray-500">views</span>
          </div>
        </div>
      </div>
    </div>
  )
}
