"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { NewExerciseForm } from "./new-exercise-form"
import EmptyStateImage from "/assets/images/EmptyState.png"

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
    return (
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <NewExerciseForm onBack={() => setShowForm(false)} />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Tabs and New Exercise Button */}
      <div className="px-6 py-4 flex items-center justify-between">
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
          className="bg-[#174a5f] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 h-12 hover:bg-[#0f3a4d] transition-colors shadow-sm active:shadow-inner"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Background L-shaped stack frame */}
            <path d="M4 16h6v4H4z M4 16v-6h6v-4H4z" />
            
            {/* Foreground rounded square with question mark cutout */}
            <rect x="10" y="8" width="10" height="10" rx="2" fill="currentColor" stroke="none" />
            {/* Question mark - knocked out (transparent) */}
            <path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 1.8 1.15 2 2 .8.85 2 1v1" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="14" cy="17" r="1" fill="white" stroke="none" />
          </svg>
          New Exercise
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm flex items-center h-12 overflow-hidden">
            {/* Search Input */}
            <div className="flex-1 flex items-center px-5">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400 text-sm h-full px-2"
              />
              <Search className="w-5 h-5 text-slate-500 flex-shrink-0" />
            </div>
            
            {/* Vertical Divider */}
            <div className="w-px h-10 bg-slate-200" />
            
            {/* Filter Button */}
            <button className="p-3 hover:bg-slate-50 transition-colors flex-shrink-0">
              <SlidersHorizontal className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-start pt-12 px-6">
        <div className="flex flex-col items-center gap-4 max-w-md">
          <img 
            src={EmptyStateImage} 
            alt="Empty state illustration"
            className="w-32 h-32 object-contain"
          />
          
          <div className="text-center">
            <h3 className="text-[#174a5f] font-semibold text-lg mb-1">Create Exercise</h3>
            <p className="text-gray-500 text-sm">No Exercise Yet!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
