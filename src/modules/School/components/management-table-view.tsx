"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"

export function ManagementTableView() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex-1 flex flex-col">
      {/* Header with buttons */}
      <div className="flex items-center justify-end gap-3 px-6 py-4 border-b border-gray-200">
        <button className="px-4 py-2 text-sm text-[#174a5f] border border-gray-300 rounded hover:bg-gray-50 transition-colors">
          Inherit Table
        </button>
        <button className="px-6 py-2 text-sm text-white bg-[#174a5f] rounded hover:bg-[#0f3749] transition-colors">
          Create New
        </button>
      </div>

      {/* Search bar */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
          <Search className="w-5 h-5 text-gray-400" />
          <button className="p-1 hover:bg-gray-100 rounded">
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center pb-32">
        {/* Database icon with magnifying glass */}
        <div className="relative mb-6">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background circle */}
            <circle cx="50" cy="50" r="40" fill="#E5E7EB" opacity="0.5" />

            {/* Database/list icon */}
            <g transform="translate(30, 35)">
              {/* Top section */}
              <rect x="0" y="0" width="40" height="8" rx="2" fill="#D1D5DB" />
              <circle cx="6" cy="4" r="1.5" fill="#9CA3AF" />
              <circle cx="12" cy="4" r="1.5" fill="#9CA3AF" />
              <circle cx="18" cy="4" r="1.5" fill="#9CA3AF" />

              {/* Middle section */}
              <rect x="0" y="12" width="40" height="8" rx="2" fill="#D1D5DB" />
              <circle cx="6" cy="16" r="1.5" fill="#9CA3AF" />
              <circle cx="12" cy="16" r="1.5" fill="#9CA3AF" />
              <circle cx="18" cy="16" r="1.5" fill="#9CA3AF" />

              {/* Bottom section */}
              <rect x="0" y="24" width="40" height="8" rx="2" fill="#D1D5DB" />
              <circle cx="6" cy="28" r="1.5" fill="#9CA3AF" />
              <circle cx="12" cy="28" r="1.5" fill="#9CA3AF" />
              <circle cx="18" cy="28" r="1.5" fill="#9CA3AF" />
            </g>

            {/* Magnifying glass */}
            <g transform="translate(65, 55)">
              <circle cx="15" cy="15" r="12" stroke="#9CA3AF" strokeWidth="2.5" fill="none" />
              <line x1="24" y1="24" x2="32" y2="32" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Text */}
        <h3 className="text-[#174a5f] font-semibold text-lg mb-1">No Table yet</h3>
        <p className="text-gray-500 text-sm">Create New Above</p>
      </div>
    </div>
  )
}
