"use client"

import { useEffect, useState } from "react"
import { TopNavigation } from "../components/top-navigation"
import { ActionToolbar } from "../components/action-toolbar"
import { DepartmentHeader } from "../components/department-header"
import { TabNavigation } from "../components/tab-navigation"
import { EmptyState } from "../components/empty-state"
import { NewItemModal } from "../components/new-item-modal"
import { CourseCard } from "../components/course-card"
import type { Course } from "../components/course-card"
import { CourseDetailPage } from "./Course-detail-page"

export default function RootDepartmentPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("departments")
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Add a new course
  const handleAddCourse = (course: Course) => {
    setCourses(prev => [...prev, course])
    setActiveTab("courses") // teleport to Courses tab
    setModalOpen(false)
  }

  // Select a course to view details
  const handleGoToCourse = (course: Course) => {
    setSelectedCourse(course)
  }

  // Back handler from CourseDetailPage
  const handleBack = () => setSelectedCourse(null)

  // Render CourseDetailPage if a course is selected
  if (selectedCourse) {
    return <CourseDetailPage course={selectedCourse} onBack={handleBack} />
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNavigation />

      <div className="pl-12 pr-8 py-4">
        {/* Toolbar */}
        <div className="mb-4">
          <ActionToolbar onNewClick={() => setModalOpen(true)} />
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 pl-6">
            <DepartmentHeader />

            {/* Tabs */}
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            {activeTab === "courses" ? (
              courses.length === 0 ? (
                <EmptyState onNewClick={() => setModalOpen(true)} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {courses.map(course => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onGoToCourse={handleGoToCourse}
                    />
                  ))}
                </div>
              )
            ) : (
              <EmptyState onNewClick={() => setModalOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* New Item Modal */}
      <NewItemModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAddCourse={handleAddCourse}
      />
    </div>
  )
}