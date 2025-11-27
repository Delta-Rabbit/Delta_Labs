"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Download, Edit, Trash2 } from "lucide-react"

interface OfferData {
  id: number
  schoolName: string
  date: string
  detail: string
  approve: string
  amendment: string
  rejected: string
}

const mockData: OfferData[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  schoolName: `Saint Joseph School ${i + 1}`,
  date: `1/${30 + i}/2025`,
  detail: "Detail",
  approve: "Approve",
  amendment: "Amendment",
  rejected: "Reject",
}))

interface OffersTableProps {
  searchQuery?: string
}

function OffersTable({ searchQuery = "" }: OffersTableProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [data, setData] = useState<OfferData[]>(mockData)
  const [editingRow, setEditingRow] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ schoolName: "", date: "" })

  const filteredData = data.filter(row =>
    row.schoolName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    setSelectedRows([])
  }, [searchQuery])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const toggleRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
    if (editingRow === id) {
      setEditingRow(null)
      setEditForm({ schoolName: "", date: "" })
    }
  }

  const toggleAll = () => {
    setSelectedRows(selectedRows.length === filteredData.length ? [] : filteredData.map(row => row.id))

    setEditingRow(null)
    setEditForm({ schoolName: "", date: "" })
  }

  const isAllSelected = selectedRows.length === filteredData.length && filteredData.length > 0

  const handleDownload = () => {
    const selectedData = filteredData.filter(row => selectedRows.includes(row.id))
    
    const jsonData = JSON.stringify(selectedData, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement("a")
    link.href = url
    link.download = "selected_schools.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const rowToEdit = filteredData.find(row => row.id === selectedRows[0])
      if (rowToEdit) {
        setEditingRow(rowToEdit.id)
        setEditForm({
          schoolName: rowToEdit.schoolName,
          date: rowToEdit.date
        })
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && editingRow) {
      setData(prevData =>
        prevData.map(row =>
          row.id === editingRow
            ? { ...row, schoolName: editForm.schoolName, date: editForm.date }
            : row
        )
      )
      setEditingRow(null)
      setEditForm({ schoolName: "", date: "" })
    } else if (e.key === 'Escape') {
      setEditingRow(null)
      setEditForm({ schoolName: "", date: "" })
    }
  }

  const handleDelete = () => {
    setData(prevData => prevData.filter(row => !selectedRows.includes(row.id)))
    setSelectedRows([])
    setEditingRow(null)
    setEditForm({ schoolName: "", date: "" })
  }

  return (
    <div className="w-full">
      {selectedRows.length > 0 && (
        <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              {selectedRows.length} {selectedRows.length === 1 ? 'item' : 'items'} selected
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#174a5f] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download</span>
            </button>
            
            <button 
              onClick={handleEdit}
              disabled={selectedRows.length !== 1 || editingRow !== null}
              className={`flex items-center gap-2 px-3 py-2 transition-colors ${
                selectedRows.length === 1 && editingRow === null
                  ? 'text-gray-700 hover:text-[#174a5f]' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <Edit className="w-4 h-4" />
              <span className="text-sm font-medium">Edit</span>
            </button>
            
            <button 
              onClick={handleDelete}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Delete</span>
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="flex">
          <div className="sticky left-0 z-20 bg-white">
            <table className="border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left w-16 border-b border-r border-gray-300 h-[57px]">
                    <div 
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                        isAllSelected 
                          ? 'bg-[#174a5f] border-[#174a5f]' 
                          : 'bg-white border-gray-300'
                      }`}
                      onClick={toggleAll}
                    >
                      {isAllSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => {
                  const isChecked = selectedRows.includes(row.id)
                  const isEditing = editingRow === row.id
                  
                  return (
                    <tr key={row.id} className="border-b border-gray-200">
                      <td className="p-3 bg-gray-100 w-16 border-r border-gray-300 h-[57px]">
                        <div 
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                            isChecked 
                              ? 'bg-[#174a5f] border-[#174a5f]' 
                              : 'bg-white border-gray-300'
                          }`}
                          onClick={() => toggleRow(row.id)}
                        >
                          {isChecked && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-x-auto cursor-grab active:cursor-grabbing z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <table className="border-collapse min-w-[1200px] select-none">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left text-sm font-semibold text-[#174a5f] min-w-[250px] h-[57px]">School Name</th>
                  <th className="p-3 text-left text-sm font-semibold text-[#174a5f] min-w-[150px] h-[57px]">Date</th>
                  <th className="p-3 text-left text-sm font-semibold text-[#174a5f] min-w-[200px] h-[57px]">Detail</th>
                  <th className="p-3 text-left text-sm font-semibold text-[#174a5f] min-w-[200px] h-[57px]">Approve</th>
                  <th className="p-3 text-left text-sm font-semibold text-[#174a5f] min-w-[200px] h-[57px]">Amendment</th>
                  <th className="p-3 text-left text-sm font-semibold text-[#174a5f] min-w-[200px] h-[57px]">Rejected</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => {
                  const isEditing = editingRow === row.id
                  
                  return (
                    <tr key={row.id} className="border-b border-gray-200">
                      <td className="p-3 bg-gray-100 min-w-[250px] h-[57px]">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.schoolName}
                            onChange={(e) => setEditForm(prev => ({ ...prev, schoolName: e.target.value }))}
                            onKeyDown={handleKeyPress}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#174a5f]"
                            autoFocus
                          />
                        ) : (
                          <span className="text-sm text-[#174a5f]">{row.schoolName}</span>
                        )}
                      </td>
                      
                      <td className="p-3 bg-gray-100 min-w-[150px] h-[57px]">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.date}
                            onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                            onKeyDown={handleKeyPress}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#174a5f]"
                          />
                        ) : (
                          <span className="text-sm text-gray-700">{row.date}</span>
                        )}
                      </td>
                      
                      <td className="p-3 bg-[#b0d2e1] text-sm text-gray-700 min-w-[200px] h-[57px]">{row.detail}</td>
                      <td className="p-3 bg-[#b4e1b0] text-sm text-gray-700 min-w-[200px] h-[57px]">{row.approve}</td>
                      <td className="p-3 bg-[#c0b0e1] text-sm text-gray-700 min-w-[200px] h-[57px]">{row.amendment}</td>
                      <td className="p-3 bg-[#e1b0b0] text-sm text-gray-700 min-w-[200px] h-[57px]">{row.rejected}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OffersTable