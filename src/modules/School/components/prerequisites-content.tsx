"use client"

import { useRef } from "react"

export function PrerequisitesContent() {
  const editorRef = useRef<HTMLDivElement>(null)

  const execCommand = (command: string) => {
    document.execCommand(command, false)
    editorRef.current?.focus()
  }

  const copyToClipboard = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText
      navigator.clipboard.writeText(text)
    }
  }

  return (
    <div className="flex-1 p-6">
      {/* Header with title and Add Course button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#174a5f]">Prerequisites</h2>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.416 3.788C8.289 2.44 10.506 2 12 2c3.526 0 5.826 1.492 7.212 3.416C20.56 7.289 21 9.506 21 11v9a1 1 0 0 1-1.707.707L18 19.414L16.414 21a2 2 0 0 1-2.828 0L12 19.414L10.414 21a2 2 0 0 1-2.828 0L6 19.414l-1.293 1.293A1 1 0 0 1 3 20v-9c0-3.526 1.492-5.826 3.416-7.212zM7 10a2 2 0 1 1 4 0a2 2 0 0 1-4 0zm6 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0z"
                fill="#174A5F"
              />
            </svg>
          </div>
          <button className="px-4 py-2 bg-[#174a5f] text-white text-sm rounded-md hover:bg-[#0f3a4d] transition-colors">
            Add Course
          </button>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 bg-white">
          <button onClick={copyToClipboard} className="p-1.5 hover:bg-gray-100 rounded" title="Copy">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
          <button onClick={() => execCommand("undo")} className="p-1.5 hover:bg-gray-100 rounded" title="Undo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 7v6h6" />
              <path d="M3 13c0-4.97 4.03-9 9-9a9 9 0 0 1 6.36 2.64" />
            </svg>
          </button>
          <button onClick={() => execCommand("redo")} className="p-1.5 hover:bg-gray-100 rounded" title="Redo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 7v6h-6" />
              <path d="M21 13c0-4.97-4.03-9-9-9a9 9 0 0 0-6.36 2.64" />
            </svg>
          </button>

          <div className="w-px h-5 bg-gray-300 mx-2" />

          <button className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded text-sm text-gray-700">
            Normal text
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <div className="w-px h-5 bg-gray-300 mx-2" />

          <button className="flex items-center gap-1 p-1.5 hover:bg-gray-100 rounded">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <div className="w-px h-5 bg-gray-300 mx-2" />

          <button
            onClick={() => execCommand("bold")}
            className="p-1.5 hover:bg-gray-100 rounded font-bold text-sm"
            title="Bold"
          >
            B
          </button>
          <button
            onClick={() => execCommand("italic")}
            className="p-1.5 hover:bg-gray-100 rounded italic text-sm"
            title="Italic"
          >
            I
          </button>
          <button
            onClick={() => execCommand("underline")}
            className="p-1.5 hover:bg-gray-100 rounded underline text-sm"
            title="Underline"
          >
            U
          </button>

          <div className="w-px h-5 bg-gray-300 mx-2" />

          <button
            onClick={() => execCommand("insertUnorderedList")}
            className="p-1.5 hover:bg-gray-100 rounded"
            title="Bullet List"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="4" cy="6" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="4" cy="18" r="1" fill="currentColor" />
              <path d="M8 6h13M8 12h13M8 18h13" />
            </svg>
          </button>
          <button
            onClick={() => execCommand("insertOrderedList")}
            className="p-1.5 hover:bg-gray-100 rounded"
            title="Numbered List"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h1v4M4 10h2M4 14h2l-2 2h2M4 20h2l-1-1" />
              <path d="M10 6h11M10 12h11M10 18h11" />
            </svg>
          </button>
        </div>

        <div
          ref={editorRef}
          contentEditable
          className="w-full h-64 p-4 text-black focus:outline-none overflow-y-auto"
          data-placeholder="Write your prerequisites"
          suppressContentEditableWarning
          style={{
            minHeight: "16rem",
          }}
          onFocus={(e) => {
            if (e.currentTarget.innerText.trim() === "") {
              e.currentTarget.classList.add("empty")
            }
          }}
          onBlur={(e) => {
            if (e.currentTarget.innerText.trim() === "") {
              e.currentTarget.classList.remove("empty")
            }
          }}
        />
      </div>
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}
