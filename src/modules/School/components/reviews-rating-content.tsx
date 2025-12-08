"use client"

import { useState } from "react"

export function ReviewsRatingContent() {
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const ratingBreakdown = [
    { stars: 5, percentage: 0 },
    { stars: 4, percentage: 0 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ]

  return (
    <div className="flex-1 p-6">
      {/* Course Rating Title */}
      <h2 className="text-[#174a5f] text-xl font-semibold mb-6">Course Rating</h2>

      {/* Rating Summary */}
      <div className="flex items-center gap-4 mb-6">
        {/* Large Rating Number */}
        <span className="text-6xl font-bold text-gray-800">0</span>

        <div className="flex flex-col gap-1">
          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={star <= (hoverRating || userRating) ? "#174a5f" : "none"}
                    stroke="#174a5f"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              ))}
            </div>
            <button className="text-[#174a5f] font-medium ml-2">Rate</button>
          </div>
          <span className="text-sm text-gray-600">0 Rating</span>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="flex flex-col gap-2 mb-8 max-w-md">
        {ratingBreakdown.map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            <span className="text-sm text-gray-700 w-12">{item.stars} stars</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gray-400 rounded-full" style={{ width: `${item.percentage}%` }} />
            </div>
            <span className="text-sm text-gray-500 w-8">{item.percentage}%</span>
          </div>
        ))}
      </div>

      {/* No Reviews Yet */}
      <h3 className="text-[#174a5f] text-lg font-medium">No Reviews Yet</h3>
    </div>
  )
}
