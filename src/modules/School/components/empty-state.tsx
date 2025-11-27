import { Plus, X } from "lucide-react"
import { useState } from "react"

export function EmptyState() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="relative">
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

            <div className="absolute -right-4 top-1/2 -translate-y-1/2">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                <circle cx="20" cy="20" r="12" stroke="#cfcfcf" strokeWidth="3" fill="white" />
                <line x1="29" y1="29" x2="40" y2="40" stroke="#cfcfcf" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="absolute -left-8 top-0 w-20 h-20 rounded-full bg-[#dce5e9] opacity-40 blur-xl" />
        </div>

        <div className="text-center mb-6">
          <p className="text-[#5c5f62] font-medium mb-1">Nothing in the Root</p>
          <p className="text-[#939090] text-sm">Add Department</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-[#174a5f] hover:bg-[#174a5f]/90 text-white gap-2 px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#151619]">Create New Item</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[#625f68] hover:text-[#151619]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-[#625f68] mb-4">Modal content goes here...</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-[#dce5e9] text-[#151619] rounded-lg hover:bg-[#f8f9fa]"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-[#174a5f] text-white rounded-lg hover:bg-[#174a5f]/90"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}