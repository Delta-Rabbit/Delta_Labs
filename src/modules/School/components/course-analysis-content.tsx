"use client"

import { useState } from "react"

// Enrollment Icon (White)
function EnrollmentIcon() {
  return (
    <svg
      height="24"
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <path d="m4.929 2.929l1.414 1.414A7.975 7.975 0 0 0 4 10c0 2.209.895 4.209 2.343 5.657L4.93 17.07A9.969 9.969 0 0 1 2 10a9.969 9.969 0 0 1 2.929-7.071Zm14.142 0A9.969 9.969 0 0 1 22 9.999a9.969 9.969 0 0 1-2.929 7.072l-1.414-1.414A7.975 7.975 0 0 0 20 10c0-2.21-.895-4.21-2.343-5.657l1.414-1.414ZM7.757 5.757l1.415 1.414A3.987 3.987 0 0 0 8 10c0 1.104.448 2.104 1.172 2.828l-1.415 1.414A5.981 5.981 0 0 1 6 10c0-1.657.672-3.157 1.757-4.243Zm8.486 0A5.981 5.981 0 0 1 18 10a5.981 5.981 0 0 1-1.757 4.242l-1.415-1.414A3.987 3.987 0 0 0 16 10a3.987 3.987 0 0 0-1.172-2.829l1.415-1.414ZM12 12a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm0 2c.58 0 1.077.413 1.184.983L14.5 22h-5l1.316-7.017c.107-.57.604-.983 1.184-.983Z" />
    </svg>
  )
}

// Completion Icon
function CompletionIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="white" strokeWidth="2" />
      <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Reviews Icon
function ReviewsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="12" r="2" stroke="white" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" stroke="white" strokeWidth="2" />
      <circle cx="18" cy="12" r="2" stroke="white" strokeWidth="2" />
    </svg>
  )
}

// Up Arrow Icon
function UpArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2L10 6H7V10H5V6H2L6 2Z" fill="#22C55E" />
    </svg>
  )
}

// Star Icon
function StarIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={filled ? "#FABC1E" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1L12.39 6.26L18.18 7.27L14.09 11.74L15.18 17.73L10 14.77L4.82 17.73L5.91 11.74L1.82 7.27L7.61 6.26L10 1Z"
        stroke="#FABC1E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Chevron Down Icon
function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Three Dots Menu Icon
function ThreeDotsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="12" r="2" fill="#9CA3AF" />
      <circle cx="12" cy="12" r="2" fill="#9CA3AF" />
      <circle cx="18" cy="12" r="2" fill="#9CA3AF" />
    </svg>
  )
}

interface BarData {
  name: string
  score: number
  color: string
}

export function CourseAnalysisContent() {
  const [enrollmentPeriod, setEnrollmentPeriod] = useState("Year")
  const [completionPeriod, setCompletionPeriod] = useState("Year")

  const barData: BarData[] = [
    { name: "Dink", score: 5, color: "#EF4444" },   // Red
    { name: "Leul", score: 50, color: "#F59E0B" },  // Orange
    { name: "Haile", score: 90, color: "#164a5f" }, // Dark Blue
    { name: "Meron", score: 70, color: "#dce5e8" }  // Light Grayish Blue
  ]

  const maxScore = 100

  return (
    <div className="flex-1 p-6 pb-20">
      {/* Stats Cards */}
      <div className="flex gap-4 mb-8">
        {/* Enrollment Card */}
        <div className="flex-1 bg-[#F0F6FC] rounded-lg p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#F4A120] rounded-lg flex items-center justify-center">
              <EnrollmentIcon />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <UpArrowIcon />
              <span>+0.25%</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-[#1a1a1a]">0</span>
            <span className="text-gray-600 text-sm">Enrollment /</span>
            <button className="flex items-center gap-1 text-gray-600 text-sm">
              {enrollmentPeriod}
              <ChevronDownIcon />
            </button>
          </div>
        </div>

        {/* Completion Card */}
        <div className="flex-1 bg-[#F0F6FC] rounded-lg p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#28A745] rounded-lg flex items-center justify-center">
              <CompletionIcon />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <UpArrowIcon />
              <span>0</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-[#1a1a1a]">0</span>
            <span className="text-gray-600 text-sm">Completion /</span>
            <button className="flex items-center gap-1 text-gray-600 text-sm">
              {completionPeriod}
              <ChevronDownIcon />
            </button>
          </div>
        </div>

        {/* Reviews Card */}
        <div className="flex-1 bg-[#F0F6FC] rounded-lg p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#323338] rounded-lg flex items-center justify-center">
              <ReviewsIcon />
            </div>
            <div className="bg-[#174a5f] text-white text-sm px-3 py-1 rounded">0</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} filled />
              ))}
            </div>
            <span className="text-[#174a5f] text-sm">(0 Reviews)</span>
          </div>
        </div>
      </div>

      {/* Course Performance Section */}
      <div>
        <h3 className="text-[#174a5f] font-medium mb-6">Course Performance</h3>

        {/* Chart Container */}
        <div className="relative">
          {/* Three dots menu */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <ThreeDotsIcon />
            </button>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end gap-8 mt-12 ml-12">
            {/* Y-axis */}
            <div className="flex flex-col justify-between h-64 text-sm text-gray-500 pr-4">
              <span>100</span>
              <span>70</span>
              <span>50</span>
              <span>5</span>
              <span>0</span>
            </div>

            {/* Y-axis label */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm text-gray-500">
              Score
            </div>

            {/* Bars */}
            <div className="flex items-end gap-12">
              {barData.map((bar) => (
                <div key={bar.name} className="flex flex-col items-center">
                  <div
                    className="w-16 rounded-t transition-all"
                    style={{
                      height: `${(bar.score / maxScore) * 256}px`,
                      backgroundColor: bar.color,
                    }}
                  />
                  <span className="mt-2 text-sm text-gray-600">{bar.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
