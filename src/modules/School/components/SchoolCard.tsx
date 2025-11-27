"use client"

import { MapPin, Users, ExternalLink } from "lucide-react"
import { useNavigation } from "../components/NavigationContext"

interface SchoolCardProps {
  name: string
  location: string
  type: string
  logoUrl?: string
}

export default function SchoolCard({
  name,
  location,
  type,
  logoUrl = "/assets/images/SchoolLogo.png",
}: SchoolCardProps) {
  const { setCurrentPage } = useNavigation()

  const handleGoToSchool = () => {
    setCurrentPage('root-department')
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dce5e9]">
      <div className="flex justify-center mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-white shadow-md">
          <img src={logoUrl} alt={`${name} logo`} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#151619] flex-1">{name}</h3>
        <button className="px-4 py-1.5 bg-[#e6eaf5] text-[#151619] text-sm font-medium rounded-lg">
          Details
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6 text-sm text-[#625f68]">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          <span>{type}</span>
        </div>
      </div>

      <button 
        onClick={handleGoToSchool}
        className="w-full bg-[#174a5f] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 shadow-md"
      >
        <ExternalLink className="w-4 h-4" />
        <span>Go to School</span>
      </button>
    </div>
  )
}