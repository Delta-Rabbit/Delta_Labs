"use client"

import { ChevronRight, Star } from "lucide-react"
import type { Course } from "./course-card"

interface CourseListViewProps {
  courses: Course[]
  onGoToCourse: (course: Course) => void
}

export function CourseListView({ courses, onGoToCourse }: CourseListViewProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[40px_1fr_2fr_200px] gap-4 bg-gray-50 border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
        <div></div>
        <div>Course Name</div>
        <div>Description</div>
        <div>Review</div>
      </div>

      {/* Table rows */}
      <div className="divide-y divide-gray-200">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => onGoToCourse(course)}
            className="grid grid-cols-[40px_1fr_2fr_200px] gap-4 w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors items-center"
          >
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-sm font-medium text-gray-900">{course.title}</div>
            <div className="text-sm text-gray-600 truncate">{course.description}</div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
