"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function NewExerciseForm({ onBack }: { onBack: () => void }) {
  const [activeQuestion, setActiveQuestion] = useState(1)
  const [configureOpen, setConfigureOpen] = useState(true)
  const [visibilityOpen, setVisibilityOpen] = useState(true)
  const [takeWithFriend, setTakeWithFriend] = useState(true)
  const [visibility, setVisibility] = useState("Public")
  const [activeTab, setActiveTab] = useState("exercise-features")

  const questions = Array.from({ length: 13 }, (_, i) => i + 1)

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
            </svg>
            <h1 className="text-xl font-semibold">Kinematics</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Question Navigation */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {questions.map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuestion(q)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                  activeQuestion === q
                    ? "bg-[#dce5e9] text-[#174a5f]"
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Q{q}.
              </button>
            ))}
          </div>

          {/* Question Form */}
          <div className="max-w-4xl">
            <h2 className="text-lg font-semibold mb-2">Multiple Choice Question</h2>
            <p className="text-sm text-gray-600 mb-4">Describe question briefly</p>

            {/* Question Text */}
            <div className="mb-8">
              <textarea
                defaultValue="Graphically, the pair of equations 7x − y = 5; 21x − 3y = 10 represents two lines which are"
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#174a5f]/20 focus:border-[#174a5f]"
                rows={3}
              />
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4">
              {["A", "B", "C", "D"].map((option) => (
                <div key={option} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg">
                  <input
                    type="radio"
                    name="answer"
                    id={`option-${option}`}
                    className="w-5 h-5 text-[#174a5f] focus:ring-[#174a5f]"
                  />
                  <label htmlFor={`option-${option}`} className="flex-1 flex items-center gap-2 cursor-pointer">
                    <span className="font-medium">{option}.</span>
                    <span className="text-gray-400">..|</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            {/* Edit Mode Button */}
            <button className="w-full py-2 px-4 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 mb-6">
              Edit Mode
            </button>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("exercise-features")}
                className={`flex-1 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === "exercise-features" ? "text-[#174a5f]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Exercise Features
                {activeTab === "exercise-features" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={`flex-1 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === "resources" ? "text-[#174a5f]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Resources
                {activeTab === "resources" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />}
              </button>
            </div>

            {/* Configure Section */}
            <div className="mb-6">
              <button
                onClick={() => setConfigureOpen(!configureOpen)}
                className="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-900"
              >
                Configure
                {configureOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {configureOpen && (
                <div className="mt-4 space-y-4">
                  {/* Rename */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Rename</label>
                    <input
                      type="text"
                      defaultValue="New Exercise"
                      className="text-sm text-right border-b border-gray-300 focus:outline-none focus:border-[#174a5f] px-2 py-1"
                    />
                  </div>

                  {/* Total Mark */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Total Mark</label>
                    <input
                      type="text"
                      placeholder="--"
                      className="text-sm text-right border-b border-gray-300 focus:outline-none focus:border-[#174a5f] px-2 py-1 w-24"
                    />
                  </div>

                  {/* Time Given */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Time Given</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="__"
                        className="text-sm text-right border-b border-gray-300 focus:outline-none focus:border-[#174a5f] px-2 py-1 w-12"
                      />
                      <span className="text-sm text-gray-600">minute</span>
                    </div>
                  </div>

                  {/* Take with friend */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Take with friend</label>
                    <button
                      onClick={() => setTakeWithFriend(!takeWithFriend)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        takeWithFriend ? "bg-[#174a5f]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          takeWithFriend ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Visibility Section */}
            <div>
              <button
                onClick={() => setVisibilityOpen(!visibilityOpen)}
                className="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-900"
              >
                Visibility
                {visibilityOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {visibilityOpen && (
                <div className="mt-4 space-y-4">
                  {/* Visibility Dropdown */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Visibility</label>
                    <select
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="text-sm border-b border-gray-300 focus:outline-none focus:border-[#174a5f] px-2 py-1"
                    >
                      <option>Public</option>
                      <option>Private</option>
                      <option>Friends Only</option>
                    </select>
                  </div>

                  {/* Move to Trash */}
                  <button className="text-sm text-[#db6f3d] hover:text-[#c8532e]">Move to Trash</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
