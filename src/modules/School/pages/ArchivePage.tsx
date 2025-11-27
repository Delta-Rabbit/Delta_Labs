import SchoolTopBar from "../components/TopBar"
import LeftNavigationBar from "../components/LeftNavigationBar"

export default function ArchivePage() {
  const archivedSchools = [
    {
      id: 1,
      name: "Saint Joseph School",
      location: "Addis Ababa, Ethiopia",
      type: "Partnership",
    },
    {
      id: 2,
      name: "Addis Ababa University",
      location: "Addis Ababa, Ethiopia",
      type: "Public",
    },
    {
      id: 3,
      name: "Jimma University",
      location: "Jimma, Ethiopia",
      type: "Public",
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <SchoolTopBar />
      <LeftNavigationBar />
      
      <main className="ml-20 pt-8 pb-12 px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#151619]">Archived</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archivedSchools.map((school) => (
            <ArchivedSchoolCard
              key={school.id}
              name={school.name}
              location={school.location}
              type={school.type}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

function ArchivedSchoolCard({ name, location, type }: { name: string; location: string; type: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dce5e9]">
      <div className="flex justify-center mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-white shadow-md">
          <img 
            src="/assets/images/SchoolLogo.png" 
            alt={`${name} logo`} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#151619] flex-1">{name}</h3>
        <button className="px-4 py-1.5 bg-[#e6eaf5] text-[#151619] text-sm font-medium rounded-lg">
          Details
        </button>
      </div>
      <div className="flex items-center gap-4 text-sm text-[#625f68]">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          <span>{type}</span>
        </div>
      </div>
      <div className="h-12 mt-6"></div>
    </div>
  )
}

import { MapPin, Users } from "lucide-react"