"use client"

import { useState, useRef } from "react"
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Undo,
  RotateCw,
  AlignLeft,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  Image,
  Trash2,
} from "lucide-react"

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

  // Text for different question types
  const [mcqText, setMcqText] = useState("")
  const [tfText, setTfText] = useState("")
  const [fibText, setFibText] = useState("")
  const [genericText, setGenericText] = useState("")

  // Matching state (inline editable)
  const [matchingDescription, setMatchingDescription] = useState("")
  const [columnA, setColumnA] = useState<{ id: number; text: string; answer?: string }[]>([])
  const [columnB, setColumnB] = useState<{ id: number; text: string }[]>([])

  // Refs for cursor-based insertion (Fill in the Blanks)
  const fibRef = useRef<HTMLTextAreaElement | null>(null)

  const questionTypes = [
    "Multiple Choice",
    "True/False",
    "Fill in the Blanks",
    "Short Answer",
    "Essay/Writing",
    "Matching",
  ]

  const matchingOptions = ["A", "B", "C", "D", "E", "F"]

  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1)

  const addOption = () => {
    if (!hasOptions) {
      setHasOptions(true)
      setOptions([{ id: Date.now(), text: "" }])
    } else {
      setOptions(prev => [...prev, { id: Date.now(), text: "" }])
    }
  }

  const handleAddBlankSpace = () => {
    if (questionType !== "Fill in the Blanks") return
    if (!fibRef.current) return

    const el = fibRef.current
    const start = el.selectionStart ?? fibText.length
    const end = el.selectionEnd ?? fibText.length
    const insertion = " ____ "
    const next = fibText.slice(0, start) + insertion + fibText.slice(end)

    setFibText(next)

    requestAnimationFrame(() => {
      el.focus()
      const pos = start + insertion.length
      el.setSelectionRange(pos, pos)
    })
  }

  // Matching handlers
  const handleAddColumnA = () => {
    setColumnA(prev => [...prev, { id: Date.now(), text: "", answer: "" }])
  }

  const handleAddColumnB = () => {
    setColumnB(prev => [...prev, { id: Date.now(), text: "" }])
  }

  const handleEditColumnA = (id: number, value: string) => {
    setColumnA(prev => prev.map(item => (item.id === id ? { ...item, text: value } : item)))
  }

  const handleEditColumnB = (id: number, value: string) => {
    setColumnB(prev => prev.map(item => (item.id === id ? { ...item, text: value } : item)))
  }

  const handleSelectAnswer = (id: number, value: string) => {
    setColumnA(prev =>
      prev.map(item => (item.id === id ? { ...item, answer: value } : item)),
    )
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
        <button
          type="button"
          className="px-2 py-1 text-[10px] font-medium text-[#174a5f] hover:bg-gray-200 rounded transition-colors"
          title="Add blank space"
          onClick={handleAddBlankSpace}
        >
          Add blank space
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
            {questions.map(q => (
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
              <span
                className={
                  questionType === "Question type"
                    ? "text-[#546E7A]/60 font-normal truncate"
                    : "font-medium truncate"
                }
              >
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
                {questionTypes.map(type => (
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
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-6 bg-white">
                {richTextToolbar}
                <textarea
                  className="w-full p-6 border-0 resize-none focus:outline-none text-lg min-h-[120px] placeholder-gray-400 bg-white"
                  rows={4}
                  placeholder="Start typing your question here..."
                  value={mcqText}
                  onChange={e => setMcqText(e.target.value)}
                />
              </div>
              <div className="space-y-4">
                {hasOptions && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {options.map((option, index) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 min-h-[44px] bg-white"
                      >
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
                            onChange={e => {
                              const newOptions = [...options]
                              newOptions[index].text = e.target.value
                              setOptions(newOptions)
                            }}
                            className="w-full pl-8 pr-6 p-2 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-[#174a5f]/20 bg-white"
                          />
                          {options.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setOptions(prev => prev.filter(o => o.id !== option.id))
                              }
                              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete option"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
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

              <div className="border border-gray-200 rounded-lg overflow-hidden mb-8 bg-white">
                {richTextToolbar}
                <textarea
                  className="w-full p-6 border-0 resize-none focus:outline-none text-lg min-h-[120px] placeholder-gray-400 bg-white"
                  rows={4}
                  placeholder="Start typing your true/false statement here..."
                  value={tfText}
                  onChange={e => setTfText(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 max-w-lg">
                  <label className="flex items-center gap-3 p-4 border border-[#D1DBE1] rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-50 bg-white">
                    <input
                      type="radio"
                      name="true-false-answer"
                      id="true-answer"
                      checked={trueFalseAnswer === "true"}
                      onChange={() => setTrueFalseAnswer("true")}
                      className="w-4 h-4 accent-[#174a5f]"
                    />
                    <span className="text-sm font-medium text-[#1A3B4A]">True</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-[#D1DBE1] rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-50 bg-white">
                    <input
                      type="radio"
                      name="true-false-answer"
                      id="false-answer"
                      checked={trueFalseAnswer === "false"}
                      onChange={() => setTrueFalseAnswer("false")}
                      className="w-4 h-4 accent-[#174a5f]"
                    />
                    <span className="text-sm font-medium text-[#1A3B4A]">False</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Fill in the Blanks Form */}
          {questionType === "Fill in the Blanks" && (
            <div className="max-w-4xl space-y-6 pb-20">
              <div>
                <h2 className="text-xl font-bold mb-2 text-[#174a5f]">
                  Fill in the Blanks Question
                </h2>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                {richTextToolbar}
                <textarea
                  ref={fibRef}
                  className="w-full p-6 border-0 resize-none focus:outline-none text-lg min-h-[120px] placeholder-gray-400 bg-white"
                  rows={6}
                  placeholder="Enter your fill in the blanks question here..."
                  value={fibText}
                  onChange={e => setFibText(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Matching Form */}
          {questionType === "Matching" && (
            <div className="max-w-4xl space-y-6 pb-20">
              <div>
                <h2 className="text-[18px] font-semibold tracking-tight text-[#174a5f] mb-1">
                  Matching
                </h2>
                <p className="text-sm text-gray-500">
                  Create pairs by adding related items in Column A and Column B.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white">
                <div className="px-3 pt-3 pb-1">
                  <label className="text-[13px] font-medium text-gray-600 tracking-wide">
                    Matching Description
                  </label>
                </div>
                <textarea
                  className="w-full px-3 pb-3 pt-1 border-0 resize-none focus:outline-none focus:ring-0 text-sm min-h-[96px] placeholder-gray-400 bg-white"
                  placeholder="here.."
                  value={matchingDescription}
                  onChange={e => setMatchingDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column A */}
                <div className="rounded-lg bg-white flex flex-col">
                  <div className="px-3 py-2.5 border-b border-gray-100 bg-[#f7f9fb] rounded-t-lg flex items-center justify-center">
                    <h3 className="text-[12px] font-semibold text-[#174a5f] tracking-wide">
                      Column A
                    </h3>
                  </div>

                  <div className="flex-1 px-3 py-3 space-y-2">
                    {columnA.length === 0 && (
                      <p className="text-xs text-gray-400">
                        Start by adding items for Column A.
                      </p>
                    )}

                    {columnA.map((item, index) => (
                      <div
                        key={item.id}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-md flex items-center gap-2"
                      >
                        <select
                          className="h-7 px-2 text-xs border border-gray-300 rounded bg-white text-[#174a5f]
                                   focus:outline-none focus:ring-0 focus:border-[#174a5f]
                                   hover:border-[#174a5f] active:border-[#174a5f]"
                          value={item.answer ?? ""}
                          onChange={e => handleSelectAnswer(item.id, e.target.value)}
                        >
                          <option value="">–</option>
                          {matchingOptions.map(opt => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>

                        <span className="text-xs font-semibold text-gray-800 w-4 text-center">
                          {index + 1}
                        </span>

                        <div className="flex-1 flex items-center gap-1">
                          <input
                            className="flex-1 bg-white text-sm text-gray-800 focus:outline-none"
                            placeholder="Type option…"
                            value={item.text}
                            onChange={e => handleEditColumnA(item.id, e.target.value)}
                          />
                          {columnA.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setColumnA(prev => prev.filter(o => o.id !== item.id))
                              }
                              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete option"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-3 pb-3 pt-1 flex justify-center">
                    <button
                      type="button"
                      onClick={handleAddColumnA}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#174a5f] hover:text-[#123543] hover:underline rounded px-1 py-0.5"
                    >
                      <span className="text-base leading-none">+</span>
                      <span>Add option</span>
                    </button>
                  </div>
                </div>

                {/* Column B */}
                <div className="rounded-lg bg-white flex flex-col">
                  <div className="px-3 py-2.5 border-b border-gray-100 bg-[#f7f9fb] rounded-t-lg flex items-center justify-center">
                    <h3 className="text-[12px] font-semibold text-[#174a5f] tracking-wide">
                      Column B
                    </h3>
                  </div>

                  <div className="flex-1 px-3 py-3 space-y-2">
                    {columnB.length === 0 && (
                      <p className="text-xs text-gray-400">
                        Add matching items for Column B.
                      </p>
                    )}

                    {columnB.map((item, index) => (
                      <div
                        key={item.id}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-md flex items-center gap-2"
                      >
                        <span className="text-xs font-semibold text-gray-800 w-4 text-center">
                          {String.fromCharCode(65 + index)}
                        </span>

                        <div className="flex-1 flex items-center gap-1">
                          <input
                            className="flex-1 bg-white text-sm text-gray-800 focus:outline-none"
                            placeholder="Type option…"
                            value={item.text}
                            onChange={e => handleEditColumnB(item.id, e.target.value)}
                          />
                          {columnB.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setColumnB(prev => prev.filter(o => o.id !== item.id))
                              }
                              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete option"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-3 pb-3 pt-1 flex justify-center">
                    <button
                      type="button"
                      onClick={handleAddColumnB}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#174a5f] hover:text-[#123543] hover:underline rounded px-1 py-0.5"
                    >
                      <span className="text-base leading-none">+</span>
                      <span>Add option</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other question types */}
          {questionType !== "Question type" &&
            !["Multiple Choice", "True/False", "Fill in the Blanks", "Matching"].includes(
              questionType,
            ) && (
              <div className="max-w-4xl space-y-6 pb-20">
                <div>
                  <h2 className="text-xl font-bold mb-2 text-[#174a5f]">
                    {questionType} Question
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">Describe question briefly</p>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  {richTextToolbar}
                  <textarea
                    className="w-full p-6 border-0 resize-none focus:outline-none text-lg min-h-[120px] placeholder-gray-400 bg-white"
                    rows={6}
                    placeholder={`Enter your ${questionType.toLowerCase()} question here...`}
                    value={genericText}
                    onChange={e => setGenericText(e.target.value)}
                  />
                </div>
              </div>
            )}
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 border-l border-gray-200 lg:block hidden flex-shrink-0">
          <div className="p-6 h-full overflow-y-auto">
            <div className="space-y-3 mb-8">
              <button className="w-full bg-[#1A4D5E] text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md hover:bg-[#174a5f] transition-all duration-200 flex items-center justify-center gap-2">
                <span>Publish</span>
              </button>
              <button className="w-full border-2 border-[#1A4D5E] text-[#1A4D5E] py-3 px-4 rounded-xl font-semibold text-sm hover:bg-[#1A4D5E] hover:text-white transition-all duration-200">
                Save as Draft
              </button>
            </div>

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
                  activeTab === "resources" ? "text-[#1A4D5E]" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("resources")}
              >
                Resources
                {activeTab === "resources" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1A4D5E]" />
                )}
              </button>
            </div>

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
                    <label className="text-xs text-gray-600 font-medium block mb-2">
                      Rename
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={exerciseName}
                        onChange={e => setExerciseName(e.target.value)}
                        className="w-full px-3 py-3 text-sm border-b-2 border-gray-200 focus:border-[#1A4D5E] focus:outline-none bg-transparent"
                        placeholder="New Exercise"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600 font-medium block mb-2">
                        Total Mark
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={totalMark}
                          onChange={e => setTotalMark(e.target.value)}
                          className="w-full px-3 py-3 text-sm border-b-2 border-gray-200 focus:border-[#1A4D5E] focus:outline-none bg-transparent text-right"
                          placeholder="__"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600 font-medium block mb-2">
                        Time Given
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={timeGiven}
                          onChange={e => setTimeGiven(e.target.value)}
                          className="w-full px-3 py-3 text-sm border-b-2 border-gray-200 focus:border-[#1A4D5E] focus:outline-none bg-transparent text-right"
                          placeholder="__"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                          minute
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl">
                    <div
                      className={`
                        relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0
                        ${takeWithFriend ? "bg-[#E8F5E8]" : "bg-[#F3F4F6]"}
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={takeWithFriend}
                        onChange={e => setTakeWithFriend(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`
                          absolute top-0.5 left-0.5 w-5 h-5 bg-black rounded-full shadow-sm transition-transform duration-200
                          ${takeWithFriend ? "translate-x-6" : "translate-x-0"}
                        `}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-900 cursor-pointer select-none">
                        Take with friend
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 my-6" />

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
                      onChange={e => setVisibility(e.target.value)}
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
