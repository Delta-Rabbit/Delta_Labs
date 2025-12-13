"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const [tabs, setTabs] = useState([
    "All",
    "Departments",
    "Class",
    "Course",
    "Management Table",
    "Resource",
    "Students",
  ])
  const [editingTab, setEditingTab] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [deletingTab, setDeletingTab] = useState<string | null>(null)

  const handleDoubleClick = (tab: string) => {
    setEditingTab(tab)
    setEditValue(tab)
  }

  const handleRename = (oldName: string) => {
    if (editValue.trim() && editValue !== oldName) {
      const newTabs = tabs.map((t) => (t === oldName ? editValue.trim() : t))
      setTabs(newTabs)
      if (activeTab === oldName) {
        onTabChange(editValue.trim())
      }
    }
    setEditingTab(null)
  }

  const handleDeleteClick = (tab: string) => {
    setDeletingTab(tab)
  }

  const confirmDelete = () => {
    if (deletingTab) {
      const newTabs = tabs.filter((t) => t !== deletingTab)
      setTabs(newTabs)
      if (activeTab === deletingTab && newTabs.length > 0) {
        onTabChange(newTabs[0])
      }
      setDeletingTab(null)
    }
  }

  const cancelDelete = () => {
    setDeletingTab(null)
  }

  const handleAddTab = () => {
    const newTabName = `New Tab ${tabs.length + 1}`
    setTabs([...tabs, newTabName])
  }

  return (
    <>
      <div className="border-b border-[#d2d2d2] mb-12">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => !editingTab && onTabChange(tab)}
              onDoubleClick={() => handleDoubleClick(tab)}
              onMouseEnter={() => setHoveredTab(tab)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`pb-3 px-4 text-sm font-medium relative flex items-center gap-2 ${
                activeTab === tab ? "text-[#000000]" : "text-[#939090]"
              }`}
            >
              {editingTab === tab ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleRename(tab)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRename(tab)
                    if (e.key === "Escape") setEditingTab(null)
                  }}
                  autoFocus
                  className="bg-transparent border-b border-[#174a5f] outline-none text-sm font-medium w-32"
                />
              ) : (
                <>
                  <span>{tab}</span>
                  {hoveredTab === tab && (
                    <X
                      className="h-3 w-3 text-[#939090] hover:text-[#174a5f]"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClick(tab)
                      }}
                    />
                  )}
                </>
              )}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />}
            </button>
          ))}

          <button onClick={handleAddTab} className="p-2 text-[#939090] hover:text-[#174a5f] transition-colors">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {deletingTab && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(23, 74, 95, 0.25)" }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-[#000000] mb-4">Delete Tab?</h2>
            <p className="text-sm text-[#666666] mb-6">
              Are you sure you want to delete this tab? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-[#FF0000] text-white py-2 px-4 rounded hover:bg-[#CC0000] transition-colors font-medium"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="flex-1 bg-white border border-[#d2d2d2] text-[#000000] py-2 px-4 rounded hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
