"use client"

import * as React from "react"
import { Folder, X } from "lucide-react"
import { CreateCourseModal } from "./create-course-modal"
import type { Course } from "./course-card"

interface NewItemModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCourse?: (course: Course) => void
}

function RadioButton({
  checked,
  onChange,
  id,
  label,
}: {
  checked: boolean
  onChange: () => void
  id: string
  label: string
}) {
  return (
    <div className="flex items-center space-x-3">
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        id={id}
        onClick={onChange}
        className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          checked ? "border-[#174a5f]" : "border-gray-300"
        }`}
      >
        {checked && <div className="h-3 w-3 rounded-full bg-[#174a5f]" />}
      </button>
      <label
        htmlFor={id}
        onClick={onChange}
        className="text-lg font-normal text-[#5c5f62] cursor-pointer select-none"
      >
        {label}
      </label>
    </div>
  )
}

export function NewItemModal({ open, onOpenChange, onAddCourse }: NewItemModalProps) {
  const [selectedType, setSelectedType] = React.useState<string>("")
  const [showCourseModal, setShowCourseModal] = React.useState(false)

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onOpenChange(false)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onOpenChange])

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleNext = () => {
    if (selectedType === "course") setShowCourseModal(true)
  }

  const handleCourseModalClose = (isOpen: boolean) => {
    setShowCourseModal(isOpen)
    if (!isOpen) {
      setSelectedType("")
      onOpenChange(false)
    }
  }

  const handleCourseAdded = (course: Course) => {
    onAddCourse?.(course)
    setSelectedType("")
    setShowCourseModal(false)
    onOpenChange(false)
  }

  if (!open) return null
  if (showCourseModal)
    return <CreateCourseModal open={showCourseModal} onOpenChange={handleCourseModalClose} onAddCourse={handleCourseAdded} />

  const leftColumnOptions = [
    { id: "folder", label: "Folder" },
    { id: "class", label: "Class" },
    { id: "management-table", label: "Management Table" },
    { id: "student", label: "Student" },
  ]

  const rightColumnOptions = [
    { id: "department", label: "Department" },
    { id: "course", label: "Course" },
    { id: "resource", label: "Resource" },
    { id: "service", label: "Service" },
    { id: "staff", label: "Staff" },
  ]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => onOpenChange(false)} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="bg-white rounded-lg shadow-xl w-full max-w-[550px] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Folder icon with transparent blue background */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174a5f80] border-2 border-[#174a5f] shrink-0">
                <Folder className="h-6 w-6 text-white" />
              </div>
              <h2 id="modal-title" className="text-xl font-bold text-[#174a5f]">
                New
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Options */}
          <div className="px-6 pb-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6" role="radiogroup">
              <div className="flex flex-col space-y-6">
                {leftColumnOptions.map((option) => (
                  <RadioButton
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    checked={selectedType === option.id}
                    onChange={() => setSelectedType(option.id)}
                  />
                ))}
              </div>
              <div className="flex flex-col space-y-6">
                {rightColumnOptions.map((option) => (
                  <RadioButton
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    checked={selectedType === option.id}
                    onChange={() => setSelectedType(option.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0 flex gap-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 text-[#174a5f] border-2 border-[#174a5f] bg-white hover:bg-[#174a5f]/5 rounded-md font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedType}
              className="flex-1 h-12 bg-[#174a5f] hover:bg-[#174a5f]/90 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
