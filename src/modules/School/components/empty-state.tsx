"use client"

import { Plus } from "lucide-react"

interface EmptyStateProps {
  onNewClick?: () => void
}

export function EmptyState({ onNewClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <img
        src="/assets/images/EmptyState.png"
        alt="Empty state illustration"
       className="mb-6 w-full max-w-[140px] object-contain"
      />

      <button
        onClick={onNewClick}
        className="bg-[#174a5f] hover:bg-[#174a5f]/90 text-white gap-2 px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>New</span>
      </button>
    </div>
  )
}
