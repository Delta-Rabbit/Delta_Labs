"use client"

import type React from "react"
import { useState } from "react"
import { AskQuestionsForm } from "./ask-questions-form"
import { QuestionCard } from "./QuestionCard"

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

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 384 432" {...props}>
    <path
      fill="currentColor"
      d="M320 303q26 0 44 18.5t18 44t-18 44t-44 18.5t-44-18.5t-18-44.5q0-6 1-14l-151-88q-19 17-44 17q-27 0-45.5-18.5T0 216t18.5-45.5T64 152q25 0 44 17l150-87q-2-9-2-15q0-27 18.5-45.5T320 3t45.5 18.5t18.5 45t-18.5 45.5t-45.5 19q-25 0-44-18l-150 88q2 9 2 15t-2 15l152 88q18-16 42-16z"
    ></path>
  </svg>
)

export function QAContent() {
  const [activeTab, setActiveTab] = useState<"questions" | "community" | "draft">("questions")
  const [viewMode, setViewMode] = useState<"direct" | "management">("direct")
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
      author: "Jhon",
      timeAgo: "Asked just now",
      votes: 0,
      answers: 0,
      views: 1,
    }
    setQuestions((prev) => [newQuestion, ...prev])
    setShowAskForm(false)
    setActiveTab("questions")
  }

  const handleOpenAskForm = () => {
    setShowAskForm(true)
  }

  if (showAskForm) {
    return <AskQuestionsForm onBack={() => setShowAskForm(false)} onPost={handlePostQuestion} />
  }

  const showList = (activeTab === "questions" || activeTab === "community") && questions.length > 0

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      {/* Top section: segmented control + tabs + CTA */}
      <div className="px-6 pt-4">
        {/* Segmented control: Direct View / Management Table */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-3 text-sm text-gray-600">
              <button
                type="button"
                onClick={() => setViewMode("direct")}
                className={`px-4 py-1.5 rounded-md transition-colors ${
                  viewMode === "direct"
                    ? "bg-[#E5EAEF] text-[#174a5f]"
                    : "bg-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                Direct View
              </button>

              <span className="text-gray-300 select-none">|</span>

              <button
                type="button"
                onClick={() => setViewMode("management")}
                className={`px-4 py-1.5 rounded-md transition-colors ${
                  viewMode === "management"
                    ? "bg-[#E5EAEF] text-[#174a5f]"
                    : "bg-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                Management Table
              </button>
            </div>
          </div>

          {questions.length > 0 && (
            <button
              onClick={handleOpenAskForm}
              className="inline-flex items-center gap-2 bg-[#174a5f] text-white px-6 py-2.5 rounded-lg hover:bg-[#1f627c] transition-colors text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 3h6l4 4v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z" />
                <path d="M12 11.5a2 2 0 1 0-2-2" />
                <path d="M12 16h.01" />
              </svg>
              <span>Ask Questions</span>
            </button>
          )}
        </div>

        {/* Secondary navigation: Questions / Community / Draft */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab("questions")}
              className={`py-3 text-sm transition-colors relative ${
                activeTab === "questions" ? "text-[#174a5f] font-medium" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Questions
              {activeTab === "questions" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("community")}
              className={`py-3 text-sm transition-colors relative ${
                activeTab === "community" ? "text-[#174a5f] font-medium" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Community
              {activeTab === "community" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("draft")}
              className={`py-3 text-sm transition-colors relative ${
                activeTab === "draft" ? "text-[#174a5f] font-medium" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Draft
              {activeTab === "draft" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex justify-center items-center px-6 py-6">
        <div className="flex items-center gap-2 w-full max-w-lg border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400"
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search questions..."
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <button className="text-[#174a5f] hover:text-[#2c6076]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h14M6 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content area: cards vs management table */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {showList ? (
          viewMode === "direct" ? (
            // Direct View: original cards
            <div className="space-y-4">
              {questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          ) : (
            // Management Table view
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b border-gray-200 text-gray-600">
                  <tr>
                    <th className="text-left py-2 pr-4 font-medium">Title</th>
                    <th className="text-left py-2 pr-4 font-medium">Author</th>
                    <th className="text-left py-2 pr-4 font-medium">Votes</th>
                    <th className="text-left py-2 pr-4 font-medium">Answers</th>
                    <th className="text-left py-2 pr-4 font-medium">Views</th>
                    <th className="text-left py-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {questions.map((q) => (
                    <tr key={q.id} className="hover:bg-gray-50">
                      <td className="py-2 pr-4 text-[#174a5f]">{q.title}</td>
                      <td className="py-2 pr-4 text-gray-700">{q.author}</td>
                      <td className="py-2 pr-4 text-gray-700">{q.votes}</td>
                      <td className="py-2 pr-4 text-gray-700">{q.answers}</td>
                      <td className="py-2 pr-4 text-gray-700">{q.views}</td>
                      <td className="py-2 text-gray-500">{q.timeAgo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          // Empty state (adjusted)
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-6 -mt-6">
            <div className="relative w-32 h-32">
              <img
                src="/assets/images/EmptyState.png"
                alt="Empty State"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="text-center">
              <h3 className="text-[#174a5f] font-medium text-lg mb-1">Question Not Posted Yet!</h3>
              <p className="text-gray-400 text-sm">Add new Question</p>
            </div>

            <button
              onClick={handleOpenAskForm}
              className="flex items-center gap-2 bg-[#174a5f] text-white px-6 py-3 rounded-lg hover:bg-[#2c6076] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 3h6l4 4v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z" />
                <path d="M12 11.5a2 2 0 1 0-2-2" />
                <path d="M12 16h.01" />
              </svg>
              <span>Ask Questions</span>
            </button>
          </div>
        )}
      </div>

      {/* Pagination (only when list exists) */}
      {showList && (
        <div className="shrink-0 bg-white pb-24">
          <div className="mx-auto max-w-4xl flex items-center justify-center gap-2 bg-white py-3 rounded-t-lg">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">
              « First
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">
              ‹ Back
            </button>
            <button className="px-3 py-1 text-sm bg-[#174a5f] text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">
              2
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">
              3
            </button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">
              25
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">
              Next ›
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">
              Last »
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
