"use client"

import React, { useState } from "react"
import { PostAnswer } from "./PostAnswer"

interface QuestionCardProps {
  question: {
    id: number
    title: string
    preview: string
    tags: string[]
    timeAgo: string
    votes: number
    answers: number
    views: number
  }
}

type Answer = {
  id: number
  votes: number
  body: string
  author: string
  timeAgo: string
  approved: boolean
}

const INITIAL_ANSWERS: Answer[] = [
  {
    id: 1,
    votes: 4,
    body: "You are the operator of a junction and you hear a Git branch coming. You have no idea which way it is supposed to go. You stop the train to ask the driver which direction they want. And then you set the switch appropriately to open them.",
    author: "Jonathan Araujo",
    timeAgo: "answered 4 mins ago",
    approved: true,
  },
  {
    id: 2,
    votes: 2,
    body: "Think of branching like creating alternate timelines. Each branch lets you experiment without changing the main story until you are ready to merge.",
    author: "Delta Labs Mentor",
    timeAgo: "answered 12 mins ago",
    approved: false,
  },
  {
    id: 3,
    votes: 1,
    body: "Use feature branches for every task, keep them small, and always rebase or merge from main before opening a pull request.",
    author: "Senior Engineer",
    timeAgo: "answered 25 mins ago",
    approved: false,
  },
]

const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 384 432"
    {...props}
  >
    <path
      fill="currentColor"
      d="M320 303q26 0 44 18.5t18 44t-18 44t-44 18.5t-44-18.5t-18-44.5q0-6 1-14l-151-88q-19 17-44 17q-27 0-45.5-18.5T0 216t18.5-45.5T64 152q25 0 44 17l150-87q-2-9-2-15q0-27 18.5-45.5T320 3t45.5 18.5t18.5 45t-18.5 45.5t-45.5 19q-25 0-44-18l-150 88q2 9 2 15t-2 15l152 88q18-16 42-16z"
    />
  </svg>
)

const GiftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="3" y="7" width="18" height="4" rx="1" className="fill-teal-700" />
    <rect x="4" y="11" width="16" height="9" rx="1.5" className="fill-teal-600" />
    <rect x="11" y="7" width="2" height="13" className="fill-teal-500" />
    <path
      d="M12 7c-1.6-1.3-2.6-2.2-3.5-2.4C7.6 4.3 6.5 4.9 6 5.9 5.4 7.1 6 8.5 7.2 9c.9.4 2.1.3 3.6-.3"
      className="fill-teal-500"
    />
    <path
      d="M12 7c1.6-1.3 2.6-2.2 3.5-2.4.9-.3 2 .3 2.5 1.3.6 1.2 0 2.6-1.2 3.1-.9.4-2.1.3-3.6-.3"
      className="fill-teal-500"
    />
  </svg>
)

