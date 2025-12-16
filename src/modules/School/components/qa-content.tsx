"use client"

import { useState } from "react"
// Ensure ask-questions-form.tsx is in the same directory and exported correctly
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

// Define the Share component function locally for use within QAContent
const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 384 432" {...props}>
    <path fill="currentColor" d="M320 303q26 0 44 18.5t18 44t-18 44t-44 18.5t-44-18.5t-18-44.5q0-6 1-14l-151-88q-19 17-44 17q-27 0-45.5-18.5T0 216t18.5-45.5T64 152q25 0 44 17l150-87q-2-9-2-15q0-27 18.5-45.5T320 3t45.5 18.5t18.5 45t-18.5 45.5t-45.5 19q-25 0-44-18l-150 88q2 9 2 15t-2 15l152 88q18-16 42-16z"></path>
  </svg>
)

export function QAContent() {
  const [activeTab, setActiveTab] = useState("community") 
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
      answers: 1, // Set to 1 as requested
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
    <div className="flex-1 flex flex-col relative">
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
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-2 w-full max-w-lg border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
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
        <button
          onClick={() => setShowAskForm(true)}
          className="ml-4 flex items-center gap-1 bg-[#174a5f] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2c6076] transition-colors shadow-md shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 15L4 4C4 3.44772 4.44772 3 5 3H15C15.5523 3 16 3.44772 16 4V11C16 11.5523 15.5523 12 15 12H7L4 15Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M7 7H13M7 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Ask
        </button>
      </div>

      {activeTab === "community" && questions.length > 0 ? (
        <> 
          <div className="flex-1 px-6 py-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow flex items-start"
                >
                  
                  {/* LEFT COLUMN: Utility Icons (Bookmark, Delete, Share) */}
                  <div className="flex flex-col gap-4 mr-4 pt-1 shrink-0 text-[#174A5F]">
                    {/* Bookmark Icon (Save) - Fixed Color, No Hover */}
                    <button className="p-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21L12 17L5 21V5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V21Z"/>
                      </svg>
                    </button>
                    {/* Delete Icon - Fixed Color, No Hover */}
                    <button className="p-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6H21"/>
                        <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6"/>
                        <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6"/>
                      </svg>
                    </button>
                    
                    {/* Share Icon (New SVG, Fixed Color, No Hover) */}
                    <button className="p-1">
                      <ShareIcon width="20" height="20" />
                    </button>
                  </div>

                  {/* MIDDLE SECTION: Question Content & Metadata */}
                  <div className="flex-1 min-w-0 pr-0">
                    <h3 className="text-lg font-medium text-[#174a5f] hover:text-[#2c6076] cursor-pointer mb-2 line-clamp-2">
                        {question.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {question.preview}
                    </p>

                    {/* Tags and Author Info in a single flex container (ml-24 changed to ml-auto) */}
                    <div className="flex items-center gap-4 mb-3">
                        {/* Tags */}
                        {question.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2 py-0.5 bg-[#d8e0e6] text-[#2c6076] text-xs rounded-md font-medium cursor-pointer hover:bg-[#c2ced6]"
                          >
                            {tag}
                          </span>
                        ))}
                        
                        {/* Author Info (Shifted right using ml-auto) */}
                        <div className="flex items-center text-xs text-gray-500 ml-auto">
                            <span className="w-4 h-4 mr-1 bg-gray-300 rounded-full flex items-center justify-center text-[10px] text-white">
                                {question.author.charAt(0)}
                            </span> {/* Placeholder Avatar */}
                            <span className="text-[#174a5f] font-medium mr-2">{question.author}</span>
                            
                            <span className="text-gray-400 mr-6">{question.timeAgo}</span>
                            
                            <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                                Reply privately
                            </button>
                        </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Stats (Votes, Answers, Views) */}
                  <div className="flex flex-col items-end min-w-[120px] text-right shrink-0 ml-4">
                      {/* Top Row: Votes, Answers, Views */}
                      <div className="flex items-center gap-2 mb-2">
                          {/* Votes */}
                          <div className="flex flex-col items-center">
                              <span className="text-sm text-gray-700 font-medium">{question.votes}</span>
                              <span className="text-xs text-gray-500">votes</span>
                          </div>
                          
                          {/* Answers (Styled as a distinct button) - CORRECTED PLURALIZATION */}
                          <div className={`flex flex-col items-center px-3 py-1 rounded-md min-w-[70px] transition-colors ${
                              question.answers > 0 ? 'bg-[#4CAF50] text-white' : 'bg-gray-100 text-gray-600 border border-gray-300'
                          }`}>
                              <div className="flex items-center gap-1">
                                  {question.answers > 0 && (
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M20 6L9 17L4 12"/>
                                      </svg>
                                  )}
                                  <span className="text-sm font-bold">{question.answers}</span>
                              </div>
                              <span className="text-xs">
                                {question.answers === 1 ? 'answer' : 'answers'} {/* This line handles 'answer' vs 'answers' */}
                                </span>
                          </div>

                          {/* Views */}
                          <div className="flex flex-col items-center">
                              <span className="text-sm text-gray-700 font-medium">{question.views}</span>
                              <span className="text-xs text-gray-500">views</span>
                          </div>
                      </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination (Stuck to bottom) */}
          <div className="shrink-0 flex items-center justify-center gap-2 bg-white py-4 border-t border-gray-200">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">« First</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">‹ Back</button>
            <button className="px-3 py-1 text-sm bg-[#174a5f] text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">2</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">3</button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">25</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">Next ›</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-700">Last »</button>
          </div>
        </>
      ) : (
        // Empty State
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 pb-20 bg-gray-50">
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