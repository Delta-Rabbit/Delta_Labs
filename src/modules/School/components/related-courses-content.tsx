"use client"

import { useState } from "react"
import { LearningCourseCard } from "./LearningCourseCard"

export function RelatedCoursesContent() {
  const [showModal, setShowModal] = useState(false)
  const [selectedCourses, setSelectedCourses] = useState<Set<number>>(new Set())
  const [addedCourses, setAddedCourses] = useState<number[]>([])
  const [checkedAddedCourses, setCheckedAddedCourses] = useState<Set<number>>(new Set())

  const handleToggleCourse = (index: number) => {
    setSelectedCourses((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleToggleAddedCourse = (index: number) => {
    setCheckedAddedCourses((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleAddCourses = () => {
    setAddedCourses(Array.from(selectedCourses))
    setShowModal(false)
    setSelectedCourses(new Set())
  }

  return (
    <>
      {addedCourses.length > 0 ? (
        <div className="flex-1 flex flex-col">
          <div className="flex justify-end items-center gap-3 px-8 pt-8 pb-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#174a5f] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#123d4f] transition-colors"
            >
              Search Related Course
            </button>

            <div className="w-10 h-10 rounded-full bg-[#1C274C] flex items-center justify-center">
              <svg width="20" height="22" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 27.243V15.833C15 7.089 21.716 0 30 0C38.284 0 45 7.089 45 15.833V27.243C45 29.275 42.974 30.597 41.251 29.688C39.859 28.953 38.201 29.062 36.906 29.974C35.449 30.999 33.551 30.999 32.094 29.974L31.565 29.602C30.617 28.934 29.383 28.934 28.435 29.602L27.906 29.974C26.449 30.999 24.551 30.999 23.094 29.974C21.799 29.062 20.141 28.953 18.749 29.688C17.027 30.597 15 29.275 15 27.243ZM36 13.458C36 14.77 35.328 15.833 34.5 15.833C33.672 15.833 33 14.77 33 13.458C33 12.147 33.672 11.083 34.5 11.083C35.328 11.083 36 12.147 36 13.458ZM25.5 15.833C26.328 15.833 27 14.77 27 13.458C27 12.147 26.328 11.083 25.5 11.083C24.672 11.083 24 12.147 24 13.458C24 14.77 24.672 15.833 25.5 15.833Z"
                  fill="white"
                  transform="translate(-15, 0)"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1 px-8 pb-8 overflow-y-auto">
            <div className="grid grid-cols-4 gap-6">
              {addedCourses.map((courseIndex) => (
                <div key={courseIndex}>
                  <LearningCourseCard
                    showCheckbox={true}
                    isSelected={checkedAddedCourses.has(courseIndex)}
                    onToggle={() => handleToggleAddedCourse(courseIndex)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="mb-6">
            <svg width="150" height="120" viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="35" y="25" width="70" height="80" rx="4" fill="#F2F2F2" stroke="#BABABA" strokeWidth="1" />
              <rect x="40" y="20" width="70" height="80" rx="4" fill="white" stroke="#BABABA" strokeWidth="1" />
              <rect x="45" y="15" width="70" height="80" rx="4" fill="white" stroke="#BABABA" strokeWidth="1" />
              <circle cx="53" cy="30" r="2" fill="#D2D2D2" />
              <line x1="60" y1="30" x2="105" y2="30" stroke="#D2D2D2" strokeWidth="2" strokeLinecap="round" />
              <circle cx="53" cy="42" r="2" fill="#D2D2D2" />
              <line x1="60" y1="42" x2="105" y2="42" stroke="#D2D2D2" strokeWidth="2" strokeLinecap="round" />
              <circle cx="53" cy="54" r="2" fill="#D2D2D2" />
              <line x1="60" y1="54" x2="105" y2="54" stroke="#D2D2D2" strokeWidth="2" strokeLinecap="round" />
              <circle cx="110" cy="65" r="15" stroke="#BABABA" strokeWidth="2" fill="white" />
              <line x1="120" y1="76" x2="130" y2="86" stroke="#BABABA" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="30" cy="15" r="1.5" fill="#CFCFCF" />
              <circle cx="125" cy="25" r="1.5" fill="#CFCFCF" />
            </svg>
          </div>

          <p className="text-[#174a5f] text-base font-semibold mb-1">No Related Course</p>
          <p className="text-gray-400 text-sm mb-6">Add new related course</p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#174a5f] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#123d4f] transition-colors"
            >
              Search Related Course
            </button>

            <div className="w-10 h-10 rounded-full bg-[#1C274C] flex items-center justify-center">
              <svg width="20" height="22" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 27.243V15.833C15 7.089 21.716 0 30 0C38.284 0 45 7.089 45 15.833V27.243C45 29.275 42.974 30.597 41.251 29.688C39.859 28.953 38.201 29.062 36.906 29.974C35.449 30.999 33.551 30.999 32.094 29.974L31.565 29.602C30.617 28.934 29.383 28.934 28.435 29.602L27.906 29.974C26.449 30.999 24.551 30.999 23.094 29.974C21.799 29.062 20.141 28.953 18.749 29.688C17.027 30.597 15 29.275 15 27.243ZM36 13.458C36 14.77 35.328 15.833 34.5 15.833C33.672 15.833 33 14.77 33 13.458C33 12.147 33.672 11.083 34.5 11.083C35.328 11.083 36 12.147 36 13.458ZM25.5 15.833C26.328 15.833 27 14.77 27 13.458C27 12.147 26.328 11.083 25.5 11.083C24.672 11.083 24 12.147 24 13.458C24 14.77 24.672 15.833 25.5 15.833Z"
                  fill="white"
                  transform="translate(-15, 0)"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(23, 74, 95, 0.25)" }}
        >
          <div className="bg-white rounded-2xl w-[85%] max-w-3xl max-h-[75vh] overflow-hidden shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-5 pb-3 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#DCE5E9] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" rx="1" fill="#174A5F" />
                    <rect x="14" y="3" width="7" height="7" rx="1" fill="#174A5F" />
                    <rect x="3" y="14" width="7" height="7" rx="1" fill="#174A5F" />
                    <rect x="14" y="14" width="7" height="7" rx="1" fill="#174A5F" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-black">Related Course</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              <div className="mb-4 w-2/3 mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-5 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-gray-400"
                  />
                  <button className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pb-4">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div key={index}>
                    <LearningCourseCard
                      isSelected={selectedCourses.has(index)}
                      onToggle={() => handleToggleCourse(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 pt-3 border-t border-gray-200 flex-shrink-0 bg-white">
              <button
                onClick={() => setShowModal(false)}
                className="px-16 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                CANCEL
              </button>
              <button
                onClick={handleAddCourses}
                className="px-20 py-2.5 rounded-lg bg-[#174A5F] text-white font-semibold hover:bg-[#123d4f] transition-colors text-sm"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
