"use client"

import { useState } from "react"
import { ContentOptionsModal } from "./content-options-modal"

function PlusGridIcon() {
  return (
    <img
      src="/assets/icons/start.svg"
      alt="Start"
      className="w-[66px] h-[45px]"
    />
  )
}

function CourseIntroIcon() {
  return (
    <img
      src="/assets/icons/coursei.svg"
      alt="Course Intro"
      className="w-8 h-8"
    />
  )
}

function QAIcon() {
  return (
    <img
      src="/assets/icons/QA.svg"
      alt="Q&A"
      className="w-8 h-8"
    />
  )
}

function ExerciseTestIcon() {
  return (
    <img
      src="/assets/icons/Ex.svg"
      alt="Exercise & Test"
      className="w-8 h-8"
    />
  )
}

function FastSummaryIcon() {
  return (
    <img
      src="/assets/icons/fast.svg"
      alt="Fast Summary"
      className="w-8 h-8"
    />
  )
}

function ScoreIcon() {
  return (
    <img
      src="/assets/icons/score.svg"
      alt="Score"
      className="w-8 h-8"
    />
  )
}

function SupplementIcon() {
  return (
    <img
      src="/assets/icons/supplement.svg"
      alt="Supplement"
      className="w-8 h-8"
    />
  )
}

function ResourcesIcon() {
  return (
    <img
      src="/assets/icons/resource.svg"
      alt="Resources"
      className="w-8 h-8"
    />
  )
}

function RoadmapIcon() {
  return (
    <img
      src="/assets/icons/roadmap.svg"
      alt="Roadmap"
      className="w-8 h-8"
    />
  )
}

function CommunicationIcon() {
  return (
    <img
      src="/assets/icons/comm.svg"
      alt="Communication"
      className="w-8 h-8"
    />
  )
}

interface CourseBottomBarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navItems = [
  { id: "course-intro", label: "Course Intro", icon: CourseIntroIcon },
  { id: "qa", label: "Q&A", icon: QAIcon },
  { id: "exercise-test", label: "Exercise & Test", icon: ExerciseTestIcon },
  { id: "fast-summary", label: "Fast Summary", icon: FastSummaryIcon },
  { id: "score", label: "Score", icon: ScoreIcon },
  { id: "supplement", label: "Supplement", icon: SupplementIcon },
  { id: "resources", label: "Resources", icon: ResourcesIcon },
  { id: "roadmap", label: "Roadmap", icon: RoadmapIcon },
  { id: "communication", label: "Communication", icon: CommunicationIcon },
]

export function CourseBottomBar({
  activeSection,
  onSectionChange,
}: CourseBottomBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-[#174a5f] py-2 px-4 rounded-t-3xl">
        <div className="flex items-center justify-between gap-2 max-w-[1400px] mx-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <PlusGridIcon />
          </button>

          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors w-[90px] ${
                  isActive ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <Icon />
                </div>
                <span className="text-white text-[11px] mt-1 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <ContentOptionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
