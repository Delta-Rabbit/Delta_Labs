"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { NewExerciseForm } from "./new-exercise-form"

export function ExerciseTestContent() {
  const [activeTab, setActiveTab] = useState("exercise")
  const [searchQuery, setSearchQuery] = useState("")
  const [showForm, setShowForm] = useState(false)

  const tabs = [
    { id: "exercise", label: "Exercise" },
    { id: "test", label: "Test" },
    { id: "draft", label: "Draft" },
  ]

  if (showForm) {
    return <NewExerciseForm onBack={() => setShowForm(false)} />
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Tabs and New Exercise Button */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 text-sm transition-colors relative ${
                activeTab === tab.id ? "text-[#174a5f] font-medium" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-[#174a5f] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#0f3a4d] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
          </svg>
          New Exercise
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#174a5f]/20 focus:border-[#174a5f]"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4 max-w-md">
          {/* Database/Search Icon */}
          <div className="relative">
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-[#dce5e9] rounded-full opacity-50" />
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Database icon */}
              <rect x="30" y="35" width="50" height="12" rx="2" stroke="#d1d5db" strokeWidth="2" fill="white" />
              <circle cx="38" cy="41" r="2" fill="#d1d5db" />
              <circle cx="45" cy="41" r="2" fill="#d1d5db" />
              <circle cx="52" cy="41" r="2" fill="#d1d5db" />

              <rect x="30" y="52" width="50" height="12" rx="2" stroke="#d1d5db" strokeWidth="2" fill="white" />
              <circle cx="38" cy="58" r="2" fill="#d1d5db" />
              <circle cx="45" cy="58" r="2" fill="#d1d5db" />
              <circle cx="52" cy="58" r="2" fill="#d1d5db" />

              <rect x="30" y="69" width="50" height="12" rx="2" stroke="#d1d5db" strokeWidth="2" fill="white" />
              <circle cx="38" cy="75" r="2" fill="#d1d5db" />
              <circle cx="45" cy="75" r="2" fill="#d1d5db" />
              <circle cx="52" cy="75" r="2" fill="#d1d5db" />

              {/* Magnifying glass */}
              <circle cx="75" cy="65" r="12" stroke="#d1d5db" strokeWidth="2.5" fill="white" />
              <path d="M84 74L92 82" stroke="#d1d5db" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          <div className="text-center">
            <h3 className="text-[#174a5f] font-semibold text-lg mb-1">Create Exercise</h3>
            <p className="text-gray-500 text-sm">No Exercise Yet!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
