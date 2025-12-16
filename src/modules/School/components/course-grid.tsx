"use client"

import { CourseCard, type Course } from "./course-card"

interface CourseGridProps {
  courses: Course[]
  onGoToCourse?: (course: Course) => void
}

export function CourseGrid({ courses, onGoToCourse }: CourseGridProps) {
  return (
    <div className="flex flex-wrap gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onGoToCourse={onGoToCourse} />
      ))}
    </div>
  )
}
