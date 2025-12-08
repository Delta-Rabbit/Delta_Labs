"use client"

import { useState } from "react"
import { AskQuestionsForm } from "./ask-questions-form"

interface Question {
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

export function QAContent() {
  const [activeTab, setActiveTab] = useState("questions")
  const [showAskForm, setShowAskForm] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])

  const handlePostQuestion = (questionData: { title: string; details: string; tags: string }) => {
    const newQuestion: Question = {
      id: Date.now(),
      title: `Q. ${questionData.title}`,
      preview: questionData.details.substring(0, 150) + "...",
      tags: questionData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      author: "Leul Solomon",
      timeAgo: "Asked 4 mins ago",
      votes: 1,
      answers: 1,
      views: 300,
    }
    setQuestions([newQuestion, ...questions])
    setShowAskForm(false)
    setActiveTab("community")
  }

  if (showAskForm) {
    return <AskQuestionsForm onBack={() => setShowAskForm(false)} onPost={handlePostQuestion} />
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab("questions")}
              className={`py-3 text-sm transition-colors relative ${
                activeTab === "questions" ? "text-[#174a5f] font-medium" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Questions
              {activeTab === "questions" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />}
            </button>
            <button
              onClick={() => setActiveTab("community")}
              className={`py-3 text-sm transition-colors relative ${
                activeTab === "community" ? "text-[#174a5f] font-medium" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Community
              {activeTab === "community" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />}
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={`py-3 text-sm transition-colors relative ${
                activeTab === "draft" ? "text-[#174a5f] font-medium" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Draft
              {activeTab === "draft" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />}
            </button>
          </div>

          {(activeTab === "community" || activeTab === "questions") && (
            <button
              onClick={() => setShowAskForm(true)}
              className="flex items-center gap-2 bg-[#174a5f] text-white px-4 py-2 rounded-lg hover:bg-[#2c6076] transition-colors my-2"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 15L4 4C4 3.44772 4.44772 3 5 3H15C15.5523 3 16 3.44772 16 4V11C16 11.5523 15.5523 12 15 12H7L4 15Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M7 7H13M7 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Ask Questions
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center px-6 py-6">
        <div className="flex items-center gap-2 w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 bg-white">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400"
          />
          <button className="text-[#174a5f] hover:text-[#2c6076]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button className="text-[#174a5f] hover:text-[#2c6076] ml-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h14M6 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {activeTab === "community" && questions.length > 0 ? (
        <div className="flex-1 px-6 pb-20">
          <div className="space-y-4">
            {questions.map((question) => (
              <div
                key={question.id}
                className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Left Icons */}
                  <div className="flex flex-col gap-2">
                    <button className="text-[#174a5f] hover:text-[#2c6076]">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7l5-4 5 4v10H5V7z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </button>
                    <button className="text-[#174a5f] hover:text-[#2c6076]">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M10 9v4M8 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
                    <h3 className="text-[#174a5f] font-medium mb-2">{question.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{question.preview}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        {question.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 bg-gray-300 rounded-full" />
                          <span className="text-blue-600">{question.author}</span>
                        </div>
                        <span>{question.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Stats */}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <button className="text-gray-400 hover:text-[#174a5f]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M10 4v12M4 10l6-6 6 6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      <span className="text-sm font-medium">{question.votes}</span>
                      <span className="text-xs text-gray-500">votes</span>
                      <button className="text-gray-400 hover:text-[#174a5f] mt-1">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M10 16V4M4 10l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-col items-center bg-green-500 text-white px-3 py-2 rounded">
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 8l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="text-sm font-medium">{question.answers}</span>
                      </div>
                      <span className="text-xs">answer</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium">{question.views}</span>
                      <span className="text-xs text-gray-500">views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">« First</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">‹ Back</button>
            <button className="px-3 py-1 text-sm bg-[#174a5f] text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">4</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">25</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next ›</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Last »</button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 pb-20">
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50" fill="#E5E7EB" opacity="0.5" />
              <g transform="translate(35, 35)">
                <rect x="4" y="4" width="42" height="8" rx="2" fill="#D1D5DB" />
                <rect x="4" y="16" width="42" height="8" rx="2" fill="#D1D5DB" />
                <rect x="4" y="28" width="42" height="8" rx="2" fill="#D1D5DB" />
                <circle cx="38" cy="38" r="10" fill="white" stroke="#9CA3AF" strokeWidth="2" />
                <circle cx="38" cy="38" r="6" stroke="#9CA3AF" strokeWidth="2" fill="none" />
                <line x1="42" y1="42" x2="46" y2="46" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
              </g>
            </svg>
          </div>

          <div className="text-center">
            <h3 className="text-[#174a5f] font-medium text-lg mb-1">Question Not Posted Yet!</h3>
            <p className="text-gray-400 text-sm">Add new Question</p>
          </div>

          <button
            onClick={() => setShowAskForm(true)}
            className="flex items-center gap-2 bg-[#174a5f] text-white px-6 py-3 rounded-lg hover:bg-[#2c6076] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 15L4 4C4 3.44772 4.44772 3 5 3H15C15.5523 3 16 3.44772 16 4V11C16 11.5523 15.5523 12 15 12H7L4 15Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M7 7H13M7 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Ask Questions
          </button>
        </div>
      )}
    </div>
  )
}