export function QuestionCard({ question }: QuestionCardProps) {
  const [votes, setVotes] = useState(question.votes)
  const [showAnswers, setShowAnswers] = useState(false)
  const [answers, setAnswers] = useState<Answer[]>(INITIAL_ANSWERS)

  const handleUpVote = () => setVotes((prev) => prev + 1)
  const handleDownVote = () => setVotes((prev) => prev - 1)

  const displayAnswers = Math.max(answers.length, 1)

  const handleAddAnswer = (body: string, anonymous: boolean) => {
    const newAnswer: Answer = {
      id: answers.length + 1,
      votes: 0,
      body,
      author: anonymous ? "Anonymous" : "You",
      timeAgo: "answered just now",
      approved: false,
    }
    setAnswers((prev) => [...prev, newAnswer])
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow flex flex-col">
        <div className="flex items-stretch gap-6">
          <div className="flex items-start flex-1 min-w-0">
            <div className="flex flex-col gap-4 mr-4 pt-1 shrink-0 text-[#174A5F]">
              <button className="p-1">
                <svg
                  width="20"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21L12 17L5 21V5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V21Z" />
                </svg>
              </button>

              <button className="p-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6H21" />
                  <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6" />
                  <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" />
                </svg>
              </button>

              <button className="p-1">
                <ShareIcon width="20" height="20" />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setShowAnswers((prev) => !prev)}
                className="w-full text-left"
              >
                <h3 className="text-lg font-medium text-[#174a5f] hover:text-[#2c6076] cursor-pointer mb-2 line-clamp-2">
                  {question.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {question.preview}
                </p>
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-1">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[#d8e0e6] text-[#2c6076] text-xs rounded-md font-medium cursor-pointer hover:bg-[#c2ced6]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-end">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="flex flex-col items-center leading-none text-gray-500">
                  <button
                    type="button"
                    onClick={handleUpVote}
                    className="text-sm hover:text-gray-700"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={handleDownVote}
                    className="text-sm hover:text-gray-700"
                  >
                    ▼
                  </button>
                </div>

                <div className="flex flex-col items-start leading-tight">
                  <span className="text-lg text-gray-800 font-normal">
                    {votes}
                  </span>
                  <span className="text-xs text-gray-500">votes</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-[#63BA82] rounded-xl w-20 h-20 flex flex-col items-center justify-center text-white">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17L4 12" />
                    </svg>
                    <span className="text-lg font-normal">
                      {displayAnswers}
                    </span>
                  </div>
                  <span className="text-xs leading-none">
                    {displayAnswers === 1 ? "answer" : "answers"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-base text-gray-800 font-medium">
                  {question.views}
                </span>
                <span className="text-xs text-gray-500">views</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <img
              src="/assets/images/profile1.png"
              alt="Leul Solomon"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-[#174a5f] font-medium">Leul Solomon</span>
            <span className="text-gray-400">· {question.timeAgo}</span>
          </div>
        </div>
      </div>

      {showAnswers && (
        <div className="ml-6 border-t border-gray-200 pt-4">
          <div className="w-full max-w-4xl max-h-80 overflow-y-auto space-y-6 no-scrollbar">
            {answers.map((answer, index) => {
              const isFirst = index === 0
              const railColorClass = isFirst ? "bg-[#63BA82]" : "bg-[#C8CCD0]"

              return (
                <div key={answer.id} className="flex gap-4">
                  <div className={`w-1 rounded-full ${railColorClass}`} />
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex items-center gap-6">
                      <span className="text-sm font-medium text-slate-500">
                        Answer
                      </span>
                      <div className="flex items-center gap-3 text-slate-500 text-sm">
                        <div className="flex flex-col items-center gap-1">
                          <button
                            type="button"
                            className="leading-none text-slate-400 hover:text-slate-600"
                            aria-label="Upvote answer"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            className="leading-none text-slate-400 hover:text-slate-600"
                            aria-label="Downvote answer"
                          >
                            ▼
                          </button>
                        </div>
                        <span className="text-base font-semibold text-slate-700">
                          {answer.votes}
                        </span>
                        <span className="text-xs text-slate-500">votes</span>
                      </div>
                    </div>

                    <p className="text-[15px] leading-relaxed text-slate-800">
                      {answer.body}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-6">
                        <button className="text-[15px] font-medium text-[#2D89EF]">
                          Comments
                        </button>

                        <button className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-teal-50">
                            <GiftIcon className="w-4 h-4 text-teal-700" />
                          </span>
                          <span className="text-[14px] text-slate-500">
                            Approved Answer
                          </span>
                        </button>
                      </div>

                      <div className="flex items-center gap-6 text-[14px]">
                        <button className="text-slate-400">Report</button>

                        <div className="flex items-center gap-3">
                          <button className="text-[#2D89EF]">Share</button>
                          <div className="flex items-center gap-2">
                            <img
                              src="/assets/images/profile1.png"
                              alt={answer.author}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-blue-600">
                              {answer.author}
                            </span>
                          </div>
                        </div>

                        <span className="text-slate-400">
                          {answer.timeAgo}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <PostAnswer onSubmit={handleAddAnswer} />
        </div>
      )}
    </div>
  )
}
