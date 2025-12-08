// src/modules/School/components/empty-state.tsx
"use client"

import { Plus } from "lucide-react"

interface EmptyStateProps {
  onNewClick?: () => void
}

export function EmptyState({ onNewClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Decorative SVG */}
      <div className="relative mb-6">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-[#d2d2d2]">
          <rect x="30" y="45" width="50" height="12" rx="2" fill="currentColor" opacity="0.3" />
          <circle cx="35" cy="49" r="1.5" fill="#939090" />
          <circle cx="40" cy="49" r="1.5" fill="#939090" />
          <circle cx="45" cy="49" r="1.5" fill="#939090" />

          <rect x="30" y="60" width="50" height="12" rx="2" fill="currentColor" opacity="0.3" />
          <circle cx="35" cy="64" r="1.5" fill="#939090" />
          <circle cx="40" cy="64" r="1.5" fill="#939090" />
          <circle cx="45" cy="64" r="1.5" fill="#939090" />

          <rect x="30" y="75" width="50" height="12" rx="2" fill="currentColor" opacity="0.3" />
          <circle cx="35" cy="79" r="1.5" fill="#939090" />
          <circle cx="40" cy="79" r="1.5" fill="#939090" />
          <circle cx="45" cy="79" r="1.5" fill="#939090" />
        </svg>

        <div className="absolute -left-8 top-0 w-20 h-20 rounded-full bg-[#dce5e9] opacity-40 blur-xl" />
      </div>

      {/* Text */}
      <div className="text-center mb-6">
        <p className="text-[#5c5f62] font-medium mb-1">Nothing in the Root</p>
        <p className="text-[#939090] text-sm">Add Department</p>
      </div>

      {/* New Button triggers page-level modal */}
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
