"use client"

import { useState } from "react"
import LeftNavigationBar from "../components/LeftNavigationBar"
import OfferTabs from "../components/OfferTabs"
import SearchBar from "../components/SearchBar"
import OffersTable from "../components/OffersTable"
import ApprovedTable from "../components/ApprovedTable"
import AmendmentTable from "../components/AmendmentTable"
import RejectedTable from "../components/RejectedTable"
import AddSchoolButton from "../components/AddSchoolButton"
import TopBar from "../components/TopBar"

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState("Requested")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const renderTable = () => {
    switch (activeTab) {
      case "Requested":
        return <OffersTable searchQuery={searchQuery} />
      case "Approved":
        return <ApprovedTable searchQuery={searchQuery} />
      case "Amendment":
        return <AmendmentTable searchQuery={searchQuery} />
      case "Rejected":
        return <RejectedTable searchQuery={searchQuery} />
      default:
        return <OffersTable searchQuery={searchQuery} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <LeftNavigationBar />
      <main className="ml-20 pt-8 pb-12 px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#151619]">My School / Offers</h1>
          <AddSchoolButton />
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <OfferTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex justify-end w-full max-w-2xl">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
        {renderTable()}
      </main>
    </div>
  )
}