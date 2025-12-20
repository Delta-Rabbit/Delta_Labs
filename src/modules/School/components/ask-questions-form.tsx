"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface AskQuestionsFormProps {
  onBack: () => void
  onPost: (questionData: { title: string; details: string; tags: string }) => void
}

export function AskQuestionsForm({ onBack, onPost }: AskQuestionsFormProps) {
  const [questionTitle, setQuestionTitle] = useState("")
  const [details, setDetails] = useState("")
  const [tags, setTags] = useState("")
  const [visibility, setVisibility] = useState("Public")
  const [visibilityOpen, setVisibilityOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [paymentType, setPaymentType] = useState("free")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handlePost = () => {
    if (questionTitle.trim() && details.trim()) {
      onPost({ title: questionTitle, details, tags })
    }
  }

  const handleVisibilitySelect = (value: string) => {
    setVisibility(value)
    setIsDropdownOpen(false)
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
          {/* Question Title */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">Question title</h2>
            <p className="text-sm text-gray-600 mb-3">
              Be specific and imagine you're asking a question to another person.
            </p>
            <input
              type="text"
              placeholder="eg. What is Newton's 2nd Law"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 text-sm outline-none focus:border-[#174a5f]"
            />
          </div>

          {/* Details */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">What are the details of your problem?</h2>
            <p className="text-sm text-gray-600 mb-3">
              Introduce the problem and expand on what you put in the title. Minimum 20 characters.
            </p>

            {/* Rich Text Editor Toolbar */}
            <div className="border border-gray-300 rounded-t bg-white px-3 py-2 flex items-center gap-2 flex-wrap">
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 6h12M4 10h8M4 14h12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 10l2 2 6-6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-sm">
                <span>Normal text</span>
                <ChevronDown className="w-4 h-4" />
              </div>

              <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4h12M2 8h8M2 12h12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <ChevronDown className="w-4 h-4" />
              </div>

              <div className="w-px h-5 bg-gray-300" />

              <button className="p-1 hover:bg-gray-100 rounded font-bold text-sm">B</button>
              <button className="p-1 hover:bg-gray-100 rounded italic text-sm">I</button>
              <button className="p-1 hover:bg-gray-100 rounded underline text-sm">U</button>
              <button className="p-1 hover:bg-gray-100 rounded line-through text-sm">S</button>

              <div className="w-px h-5 bg-gray-300" />

              <button className="p-1 hover:bg-gray-100 rounded">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                  <circle cx="4" cy="10" r="1.5" fill="currentColor" />
                  <circle cx="4" cy="14" r="1.5" fill="currentColor" />
                  <path d="M8 6h8M8 12h8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <text x="3" y="8" fontSize="8" fill="currentColor">
                    1.
                  </text>
                  <text x="3" y="14" fontSize="8" fill="currentColor">
                    2.
                  </text>
                  <path d="M8 6h8M8 12h8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              <div className="w-px h-5 bg-gray-300" />

              <button className="p-1 hover:bg-gray-100 rounded">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="4" width="12" height="9" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                  <path d="M4 13l3-3 2 2 3-3 4 4" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <textarea
              placeholder="Detail Explanation"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full border border-t-0 border-gray-300 rounded-b px-4 py-3 text-sm outline-none focus:border-[#174a5f] min-h-[200px]"
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">Tags</h2>
            <p className="text-sm text-gray-600 mb-3">
              Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
            </p>
            <input
              type="text"
              placeholder="Tag"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 text-sm outline-none focus:border-[#174a5f]"
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-gray-200 bg-white px-6 py-6">
          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-50">
              Save as Draft
            </button>
            <button
              onClick={handlePost}
              className="flex-1 bg-[#174a5f] text-white px-4 py-2 rounded text-sm hover:bg-[#2c6076]"
            >
              Post
            </button>
          </div>

          {/* Question Features */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#174a5f] mb-4 pb-2 border-b border-gray-200">Question Features</h3>

            {/* Visibility */}
            <div className="mb-4">
              <button
                onClick={() => setVisibilityOpen(!visibilityOpen)}
                className="flex items-center justify-between w-full py-2 text-sm font-medium"
              >
                Visibility
                <ChevronDown className={`w-4 h-4 transition-transform ${visibilityOpen ? "rotate-180" : ""}`} />
              </button>

              {visibilityOpen && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Visibility</span>
                    <div className="relative">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-[#174a5f] bg-white min-w-[100px] text-left flex items-center justify-between"
                      >
                        <span>{visibility}</span>
                        <ChevronDown className="w-3 h-3 ml-2" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                          <button
                            onClick={() => handleVisibilitySelect("Public")}
                            className="w-full px-2 py-1.5 text-sm text-left hover:bg-[#174a5f] hover:text-white transition-colors"
                          >
                            Public
                          </button>
                          <button
                            onClick={() => handleVisibilitySelect("Private")}
                            className="w-full px-2 py-1.5 text-sm text-left hover:bg-[#174a5f] hover:text-white transition-colors"
                          >
                            Private
                          </button>
                          <button
                            onClick={() => handleVisibilitySelect("Team")}
                            className="w-full px-2 py-1.5 text-sm text-left hover:bg-[#174a5f] hover:text-white transition-colors"
                          >
                            Team
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="text-red-500 text-sm hover:text-red-600">Move to Trash</button>
                </div>
              )}
            </div>

            {/* Payment */}
            <div>
              <button
                onClick={() => setPaymentOpen(!paymentOpen)}
                className="flex items-center justify-between w-full py-2 text-sm font-medium"
              >
                Payment
                <ChevronDown className={`w-4 h-4 transition-transform ${paymentOpen ? "rotate-180" : ""}`} />
              </button>

              {paymentOpen && (
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name="payment"
                        value="free"
                        checked={paymentType === "free"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      {paymentType === "free" && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-2.5 h-2.5 bg-[#174a5f] rounded-full" />
                        </div>
                      )}
                    </div>
                    <span>Free</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paid"
                      checked={paymentType === "paid"}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <span>Paid</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
