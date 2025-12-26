"use client"

import React from "react"

interface PostAnswerProps {
  onSubmit: (body: string, anonymous: boolean) => void
}

export function PostAnswer({ onSubmit }: PostAnswerProps) {
  const [anonymous, setAnonymous] = React.useState(false)
  const [body, setBody] = React.useState("")

  const handleToggleAnonymous = () => {
    setAnonymous((prev) => !prev)
  }

  const handleSubmit = () => {
    if (!body.trim()) return
    onSubmit(body.trim(), anonymous)
    setBody("")
    setAnonymous(false)
  }

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h4 className="text-sm font-medium text-slate-500 mb-3">
        Your Answer
      </h4>

      <div className="border border-slate-200 rounded-lg bg-white flex flex-col">
        <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-200 text-slate-500 text-sm">
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-slate-100" aria-label="Undo">
              ⟲
            </button>
            <button className="p-1 rounded hover:bg-slate-100" aria-label="Redo">
              ⟳
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100">
            <span className="text-xs text-slate-600">Normal text</span>
            <svg
              className="w-3 h-3 text-slate-500"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8L10 12L14 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="h-5 w-px bg-slate-200" />

          <div className="flex items-center gap-1">
            <button className="px-1.5 py-0.5 text-xs font-semibold rounded hover:bg-slate-100">
              B
            </button>
            <button className="px-1.5 py-0.5 text-xs italic rounded hover:bg-slate-100">
              I
            </button>
            <button className="px-1.5 py-0.5 text-xs underline rounded hover:bg-slate-100">
              U
            </button>
            <button className="px-1.5 py-0.5 text-xs font-mono rounded hover:bg-slate-100">
              {"</>"}
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-slate-100" aria-label="Align left">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4 6H20" />
                <path d="M4 10H14" />
                <path d="M4 14H18" />
                <path d="M4 18H12" />
              </svg>
            </button>
            <button className="p-1 rounded hover:bg-slate-100" aria-label="Align center">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4 6H20" />
                <path d="M7 10H17" />
                <path d="M5 14H19" />
                <path d="M8 18H16" />
              </svg>
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-slate-100" aria-label="Attach image">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M8 13L11 16L16 10" />
              </svg>
            </button>
            <button className="p-1 rounded hover:bg-slate-100" aria-label="Attach file">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16.5 6.5L8 15C7.17157 15.8284 7.17157 17.1716 8 18C8.82843 18.8284 10.1716 18.8284 11 18L19.5 9.5C21.1569 7.84315 21.1569 5.15685 19.5 3.5C17.8431 1.84315 15.1569 1.84315 13.5 3.5L5 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-3 py-2">
          <textarea
            className="w-full resize-none border-0 focus:ring-0 focus:outline-none text-sm text-slate-800 placeholder:text-slate-400 min-h-[140px] py-2"
            placeholder="answer"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between px-3 py-2 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={handleToggleAnonymous}
            className="flex items-center gap-2 text-xs text-slate-500"
          >
            <span
              className={`relative inline-flex h-5 w-9 items-center rounded-full ${
                anonymous ? "bg-[#174A5F]" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  anonymous ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </span>

            <span className="flex items-center gap-1">
              <svg
                className="w-5 h-5 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 9L9.5 5.5H14.5L16 9" />
                <path d="M6 9H18" />
                <circle cx="9" cy="13" r="2" />
                <circle cx="15" cy="13" r="2" />
                <path d="M11 13H13" />
                <path d="M7 17C8.5 16 10 15.5 12 15.5C14 15.5 15.5 16 17 17" />
              </svg>
              <span>Post as anonymous</span>
            </span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center min-w-[140px] px-6 py-2 rounded-md bg-[#174A5F] text-white text-sm font-medium shadow-sm hover:bg-[#1f5c73] transition-colors"
          >
            Answer
          </button>
        </div>
      </div>
    </div>
  )
}
