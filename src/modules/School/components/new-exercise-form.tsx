"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus, Undo, RotateCw, AlignLeft, Bold, Italic, Underline, Strikethrough, List, ListOrdered, Link, Image, CircleCheck, CircleX, ChevronRight, ChevronLeft, Trash2 } from "lucide-react"

export function NewExerciseForm({ onBack }: { onBack: () => void }) {
  const [activeQuestion, setActiveQuestion] = useState(1)
  const [totalQuestions, setTotalQuestions] = useState(1)
  const [questionType, setQuestionType] = useState("Question type")
  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [hasOptions, setHasOptions] = useState(false)
  const [options, setOptions] = useState([] as { id: number; text: string }[])
  const [trueFalseAnswer, setTrueFalseAnswer] = useState<"true" | "false" | null>(null)
  const [configureOpen, setConfigureOpen] = useState(true)
  const [visibilityOpen, setVisibilityOpen] = useState(true)
  const [takeWithFriend, setTakeWithFriend] = useState(false)
  const [visibility, setVisibility] = useState("Public")
  const [activeTab, setActiveTab] = useState("exercise-features")
  const [exerciseName, setExerciseName] = useState("New Exercise")
  const [totalMark, setTotalMark] = useState("")
  const [timeGiven, setTimeGiven] = useState("")

  const questionTypes = [
    "Multiple Choice",
    "True/False", 
    "Fill in the Blanks",
    "Short Answer",
    "Essay/Writing",
    "Matching",
    "Sequencing",
    "Diagram Labeling"
  ]

  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1)

  const addOption = () => {
    if (!hasOptions) {
      setHasOptions(true)
      setOptions([{ id: Date.now(), text: "" }])
    } else {
      setOptions(prev => [...prev, { id: Date.now(), text: "" }])
    }
  }

  const richTextToolbar = (
    <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-1 text-xs text-[#546E7A]">
      <div className="flex items-center gap-0.5 pr-2 border-r border-gray-200">
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Undo">
          <Undo className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Redo">
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-0.5 pr-2 border-r border-gray-200">
        <div className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded text-xs">
          <span className="font-medium">Normal text</span>
          <ChevronDown className="w-3 h-3" />
        </div>
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors relative" title="Alignment">
          <AlignLeft className="w-3.5 h-3.5" />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#174a5f] rounded-full" />
        </button>
      </div>
      <div className="flex items-center gap-0.5 pr-2 border-r border-gray-200">
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Bold">
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Italic">
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Underline">
          <Underline className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Strikethrough">
          <Strikethrough className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-0.5">
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Bullet list">
          <List className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Numbered list">
          <ListOrdered className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Link">
          <Link className="w-3.5 h-3.5" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Image">
          <Image className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="w-full min-h-screen flex flex-col bg-white overflow-y-auto">
      <div className="flex flex-1 flex-col lg:flex-row min-h-screen">
        <main className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent min-h-screen">
          {/* Question Navigation */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {questions.map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuestion(q)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                  activeQuestion === q
                    ? "bg-[#dce5e9] text-[#174a5f]"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Q{q}.
              </button>
            ))}
            <button
              onClick={() => setTotalQuestions(totalQuestions + 1)}
              className="p-2 text-[#546E7A] hover:text-[#174a5f] hover:bg-gray-100 rounded-lg transition-colors"
              title="Add new question"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Question Type Dropdown */}
          <div className="w-48 mb-8 relative">
            <button
              onClick={() => setIsTypeOpen(!isTypeOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 border border-[#546E7A] rounded-lg text-left text-sm text-[#546E7A] hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#546E7A]/20 transition-colors"
            >
              <span className={questionType === "Question type" ? "text-[#546E7A]/60 font-normal truncate" : "font-medium truncate"}>
                {questionType}
              </span>
              {isTypeOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#546E7A] flex-shrink-0" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#546E7A] flex-shrink-0" />
              )}
            </button>
            {isTypeOpen && (
              <div className="absolute z-10 w-full left-0 mt-1 bg-white border border-[#546E7A] rounded-lg shadow-sm py-0.5 max-h-48 overflow-y-auto">
                {questionTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setQuestionType(type)
                      setIsTypeOpen(false)
                      if (type !== "Multiple Choice") {
                        setHasOptions(false)
                        setOptions([])
                      }
                      if (type !== "True/False") {
                        setTrueFalseAnswer(null)
                      }
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-[#546E7A] hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors truncate"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Multiple Choice Form */}
          {questionType === "Multiple Choice" && (
            <div className="max-w-4xl space-y-6 pb-20">
              <div>
                <h2 className="text-xl font-bold text-[#174a5f] mb-1">Multiple Choice Question</h2>
                <p className="text-sm text-gray-500">Describe question briefly</p>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                {richTextToolbar}
                <textarea
                  className="w-full p-6 border-0 resize-none focus:outline-none text-lg min-h-[120px] placeholder-gray-400"
                  rows={4}
                  placeholder="Start typing your question here..."
                />
              </div>
              <div className="space-y-4">
                {hasOptions && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {options.map((option, index) => (
                      <div key={option.id} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 min-h-[44px]">
                        <label className="flex items-center gap-2 cursor-pointer flex-shrink-0 mt-0.5">
                          <input
                            type="radio"
                            name="correct-answer"
                            id={`correct-${option.id}`}
                            className="appearance-none w-4 h-4 border-2 border-[#546E7A] rounded-full bg-white checked:border-4 checked:border-[#174a5f] checked:bg-[#174a5f] focus:outline-none focus:ring-2 focus:ring-[#174a5f]/20 hover:border-[#174a5f]/80 transition-all duration-200 relative"
                          />
                          <div className="w-4 h-4 pointer-events-none rounded-full">
                            <div className="w-1.5 h-1.5 bg-white rounded-full absolute inset-0 m-auto scale-0 opacity-0 checked:scale-100 checked:opacity-100 transition-all duration-200 origin-center" />
                          </div>
                        </label>
                        <div className="flex-1 relative min-w-0">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-800 pointer-events-none z-10 px-1">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <input
                            value={option.text}
                            onChange={(e) => {
                              const newOptions = [...options]
                              newOptions[index].text = e.target.value
                              setOptions(newOptions)
                            }}
                            className="w-full pl-8 p-2 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-[#174a5f]/20 bg-transparent"
                          />
                        </div>
                        {options.length > 1 && (
                          <button
                            onClick={() => setOptions(options.filter(o => o.id !== option.id))}
                            className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                            title="Delete option"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={addOption}
                    className="flex items-center gap-2 text-sm font-medium text-[#546E7A] hover:text-[#174a5f] hover:underline focus:outline-none focus:ring-2 focus:ring-[#174a5f]/20 transition-all duration-200 w-fit py-1"
                  >
                    <Plus className="w-4 h-4 flex-shrink-0" />
                    <span>Add Option</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* True/False Form */}
          {questionType === "True/False" && (
            <div className="max-w-4xl space-y-6 pb-20">
              <div>
                <h2 className="text-xl font-bold text-[#174a5f] mb-1">True/False Question</h2>
                <p className="text-sm text-gray-500">Describe statement briefly</p>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
                {richTextToolbar}
                <textarea
                  className="w-full p-6 border-0 resize-none focus:outline-none text-lg min-h-[120px] placeholder-gray-400"
                  rows={4}
                  placeholder="Start typing your true/false statement here..."
                />
              </div>
              <div className="space-y-4">
                <div className="p-6 border border-gray-200 rounded-2xl bg-white">
                  <h3 className="text-sm font-semibold text-[#1A3B4A] mb-6">Correct Answer</h3>
                  <div className="grid grid-cols-2 gap-4 max-w-lg">
                    <label className={`
                      flex items-center gap-4 p-6 border rounded-3xl cursor-pointer transition-all duration-200 group hover:shadow-sm
                      ${trueFalseAnswer === "true" 
                        ? "border-[#174a5f] bg-[#174a5f]/5 shadow-md ring-2 ring-[#174a5f]/20" 
                        : "border-[#D1DBE1] hover:border-[#174a5f]/40 hover:bg-[#174a5f]/2"
                      }
                    `}>
                      <input type="radio" name="true-false-answer" id="true-answer" checked={trueFalseAnswer === "true"} onChange={() => setTrueFalseAnswer("true")} className="sr-only" />
                      <div className={`
                        w-5 h-5 rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-105
                        ${trueFalseAnswer === "true" ? "bg-[#174a5f] border-4 border-white shadow-sm" : "bg-white border-2 border-[#D1DBE1] group-hover:border-[#174a5f]/60"}
                        relative
                      `}>
                        {trueFalseAnswer === "true" && <div className="absolute inset-0 m-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <CircleCheck className="w-5 h-5 text-[#174a5f] flex-shrink-0" />
                          <span className="text-sm font-semibold text-[#1A3B4A] leading-tight">True</span>
                        </div>
                      </div>
                    </label>
                    <label className={`
                      flex items-center gap-4 p-6 border rounded-3xl cursor-pointer transition-all duration-200 group hover:shadow-sm
                      ${trueFalseAnswer === "false" 
                        ? "border-[#174a5f] bg-[#174a5f]/5 shadow-md ring-2 ring-[#174a5f]/20" 
                        : "border-[#D1DBE1] hover:border-[#174a5f]/40 hover:bg-[#174a5f]/2"
                      }
                    `}>
                      <input type="radio" name="true-false-answer" id="false-answer" checked={trueFalseAnswer === "false"} onChange={() => setTrueFalseAnswer("false")} className="sr-only" />
                      <div className={`
                        w-5 h-5 rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-105
                        ${trueFalseAnswer === "false" ? "bg-[#174a5f] border-4 border-white shadow-sm" : "bg-white border-2 border-[#D1DBE1] group-hover:border-[#174a5f]/60"}
                        relative
                      `}>
                        {trueFalseAnswer === "false" && <div className="absolute inset-0 m-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <CircleX className="w-5 h-5 text-[#174a5f] flex-shrink-0" />
                          <span className="text-sm font-semibold text-[#1A3B4A] leading-tight">False</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other question types */}
          {questionType !== "Question type" && !["Multiple Choice", "True/False"].includes(questionType) && (
            <div className="max-w-4xl space-y-6 pb-20">
              <div>
                <h2 className="text-xl font-bold mb-2 text-[#174a5f]">{questionType} Question</h2>
                <p className="text-sm text-gray-500 mb-4">Describe question briefly</p>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {richTextToolbar}
                <textarea
                  className="w-full p-6 border-0 resize-none focus:outline-none text-lg min-h-[120px] placeholder-gray-400"
                  rows={6}
                  placeholder={`Enter your ${questionType.toLowerCase()} question here...`}
                />
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar - Redesigned Edit Mode */}
        <aside className="w-80 border-l border-gray-200 lg:block hidden flex-shrink-0">
          <div className="p-6 h-full overflow-y-auto">
            {/* Primary Actions */}
            <div className="space-y-3 mb-8">
              <button className="w-full bg-[#1A4D5E] text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:bg-[#174a5f] transition-all duration-200 flex items-center justify-center gap-2">
                <span>Publish</span>
              </button>
              <button className="w-full border-2 border-[#1A4D5E] text-[#1A4D5E] py-3 px-4 rounded-xl font-semibold text-sm hover:bg-[#1A4D5E] hover:text-white transition-all duration-200">
                Save as Draft
              </button>
            </div>

            {/* Tabbed Navigation */}
            <div className="flex border-b border-gray-200 mb-8">
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

            {/* Configure Accordion */}
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
                <div className="space-y-6 pb-6">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-600 font-medium block mb-2">Rename</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={exerciseName}
                        onChange={(e) => setExerciseName(e.target.value)}
                        className="w-full px-3 py-3 text-sm border-b-2 border-gray-200 focus:border-[#1A4D5E] focus:outline-none bg-transparent"
                        placeholder="New Exercise"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600 font-medium block mb-2">Total Mark</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={totalMark}
                          onChange={(e) => setTotalMark(e.target.value)}
                          className="w-full px-3 py-3 text-sm border-b-2 border-gray-200 focus:border-[#1A4D5E] focus:outline-none bg-transparent text-right"
                          placeholder="__"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600 font-medium block mb-2">Time Given</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={timeGiven}
                          onChange={(e) => setTimeGiven(e.target.value)}
                          className="w-full px-3 py-3 text-sm border-b-2 border-gray-200 focus:border-[#1A4D5E] focus:outline-none bg-transparent text-right"
                          placeholder="__"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">minute</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl">
                    <div className={`
                      relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0
                      ${takeWithFriend ? 'bg-[#E8F5E8]' : 'bg-[#F3F4F6]'}
                    `}>
                      <input
                        type="checkbox"
                        checked={takeWithFriend}
                        onChange={(e) => setTakeWithFriend(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`
                        absolute top-0.5 left-0.5 w-5 h-5 bg-black rounded-full shadow-sm transition-transform duration-200
                        ${takeWithFriend ? 'translate-x-6' : 'translate-x-0'}
                      `} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-900 cursor-pointer select-none">Take with friend</label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Visibility Accordion */}
            <div className="mb-8">
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
                <div className="space-y-3 pb-6">
                  <div className="relative">
                    <select
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="w-full px-3 py-3 text-sm border-b-2 border-gray-200 focus:border-[#1A4D5E] focus:outline-none bg-transparent appearance-none cursor-pointer"
                    >
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                      <option value="Unlisted">Unlisted</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              )}
            </div>

            {/* Destructive Action */}
            <div>
              <button className="w-full text-sm text-[#D97706] hover:text-red-600 hover:underline font-medium flex items-center gap-2 py-2 transition-colors">
                <Trash2 className="w-4 h-4" />
                Move to Trash
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
