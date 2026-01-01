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
} from "lucide-react"
import { ExerciseSidebar } from "./ExerciseSidebar"
import { ExerciseCard } from "./ExerciseCard"

type QuestionType =
  | "Question type"
  | "Multiple Choice"
  | "True/False"
  | "Fill in the Blanks"
  | "Short Answer"
  | "Essay/Writing"
  | "Matching"

type McqOption = { id: number; text: string }

type MatchingItemA = { id: number; text: string; answer?: string }
type MatchingItemB = { id: number; text: string }

type Question = {
  id: number
  type: QuestionType
  mcqText: string
  mcqOptions: McqOption[]
  trueFalseText: string
  trueFalseAnswer: "true" | "false" | null
  fibText: string
  genericText: string
  matchingDescription: string
  columnA: MatchingItemA[]
  columnB: MatchingItemB[]
}

type PublishedExercise = {
  exerciseName: string
  totalMark: string
  timeGiven: string
  takeWithFriend: boolean
  visibility: string
  questions: { id: number; type: string }[]
}

const questionTypes: QuestionType[] = [
  "Multiple Choice",
  "True/False",
  "Fill in the Blanks",
  "Short Answer",
  "Essay/Writing",
  "Matching",
  "Question type",
]

const matchingOptions = ["A", "B", "C", "D", "E", "F"]

