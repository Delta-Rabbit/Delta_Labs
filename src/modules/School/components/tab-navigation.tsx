import { useState, useRef, useEffect } from "react"
import { X, Plus } from "lucide-react"

export function TabNavigation() {
  const [activeTab, setActiveTab] = useState('departments')
  const [editingTab, setEditingTab] = useState<string | null>(null)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [tabNames, setTabNames] = useState({
    departments: 'Departments',
    courses: 'Courses',
    faculty: 'Faculty',
    students: 'Students',
    settings: 'Settings',
  })
  
  const inputRef = useRef<HTMLInputElement>(null)

  const [tabs, setTabs] = useState([
    { id: 'departments' },
    { id: 'courses' },
    { id: 'faculty' },
    { id: 'students' },
    { id: 'settings' },
  ])

  useEffect(() => {
    if (editingTab && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingTab])

  const generateId = () => {
    return `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const handleAddTab = () => {
    const newId = generateId()
    const newTab = { id: newId }
    
    setTabs(prev => [...prev, newTab])
    
    setTabNames(prev => ({
      ...prev,
      [newId]: 'New Tab'
    }))
    
    setActiveTab(newId)
    setEditingTab(newId)
  }

  const handleDoubleClick = (tabId: string) => {
    setEditingTab(tabId)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTabNames(prev => ({
      ...prev,
      [editingTab!]: e.target.value
    }))
  }

  const handleInputBlur = () => {
    setEditingTab(null)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditingTab(null)
    } else if (e.key === 'Escape') {
      setEditingTab(null)
    }
  }

  const handleDeleteTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (tabs.length <= 1) return
    
    setTabs(prev => prev.filter(tab => tab.id !== tabId))
    
    setTabNames(prev => {
      const newNames = { ...prev }
      delete newNames[tabId as keyof typeof newNames]
      return newNames
    })
    
    if (activeTab === tabId && tabs.length > 1) {
      const remainingTabs = tabs.filter(tab => tab.id !== tabId)
      setActiveTab(remainingTabs[0].id)
    }
  }

  return (
    <div className="flex mb-8 items-center">
      {tabs.map((tab) => (
        <div 
          key={tab.id} 
          className="relative group"
          onMouseEnter={() => setHoveredTab(tab.id)}
          onMouseLeave={() => setHoveredTab(null)}
        >
          {editingTab === tab.id ? (
            <input
              ref={inputRef}
              type="text"
              value={tabNames[tab.id as keyof typeof tabNames]}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              className="px-6 py-3 font-medium border-b-2 border-[#174a5f] text-[#174a5f] bg-transparent outline-none min-w-[120px]"
              style={{ caretColor: '#174a5f' }}
            />
          ) : (
            <button
              onClick={() => setActiveTab(tab.id)}
              onDoubleClick={() => handleDoubleClick(tab.id)}
              className={`px-6 py-3 font-medium border-b-2 transition-colors relative flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-[#174a5f] text-[#174a5f]'
                  : 'border-transparent text-[#625f68] hover:text-[#151619]'
              }`}
            >
              <span>{tabNames[tab.id as keyof typeof tabNames]}</span>
              
              {hoveredTab === tab.id && tabs.length > 1 && (
                <button
                  onClick={(e) => handleDeleteTab(tab.id, e)}
                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </button>
          )}
        </div>
      ))}
      
      <button
        onClick={handleAddTab}
        className="px-4 py-3 text-[#625f68] hover:text-[#174a5f] hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}