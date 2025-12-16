"use client"

import { useState } from "react"
import { TopNavigation } from "../components/top-navigation"
import { DepartmentHeader } from "../components/department-header"
import { TabNavigation } from "../components/tab-navigation"
import { EmptyState } from "../components/empty-state"
import { CourseGrid } from "../components/course-grid"
import { CourseDetailPage } from "./Course-detail-page"
import { ContentToolbar } from "../components/content-toolbar"
import { CourseListView } from "../components/course-list-view"
import { CreateCourseModal } from "../components/create-course-modal"
import { CourseToolbar } from "../components/CourseToolbar"
import { NewItemModal } from "../components/new-item-modal"
import type { Course } from "../components/course-card"

export default function DepartmentManagement() {
  const [activeTab, setActiveTab] = useState("All")
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isCreateOpen, setIsCreateOpen] = useState(false) // course modal state
  const [isNewItemOpen, setIsNewItemOpen] = useState(false) // new-item modal state

  const handleAddCourse = (course: Course) => {
    setCourses((prev) => [...prev, course])
    setActiveTab("Course")
  }

  const handleGoToCourse = (course: Course) => {
    setSelectedCourse(course)
  }

  const handleBackFromCourse = () => {
    setSelectedCourse(null)
  }

  if (selectedCourse) {
    return <CourseDetailPage course={selectedCourse} onBack={handleBackFromCourse} />
  }

  const renderContent = () => {
    if (activeTab === "Course") {
      if (courses.length > 0) {
        return (
          <>
            <ContentToolbar
              onAddCourse={() => setIsCreateOpen(true)}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            {viewMode === "grid" ? (
              <CourseGrid courses={courses} onGoToCourse={handleGoToCourse} />
            ) : (
              <CourseListView courses={courses} onGoToCourse={handleGoToCourse} />
            )}
          </>
        )
      }

      return <EmptyState onNewClick={() => setIsNewItemOpen(true)} />
    }

    if (activeTab === "All") {
      if (courses.length > 0) {
        return (
          <>
            <ContentToolbar
              onAddCourse={() => setIsCreateOpen(true)}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            {viewMode === "grid" ? (
              <CourseGrid courses={courses} onGoToCourse={handleGoToCourse} />
            ) : (
              <CourseListView courses={courses} onGoToCourse={handleGoToCourse} />
            )}
          </>
        )
      }
    }

    return <EmptyState onNewClick={() => setIsNewItemOpen(true)} />
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNavigation />

      {/* Top-right toolbar */}
      <div className="flex justify-end px-8 py-4">
        <CourseToolbar />
      </div>

      <div className="px-8 py-2">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-1">
            <DepartmentHeader />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            {renderContent()}
          </div>
        </div>
      </div>

      <CreateCourseModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onAddCourse={handleAddCourse}
      />

      <NewItemModal
        open={isNewItemOpen}
        onOpenChange={setIsNewItemOpen}
        onAddCourse={handleAddCourse} // ← FIX: pass the callback here
      />
    </div>
  )
}
