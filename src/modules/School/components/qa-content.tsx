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

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 384 432" {...props}>
    <path
      fill="currentColor"
      d="M320 303q26 0 44 18.5t18 44t-18 44t-44 18.5t-44-18.5t-18-44.5q0-6 1-14l-151-88q-19 17-44 17q-27 0-45.5-18.5T0 216t18.5-45.5T64 152q25 0 44 17l150-87q-2-9-2-15q0-27 18.5-45.5T320 3t45.5 18.5t18.5 45t-18.5 45.5t-45.5 19q-25 0-44-18l-150 88q2 9 2 15t-2 15l152 88q18-16 42-16z"
    />
  </svg>
)

export function QAContent() {
  const [activeTab, setActiveTab] = useState("questions")
  const [showAskForm, setShowAskForm] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])

  const handlePostQuestion = (questionData: { title: string; details: string; tags: string }) => {
    const newQuestion: Question = {
      id: Date.now(),
      title: `Q. ${questionData.title}`,
      preview: questionData.details.substring(0, 150) + "...",
      tags: questionData.tags.split(",").map(t => t.trim()).filter(Boolean),
      author: "Jhon",
      timeAgo: "Asked just now",
      votes: 0,
      answers: 1,
      views: 1,
    }

    setQuestions([newQuestion, ...questions])
    setShowAskForm(false)
    setActiveTab("community")
  }

  if (showAskForm) {
    return <AskQuestionsForm onBack={() => setShowAskForm(false)} onPost={handlePostQuestion} />
  }

  return (
    <div className="flex-1 flex flex-col relative bg-white">

      {/* Tabs */}
      <div className="px-6">
        <div className="flex gap-8">
          {["questions", "community", "draft"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-3 text-sm transition-colors ${
                activeTab === tab
                  ? "text-[#174a5f] font-medium"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#174a5f]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center px-6 py-6">
        <div className="flex items-center gap-2 w-full max-w-lg border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search questions..."
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
          />
          <button className="text-[#174a5f]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M6 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {activeTab === "community" && questions.length > 0 ? (
        <div className="flex-1 px-6 py-4 overflow-y-auto bg-white">
          {/* Questions list content remains unchanged */}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-start gap-3 bg-white mt-4">
          <img
            src="/assets/images/EmptyState.png"
            alt="Empty state"
            className="max-w-xs"
          />

          <h3 className="text-[#174a5f] font-medium text-lg">
            Question Not Posted Yet!
          </h3>

          <p className="text-gray-400 text-sm">
            Add new Question
          </p>

          <button
            onClick={() => setShowAskForm(true)}
            className="flex items-center gap-2 bg-[#174a5f] text-white px-6 py-3 rounded-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="2" fill="#1A4D5C"/>
              <path d="M12 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H14" 
                    stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 3V8H17L12 3Z" fill="white"/>
              <path d="M17 12V8H12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13.5C16 12.1193 17.1193 11 18.5 11C19.8807 11 21 12.1193 21 13.5C21 14.8 19.5 15.5 18.5 16.5V17.5" 
                    stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="18.5" cy="20" r="1.1" fill="white"/>
            </svg>
            Ask Questions
          </button>
        </div>
      )}
    </div>
  )
}
