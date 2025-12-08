"use client"

import * as React from "react"
import { X } from "lucide-react"
import type { Course } from "./course-card"

interface CreateCourseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack?: () => void
  onAddCourse?: (course: Course) => void
}

export function CreateCourseModal({ open, onOpenChange, onAddCourse }: CreateCourseModalProps) {
  const [courseTitle, setCourseTitle] = React.useState("")
  const [courseCode, setCourseCode] = React.useState("")
  const [courseDescription, setCourseDescription] = React.useState("")

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onOpenChange])

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleSubmit = () => {
    if (!courseTitle.trim()) return

    const newCourse: Course = {
      id: Date.now().toString(),
      title: courseTitle,
      code: courseCode,
      description: courseDescription,
      rating: 4.8,
    }

    onAddCourse?.(newCourse)

    // Reset form
    setCourseTitle("")
    setCourseCode("")
    setCourseDescription("")

    onOpenChange(false)
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => onOpenChange(false)} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-course-title"
          className="bg-white rounded-lg shadow-xl w-full max-w-[420px] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 pb-4 flex items-center justify-between">
            <h2 id="create-course-title" className="text-xl font-semibold text-[#1a1a1a]">
              Create Course
            </h2>
            {/* Close Button */}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="px-6 pb-6">
            {/* Course Title Field */}
            <div className="mb-4">
              <label htmlFor="course-title" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Course Title
              </label>
              <input
                type="text"
                id="course-title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="title"
                className="w-full h-11 px-3 border border-gray-200 rounded-md bg-[#f8f9fa] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#174a5f]/20 focus:border-[#174a5f]"
              />
            </div>

            {/* Course Code Field */}
            <div className="mb-4">
              <label htmlFor="course-code" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Course Code
              </label>
              <input
                type="text"
                id="course-code"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="Code"
                className="w-full h-11 px-3 border border-gray-200 rounded-md bg-[#f8f9fa] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#174a5f]/20 focus:border-[#174a5f]"
              />
            </div>

            {/* Course Description Field */}
            <div className="mb-6">
              <label htmlFor="course-description" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Course Description
              </label>
              <textarea
                id="course-description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="description"
                rows={4}
                className="w-full px-3 py-3 border border-gray-200 rounded-md bg-[#f8f9fa] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#174a5f]/20 focus:border-[#174a5f] resize-none"
              />
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full h-12 bg-[#174a5f] hover:bg-[#174a5f]/90 text-white rounded-md font-medium text-sm uppercase tracking-wider transition-colors"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