export function NewExerciseForm({ onBack }: { onBack: () => void }) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "Question type",
      mcqText: "",
      mcqOptions: [],
      trueFalseText: "",
      trueFalseAnswer: null,
      fibText: "",
      genericText: "",
      matchingDescription: "",
      columnA: [],
      columnB: [],
    },
  ])

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [isTypeOpen, setIsTypeOpen] = useState(false)

  const [takeWithFriend, setTakeWithFriend] = useState(false)
  const [visibility, setVisibility] = useState("Public")
  const [activeTab, setActiveTab] = useState("exercise-features")
  const [exerciseName, setExerciseName] = useState("New Exercise")
  const [totalMark, setTotalMark] = useState("")
  const [timeGiven, setTimeGiven] = useState("")

  const [published, setPublished] = useState<PublishedExercise | null>(null)

  const fibRef = useRef<HTMLTextAreaElement | null>(null)

  const activeQuestion = questions[activeQuestionIndex]

  const handleAddQuestion = () => {
    setQuestions(prev => {
      const next: Question = {
        id: Date.now(),
        type: "Question type",
        mcqText: "",
        mcqOptions: [],
        trueFalseText: "",
        trueFalseAnswer: null,
        fibText: "",
        genericText: "",
        matchingDescription: "",
        columnA: [],
        columnB: [],
      }
      return [...prev, next]
    })
    setActiveQuestionIndex(questions.length)
  }

  const updateActiveQuestion = (updater: (q: Question) => Question) => {
    setQuestions(prev => {
      const copy = [...prev]
      copy[activeQuestionIndex] = updater(copy[activeQuestionIndex])
      return copy
    })
  }

  const handleAddBlankSpace = () => {
    const q = activeQuestion
    if (q.type !== "Fill in the Blanks") return
    if (!fibRef.current) return

    const el = fibRef.current
    const currentText = q.fibText
    const start = el.selectionStart ?? currentText.length
    const end = el.selectionEnd ?? currentText.length
    const insertion = " ____ "
    const next = currentText.slice(0, start) + insertion + currentText.slice(end)

    updateActiveQuestion(prev => ({ ...prev, fibText: next }))

    requestAnimationFrame(() => {
      el.focus()
      const pos = start + insertion.length
      el.setSelectionRange(pos, pos)
    })
  }

  const handleAddColumnA = () => {
    updateActiveQuestion(prev => ({
      ...prev,
      columnA: [...prev.columnA, { id: Date.now(), text: "", answer: "" }],
    }))
  }

  const handleAddColumnB = () => {
    updateActiveQuestion(prev => ({
      ...prev,
      columnB: [...prev.columnB, { id: Date.now(), text: "" }],
    }))
  }

  const handleEditColumnA = (id: number, value: string) => {
    updateActiveQuestion(prev => ({
      ...prev,
      columnA: prev.columnA.map(item =>
        item.id === id ? { ...item, text: value } : item,
      ),
    }))
  }

  const handleEditColumnB = (id: number, value: string) => {
    updateActiveQuestion(prev => ({
      ...prev,
      columnB: prev.columnB.map(item =>
        item.id === id ? { ...item, text: value } : item,
      ),
    }))
  }

  const handleSelectAnswer = (id: number, value: string) => {
    updateActiveQuestion(prev => ({
      ...prev,
      columnA: prev.columnA.map(item =>
        item.id === id ? { ...item, answer: value } : item,
      ),
    }))
  }

  const handlePublish = () => {
    setPublished({
      exerciseName,
      totalMark,
      timeGiven,
      takeWithFriend,
      visibility,
      questions: questions.map(q => ({ id: q.id, type: q.type })),
    })
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

  if (published) {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <ExerciseCard
          exerciseName={published.exerciseName}
          totalMark={published.totalMark}
          timeGiven={published.timeGiven}
          takeWithFriend={published.takeWithFriend}
          visibility={published.visibility}
          questions={published.questions}
        />
      </div>
    </div>
  )
}

  return (
    <div className="w-full min-h-screen flex flex-col bg-white overflow-y-auto">
      <div className="flex flex-1 flex-col lg:flex-row min-h-screen">
        <main className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent min-h-screen">
          {/* Question Navigation */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIndex(index)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                  activeQuestionIndex === index
                    ? "bg-[#dce5e9] text-[#174a5f]"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Q{index + 1}.
              </button>
            ))}
            <button
              onClick={handleAddQuestion}
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
                  activeQuestion.type === "Question type"
                    ? "text-[#546E7A]/60 font-normal truncate"
                    : "font-medium truncate"
                }
              >
                {activeQuestion.type === "Question type" ? "Question type" : activeQuestion.type}
              </span>
              {isTypeOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#546E7A] flex-shrink-0" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#546E7A] flex-shrink-0" />
              )}
            </button>
            {isTypeOpen && (
              <div className="absolute z-10 w-full left-0 mt-1 bg-white border border-[#546E7A] rounded-lg shadow-sm py-0.5 max-h-48 overflow-y-auto">
                {questionTypes
                  .filter(qt => qt !== "Question type")
                  .map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        updateActiveQuestion(prev => {
                          const next: Question = { ...prev, type }
                          if (type !== "Multiple Choice") {
                            next.mcqOptions = []
                          }
                          if (type !== "True/False") {
                            next.trueFalseAnswer = null
                          }
                          if (type !== "Matching") {
                            next.columnA = []
                            next.columnB = []
                            next.matchingDescription = ""
                          }
                          return next
                        })
                        setIsTypeOpen(false)
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-[#546E7A] hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors truncate"
                    >
                      {type}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Multiple Choice */}
          {activeQuestion.type === "Multiple Choice" && (
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
                  value={activeQuestion.mcqText}
                  onChange={e =>
                    updateActiveQuestion(prev => ({ ...prev, mcqText: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-4">
                {activeQuestion.mcqOptions.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {activeQuestion.mcqOptions.map((option, index) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 min-h-[44px] bg-white"
                      >
                        <label className="flex items-center gap-2 cursor-pointer flex-shrink-0 mt-0.5">
                          <input
                            type="radio"
                            name={`correct-answer-${activeQuestion.id}`}
                            className="appearance-none w-4 h-4 border-2 border-[#546E7A] rounded-full bg-white checked:border-4 checked:border-[#174a5f] checked:bg-[#174a5f] focus:outline-none focus:ring-2 focus:ring-[#174a5f]/20 hover:border-[#174a5f]/80 transition-all duration-200 relative"
                          />
                        </label>
                        <div className="flex-1 relative min-w-0">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-800 pointer-events-none z-10 px-1">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <input
                            value={option.text}
                            onChange={e =>
                              updateActiveQuestion(prev => ({
                                ...prev,
                                mcqOptions: prev.mcqOptions.map(o =>
                                  o.id === option.id ? { ...o, text: e.target.value } : o,
                                ),
                              }))
                            }
                            className="w-full pl-8 pr-6 p-2 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-[#174a5f]/20 bg-white"
                          />
                          {activeQuestion.mcqOptions.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                updateActiveQuestion(prev => ({
                                  ...prev,
                                  mcqOptions: prev.mcqOptions.filter(o => o.id !== option.id),
                                }))
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
                    onClick={() =>
                      updateActiveQuestion(prev => ({
                        ...prev,
                        mcqOptions: [
                          ...prev.mcqOptions,
                          { id: Date.now(), text: "" },
                        ],
                      }))
                    }
                    className="flex items-center gap-2 text-sm font-medium text-[#546E7A] hover:text-[#174a5f] hover:underline focus:outline-none focus:ring-2 focus:ring-[#174a5f]/20 transition-all duration-200 w-fit py-1"
                  >
                    <Plus className="w-4 h-4 flex-shrink-0" />
                    <span>Add Option</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* True/False */}
          {activeQuestion.type === "True/False" && (
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
                  value={activeQuestion.trueFalseText}
                  onChange={e =>
                    updateActiveQuestion(prev => ({
                      ...prev,
                      trueFalseText: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 max-w-lg">
                  <label className="flex items-center gap-3 p-4 border border-[#D1DBE1] rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-50 bg-white">
                    <input
                      type="radio"
                      name={`true-false-${activeQuestion.id}`}
                      checked={activeQuestion.trueFalseAnswer === "true"}
                      onChange={() =>
                        updateActiveQuestion(prev => ({
                          ...prev,
                          trueFalseAnswer: "true",
                        }))
                      }
                      className="w-4 h-4 accent-[#174a5f]"
                    />
                    <span className="text-sm font-medium text-[#1A3B4A]">True</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-[#D1DBE1] rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-50 bg-white">
                    <input
                      type="radio"
                      name={`true-false-${activeQuestion.id}`}
                      checked={activeQuestion.trueFalseAnswer === "false"}
                      onChange={() =>
                        updateActiveQuestion(prev => ({
                          ...prev,
                          trueFalseAnswer: "false",
                        }))
                      }
                      className="w-4 h-4 accent-[#174a5f]"
                    />
                    <span className="text-sm font-medium text-[#1A3B4A]">False</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Fill in the Blanks */}
          {activeQuestion.type === "Fill in the Blanks" && (
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
                  value={activeQuestion.fibText}
                  onChange={e =>
                    updateActiveQuestion(prev => ({
                      ...prev,
                      fibText: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}

          {/* Matching */}
          {activeQuestion.type === "Matching" && (
            <div className="max-w-4xl space-y-6 pb-20">
              <div>
                <h2 className="text[18px] font-semibold tracking-tight text-[#174a5f] mb-1">
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
                  value={activeQuestion.matchingDescription}
                  onChange={e =>
                    updateActiveQuestion(prev => ({
                      ...prev,
                      matchingDescription: e.target.value,
                    }))
                  }
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
                    {activeQuestion.columnA.map((item, index) => (
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
                          {activeQuestion.columnA.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                updateActiveQuestion(prev => ({
                                  ...prev,
                                  columnA: prev.columnA.filter(o => o.id !== item.id),
                                }))
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
                    {activeQuestion.columnB.map((item, index) => (
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
                          {activeQuestion.columnB.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                updateActiveQuestion(prev => ({
                                  ...prev,
                                  columnB: prev.columnB.filter(o => o.id !== item.id),
                                }))
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

          {/* Other question types (Short Answer, Essay/Writing, etc.) */}
          {activeQuestion.type !== "Question type" &&
            !["Multiple Choice", "True/False", "Fill in the Blanks", "Matching"].includes(
              activeQuestion.type,
            ) && (
              <div className="max-w-4xl space-y-6 pb-20">
                <div>
                  <h2 className="text-xl font-bold mb-2 text-[#174a5f]">
                    {activeQuestion.type} Question
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">Describe question briefly</p>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  {richTextToolbar}
                  <textarea
                    className="w-full p-6 border-0 resize-none focus:outline-none text-lg min-h-[120px] placeholder-gray-400 bg-white"
                    rows={6}
                    placeholder={`Enter your ${activeQuestion.type.toLowerCase()} question here...`}
                    value={activeQuestion.genericText}
                    onChange={e =>
                      updateActiveQuestion(prev => ({
                        ...prev,
                        genericText: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            )}
        </main>

        <ExerciseSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          exerciseName={exerciseName}
          setExerciseName={setExerciseName}
          totalMark={totalMark}
          setTotalMark={setTotalMark}
          timeGiven={timeGiven}
          setTimeGiven={setTimeGiven}
          takeWithFriend={takeWithFriend}
          setTakeWithFriend={setTakeWithFriend}
          visibility={visibility}
          setVisibility={setVisibility}
          onPublish={handlePublish}
        />
      </div>
    </div>
  )
}
