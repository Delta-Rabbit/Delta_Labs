"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import type { Question } from "./new-exercise-form"

type ExerciseSidebarProps = {
  activeTab: string
  setActiveTab: (tab: string) => void
  exerciseName: string
  setExerciseName: (name: string) => void
  totalMark: string
  setTotalMark: (value: string) => void
  timeGiven: string
  setTimeGiven: (value: string) => void
  takeWithFriend: boolean
  setTakeWithFriend: (value: boolean) => void
  visibility: string
  setVisibility: (value: string) => void
  questions: Question[]
  onPublish: () => void
}

export function ExerciseSidebar({
  activeTab,
  setActiveTab,
  exerciseName,
  setExerciseName,
  totalMark,
  setTotalMark,
  timeGiven,
  setTimeGiven,
  takeWithFriend,
  setTakeWithFriend,
  visibility,
  setVisibility,
  questions,
  onPublish,
}: ExerciseSidebarProps) {
  const [configureOpen, setConfigureOpen] = useState(true)
  const [visibilityOpen, setVisibilityOpen] = useState(true)

  return (
    <aside className="w-80 border-l border-gray-200 lg:block hidden flex-shrink-0">
      <div className="p-6 h-full overflow-y-auto no-scrollbar">
        {/* Actions row */}
        <div className="flex items-center justify-between gap-3 mb-8">
          <button
            className="
              inline-flex items-center justify-center
              rounded-lg
              border border-[#1A4D5E]
              text-[#1A4D5E]
              text-xs font-medium
              px-5 py-3.5
              bg-transparent
              hover:bg-[#F3F6F7]
              active:bg-[#E4ECEF]
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1A4D5E]
              transition-all duration-150
              whitespace-nowrap
            "
          >
            Save as Draft
          </button>

          <button
            className="
              inline-flex items-center justify-center
              rounded-lg
              bg-[#1A4D5E]
              text-white
              text-xs font-semibold
              px-14 py-3.5
              shadow-sm
              hover:bg-[#123845]
              hover:shadow-md
              active:bg-[#0E2C36]
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1A4D5E]
              transition-all duration-150
              whitespace-nowrap
            "
            onClick={onPublish}
          >
            Publish
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mb-8">
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "exercise-features"
                ? "text-[#1A4D5E]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("exercise-features")}
          >
            Exercise Features
            {activeTab === "exercise-features" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A4D5E]" />
            )}
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "resources"
                ? "text-[#1A4D5E]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("resources")}
          >
            Resources
            {activeTab === "resources" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A4D5E]" />
            )}
          </button>
        </div>

        {/* Configure */}
        <div className="mb-6">
          <button
            className="w-full flex items-center justify-between py-4 text-left"
            onClick={() => setConfigureOpen(!configureOpen)}
          >
            <span className="text-sm font-medium text-gray-800">Configure</span>
            {configureOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {configureOpen && (
            <div className="space-y-4 pb-6">
              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-medium text-gray-600 whitespace-nowrap">
                  Rename
                </label>
                <input
                  type="text"
                  value={exerciseName}
                  onChange={e => setExerciseName(e.target.value)}
                  className="px-3 py-2.5 text-sm border-b-2 border-gray-200 focus:border-[#1A4D5E] focus:outline-none bg-transparent w-40"
                  placeholder="New Exercise"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-medium text-gray-600 whitespace-nowrap">
                  Total Mark
                </label>
                <input
                  type="text"
                  value={totalMark}
                  onChange={e => setTotalMark(e.target.value)}
                  className="px-3 py-2.5 text-sm border-b-2 border-gray-200 focus:border-[#1A4D5E] focus:outline-none bg-transparent text-right w-24"
                  placeholder="__"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="text-xs font-medium text-gray-600 whitespace-nowrap">
                  Time Given
                </label>
                <div className="relative w-28">
                  <input
                    type="text"
                    value={timeGiven}
                    onChange={e => setTimeGiven(e.target.value)}
                    className="w-full px-3 py-2.5 pr-10 text-sm border-b-2 border-gray-200 focus:border-[#1A4D5E] focus:outline-none bg-transparent text-right"
                    placeholder="__"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-gray-500">
                    min
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                <label className="text-sm font-medium text-gray-900 cursor-pointer select-none">
                  Take with friend
                </label>

                <button
                  type="button"
                  onClick={() => setTakeWithFriend(!takeWithFriend)}
                  className="relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1A4D5E]"
                  aria-pressed={takeWithFriend}
                >
                  <span
                    className={`
                      absolute inset-0 rounded-full transition-colors duration-200
                      ${takeWithFriend ? "bg-black" : "bg-[#F3F4F6]"}
                    `}
                  />
                  <span
                    className={`
                      absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-sm transition-transform duration-200
                      ${takeWithFriend ? "translate-x-6 bg-white" : "translate-x-0 bg-black"}
                    `}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 my-6" />

        {/* Visibility */}
        <div className="mb-6">
          <button
            className="w-full flex items-center justify-between py-4 text-left"
            onClick={() => setVisibilityOpen(!visibilityOpen)}
          >
            <span className="text-sm font-medium text-gray-800">Visibility</span>
            {visibilityOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {visibilityOpen && (
            <div className="pb-2">
              <div className="flex justify-end">
                <div className="relative">
                  <button
                    type="button"
                    className="
                      inline-flex items-center justify-between
                      min-w-[140px]
                      px-3 py-2
                      rounded-lg
                      border border-gray-200
                      bg-white
                      text-sm text-gray-800
                      shadow-sm
                      hover:shadow-md
                      transition-all duration-150
                    "
                  >
                    <span className="truncate">{visibility}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                  </button>

                  <select
                    value={visibility}
                    onChange={e => setVisibility(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Danger */}
        <div>
          <button className="w-full text-sm text-red-600 hover:text-red-700 hover:underline font-medium flex items-center gap-2 py-2 transition-colors">
            <Trash2 className="w-4 h-4" />
            Move to Trash
          </button>
        </div>
      </div>
    </aside>
  )
}
