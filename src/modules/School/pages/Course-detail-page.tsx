"use client"

import { useState } from "react"
import { TopNavigation } from "../components/top-navigation"
import { CourseHeader } from "../components/course-header"
import { CourseBottomBar } from "../components/course-bottom-bar"
import { VideoPlayerUI } from "../components/video-player-ui"
import { ContentTitleCard } from "../components/content-title-card"
import { AddContentButton } from "../components/add-content-button"
import { AboutCourseContent } from "../components/about-course-content"
import { RelatedCoursesContent } from "../components/related-courses-content"
import { ReviewsRatingContent } from "../components/reviews-rating-content"
import { PrerequisitesContent } from "../components/prerequisites-content"
import { CourseAnalysisContent } from "../components/course-analysis-content"
import { ManagementTableView } from "../components/management-table-view"
import { QAContent } from "../components/qa-content"
import { ExerciseTestContent } from "../components/exercise-test-content"

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

  const headerTabs = [
    { id: "intro", label: "Intro" },
    { id: "about", label: "About Course" },
    { id: "related", label: "Related Courses" },
    { id: "reviews", label: "Reviews & Rating" },
    { id: "prerequisites", label: "Prerequisites & Requirements" },
    { id: "analysis", label: "Course Analysis" },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation Bar */}
      <TopNavigation />

      <CourseHeader title={course.title} breadcrumb="Workspace / Design / Mobile app" onBack={onBack} />

      {activeSection === "course-intro" && (
        <div className="border-b border-gray-200">
          {/* Direct View / Management Table toggle */}
          <div className="flex items-center gap-3 px-6 py-3">
            <button
              onClick={() => setViewMode("direct")}
              className={`px-4 py-2 text-sm rounded transition-colors ${
                viewMode === "direct" ? "bg-[#dce5e9] text-[#174a5f]" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Direct View
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => setViewMode("management")}
              className={`px-4 py-2 text-sm rounded transition-colors ${
                viewMode === "management" ? "bg-[#dce5e9] text-[#174a5f]" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Management Table
            </button>
          </div>

          {viewMode === "direct" && (
            <div className="flex items-center gap-8 px-6">
              {headerTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveHeaderTab(tab.id)}
                  className={`py-3 text-sm transition-colors relative whitespace-nowrap ${
                    activeHeaderTab === tab.id ? "text-[#174a5f] font-medium" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {activeHeaderTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />
                  )}
                </button>
              ))}
              <button className="py-3 text-gray-400 hover:text-gray-600 text-lg">+</button>
            </div>
          )}
        </div>
      )}

      {activeSection === "course-intro" ? (
        viewMode === "management" ? (
          <ManagementTableView />
        ) : activeHeaderTab === "about" ? (
          <div className="flex-1 flex justify-center overflow-y-auto max-h-[calc(100vh-200px)]">
            <AboutCourseContent />
          </div>
        ) : activeHeaderTab === "related" ? (
          <div className="flex-1 flex justify-center items-center overflow-y-auto max-h-[calc(100vh-200px)] pb-20">
            <RelatedCoursesContent />
          </div>
        ) : activeHeaderTab === "reviews" ? (
          <ReviewsRatingContent />
        ) : activeHeaderTab === "prerequisites" ? (
          <PrerequisitesContent />
        ) : activeHeaderTab === "analysis" ? (
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] pb-32 scrollbar-hide">
            <CourseAnalysisContent />
          </div>
        ) : (
          <div className="flex-1 p-6 flex gap-6 items-start justify-start overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide pb-32">
            <div className="flex flex-col gap-4">
              <VideoPlayerUI />
              <AddContentButton />
            </div>
            <ContentTitleCard />
          </div>
        )
      ) : activeSection === "qa" ? (
        <QAContent />
      ) : activeSection === "exercise-test" ? (
        <ExerciseTestContent />
      ) : (
        <div className="flex-1 bg-white" />
      )}

      {/* Bottom Navigation Bar */}
      <CourseBottomBar activeSection={activeSection} onSectionChange={setActiveSection} />
    </div>
  )
}
