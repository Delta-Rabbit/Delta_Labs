import SchoolTopBar from "../components/TopBar"
import LeftNavigationBar from "../components/LeftNavigationBar"
import AddSchoolButton from "../components/AddSchoolButton"
import AnalysisCard from "../components/AnalysisCard"
import SchoolCard from "../components/SchoolCard"
import { Building2, GraduationCap, Users, UserCheck, Search } from "lucide-react"
import { useState } from "react"

export default function MySchool() {
  const [searchQuery, setSearchQuery] = useState("")

  const allSchools = [
    {
      name: "Addis Ababa University",
      location: "Addis Ababa, Ethiopia",
      type: "Partnership",
    },
    {
      name: "Jimma University",
      location: "Jimma, Ethiopia",
      type: "Partnership",
    },
    {
      name: "Hawassa University",
      location: "Hawassa, Ethiopia",
      type: "Partnership",
    },
    {
      name: "Bahir Dar University",
      location: "Bahir Dar, Ethiopia",
      type: "Partnership",
    },
    {
      name: "Mekelle University",
      location: "Mekelle, Ethiopia",
      type: "Partnership",
    },
    {
      name: "Arba Minch University",
      location: "Arba Minch, Ethiopia",
      type: "Partnership",
    },
  ]

  const filteredSchools = allSchools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="min-h-screen bg-white">
      <SchoolTopBar />
      <LeftNavigationBar />
      <main className="ml-20 pt-8 pb-12 px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#151619]">My School</h1>
          <AddSchoolButton />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnalysisCard value={filteredSchools.length} label="My Schools" icon={Building2} bgColor="#e9f9ff" />
          <AnalysisCard value={62} label="Total Classes" icon={GraduationCap} bgColor="#f4d9ff" iconColor="#9b59b6" />
          <AnalysisCard value={62} label="Total Students" icon={Users} bgColor="#fff8da" iconColor="#f1c40f" />
          <AnalysisCard value={62} label="Total Teachers" icon={UserCheck} bgColor="#ffe0dd" iconColor="#e74c3c" />
        </div>
        <div className="mb-8 flex justify-end">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search for school..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-4 pr-12 py-3.5 bg-white border border-[#dce5e9] rounded-full text-[#151619] placeholder:text-[#625f68] focus:outline-none focus:ring-2 focus:ring-[#174a5f] focus:border-transparent shadow-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
              <Search className="w-5 h-5 text-[#625f68]" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school, index) => (
            <SchoolCard key={index} name={school.name} location={school.location} type={school.type} />
          ))}
        </div>
        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#625f68] text-lg">No schools found matching "{searchQuery}"</p>
          </div>
        )}
      </main>
    </div>
  )
}