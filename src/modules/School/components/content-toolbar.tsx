"use client"

import { Search, Grid3x3, List, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import { NewItemModal } from "./new-item-modal"
import type { Course } from "./course-card"

interface ContentToolbarProps {
  onAddCourse: (course: Course) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function ContentToolbar({ onAddCourse, viewMode, onViewModeChange }: ContentToolbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNewClick = () => {
    console.log("[v0] New button clicked, opening modal")
    setIsModalOpen(true)
  }

  const handleModalChange = (open: boolean) => {
    console.log("[v0] Modal state changing to:", open)
    setIsModalOpen(open)
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6 px-6">
        {/* Left: View options */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded transition-colors ${
              viewMode === "grid"
                ? "bg-[#174A5F] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
            }`}
            aria-label="Grid view"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded transition-colors ${
              viewMode === "list"
                ? "bg-[#174A5F] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
            }`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Search bar with filter icon inside */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-20 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#174A5F] text-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button className="p-1 text-gray-400 hover:text-[#174A5F]">
                <Search className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-[#174A5F]">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: New button only */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewClick}
            className="flex items-center gap-2 px-4 py-2 bg-[#174A5F] text-white rounded-lg hover:bg-[#2c6076] transition-colors text-sm font-medium"
          >
            <span className="text-lg leading-none">+</span>
            New
          </button>
        </div>
      </div>

      {console.log("[v0] Rendering NewItemModal, isModalOpen:", isModalOpen)}
      <NewItemModal open={isModalOpen} onOpenChange={handleModalChange} onAddCourse={onAddCourse} />
    </>
  )
}
