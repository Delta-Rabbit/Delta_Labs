"use client"

import { useState, useRef, useEffect } from "react"
import { TopNavigation } from "../components/top-navigation"
import { CourseHeader } from "../components/course-header"
import { CourseBottomBar } from "../components/course-bottom-bar"
import { VideoPlayerUI } from "../components/video-player-ui"
import { ContentTitleCard } from "../components/content-title-card"
import { AboutCourseContent } from "../components/about-course-content"
import { RelatedCoursesContent } from "../components/related-courses-content"
import { ReviewsRatingContent } from "../components/reviews-rating-content"
import { PrerequisitesContent } from "../components/prerequisites-content"
import { CourseAnalysisContent } from "../components/course-analysis-content"
import { ManagementTableView } from "../components/management-table-view"
import { QAContent } from "../components/qa-content"
import { ExerciseTestContent } from "../components/exercise-test-content"
import { X, Plus } from "lucide-react"

interface Course {
  id: string
  title: string
  code: string
  description: string
}

interface CourseDetailPageProps {
  course: Course
  onBack: () => void
}

export function CourseDetailPage({ course, onBack }: CourseDetailPageProps) {
  const [activeHeaderTab, setActiveHeaderTab] = useState("intro")
  const [activeSection, setActiveSection] = useState("course-intro")
  const [viewMode, setViewMode] = useState<"direct" | "management">("direct")
  const [editingTab, setEditingTab] = useState<string | null>(null)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [mainVideo, setMainVideo] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [tabToDelete, setTabToDelete] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [tabs, setTabs] = useState([
    { id: "intro", label: "Intro" },
    { id: "about", label: "About Course" },
    { id: "related", label: "Related Courses" },
    { id: "reviews", label: "Reviews & Rating" },
    { id: "prerequisites", label: "Prerequisites & Requirements" },
    { id: "analysis", label: "Course Analysis" },
  ])

  const [addButtons, setAddButtons] = useState([{ id: Date.now(), video: null as string | null }])

  const handleUpload = (index: number, file: File) => {
    const url = URL.createObjectURL(file)
    setAddButtons((prev) => {
      const copy = [...prev]
      copy[index].video = url
      return copy
    })
  }

  const handleDuplicate = () => {
    setAddButtons((prev) => [...prev, { id: Date.now() + Math.random(), video: null }])
  }

  useEffect(() => {
    if (editingTab && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingTab])

  const handleAddTab = () => {
    const newId = `tab-${Date.now()}`
    const newTab = { id: newId, label: "New Tab" }
    setTabs((prev) => [...prev, newTab])
    setActiveHeaderTab(newId)
    setEditingTab(newId)
  }

  const handleDeleteTab = (tabId: string) => {
    if (tabs.length <= 1) return
    setTabToDelete(tabId)
    setDeleteModalOpen(true)
  }

  const handleRenameTab = (tabId: string, newLabel: string) => {
    setTabs((prev) => prev.map((t) => (t.id === tabId ? { ...t, label: newLabel } : t)))
  }

  const confirmDelete = () => {
    if (tabToDelete) {
      const newTabs = tabs.filter((t) => t.id !== tabToDelete)
      setTabs(newTabs)
      if (activeHeaderTab === tabToDelete) setActiveHeaderTab(newTabs[0].id)
    }
    setDeleteModalOpen(false)
    setTabToDelete(null)
  }

  const cancelDelete = () => {
    setDeleteModalOpen(false)
    setTabToDelete(null)
  }

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "about":
        return (
          <div className="flex justify-center overflow-y-auto max-h-[calc(100vh-200px)] pb-20">
            <div className="w-full max-w-4xl px-6">
              <AboutCourseContent />
            </div>
          </div>
        )
      case "related":
        return (
          <div className="flex justify-center items-center overflow-y-auto max-h-[calc(100vh-200px)] pb-20">
            <RelatedCoursesContent />
          </div>
        )
      case "reviews":
        return (
          <div className="overflow-y-auto max-h-[calc(100vh-200px)] pb-20 scrollbar-hide">
            <ReviewsRatingContent />
          </div>
        )
      case "prerequisites":
        return (
          <div className="overflow-y-auto max-h-[calc(100vh-200px)] pb-20 scrollbar-hide">
            <PrerequisitesContent />
          </div>
        )
      case "analysis":
        return (
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] pb-32 scrollbar-hide">
            <CourseAnalysisContent />
          </div>
        )
      case "intro":
      default:
        return (
          <div className="flex-1 p-6 flex gap-6 items-start justify-start overflow-y-auto max-h-[calc(100vh-200px)] pb-32">
            <div className="flex flex-col gap-4 flex-1">
              <VideoPlayerUI videoSrc={mainVideo} />

              <div className="flex gap-3">
                {addButtons.map((btn, index) => {
                  const isLast = index === addButtons.length - 1
                  return (
                    <div key={btn.id}>
                      {isLast ? (
                        <button
                          onClick={handleDuplicate}
                          className="w-[125px] h-[95px] rounded-lg border border-[#D9D9D9] bg-white flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-10 h-10 text-[#174A5F]" />
                        </button>
                      ) : (
                        <label className="w-[125px] h-[95px] rounded-lg border border-[#D9D9D9] bg-white flex items-center justify-center cursor-pointer overflow-hidden">
                          {btn.video ? (
                            <video
                              src={btn.video}
                              controls
                              className="w-full h-full object-cover rounded"
                              onClick={(e) => {
                                e.preventDefault()
                                setMainVideo(btn.video)
                              }}
                            />
                          ) : (
                            <div className="text-[#174A5F] text-sm">Upload</div>
                          )}
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => e.target.files && handleUpload(index, e.target.files[0])}
                          />
                        </label>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <ContentTitleCard />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNavigation />
      <CourseHeader title={course.title} onBack={onBack} />

      {activeSection === "course-intro" && (
        <div className="flex items-center px-6 py-3 ">
          <button
            onClick={() => setViewMode("direct")}
            className={`px-4 py-2 text-sm rounded transition-colors ${
              viewMode === "direct" ? "bg-[#dce5e9] text-[#174a5f]" : "text-gray-600"
            }`}
          >
            Direct View
          </button>
          <span className="text-gray-400 px-2">|</span>
          <button
            onClick={() => setViewMode("management")}
            className={`px-4 py-2 text-sm rounded transition-colors ${
              viewMode === "management" ? "bg-[#dce5e9] text-[#174a5f]" : "text-gray-600"
            }`}
          >
            Management Table
          </button>
        </div>
      )}

      {activeSection === "course-intro" && viewMode === "direct" && (
        <div className="flex items-center px-6 justify-between pr-12">
          {tabs.map((tab) =>
            editingTab === tab.id ? (
              <input
                key={tab.id}
                ref={inputRef}
                type="text"
                value={tab.label}
                onChange={(e) => handleRenameTab(tab.id, e.target.value)}
                onBlur={() => setEditingTab(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Escape") setEditingTab(null)
                }}
                className="bg-transparent border-b border-[#174a5f] outline-none text-sm font-bold w-32"
              />
            ) : (
              <button
                key={tab.id}
                onClick={() => setActiveHeaderTab(tab.id)}
                onDoubleClick={() => setEditingTab(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`py-3 text-sm font-bold relative ${
                  activeHeaderTab === tab.id ? "text-[#174a5f]" : "text-gray-500"
                }`}
              >
                {tab.label}
                {activeHeaderTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />}
                {hoveredTab === tab.id && (
                  <button onClick={() => handleDeleteTab(tab.id)} className="ml-1 text-gray-400">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </button>
            ),
          )}

          <button onClick={handleAddTab} className="py-3 text-gray-400 flex items-center">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      {activeSection === "course-intro" ? (
        viewMode === "management" ? (
          <ManagementTableView />
        ) : (
          renderTabContent(activeHeaderTab)
        )
      ) : activeSection === "qa" ? (
        <QAContent />
      ) : activeSection === "exercise-test" ? (
        <ExerciseTestContent />
      ) : (
        <div className="flex-1 bg-white" />
      )}

      <CourseBottomBar activeSection={activeSection} onSectionChange={setActiveSection} />

      {deleteModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(23, 74, 95, 0.25)" }}
        >
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Delete Tab?</h2>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to delete this tab? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
