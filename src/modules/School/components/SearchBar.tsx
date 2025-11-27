"use client"

import { Search } from "lucide-react"
import { useState } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search for school..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="w-full h-12 pl-4 pr-12 rounded-[2rem] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#174a5f] focus:border-transparent"
      />
      <button 
        onClick={handleSearch}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Search className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  )
}

export default SearchBar