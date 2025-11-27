"use client"

import { useState } from "react"
import LeftNavigationBar from "../components/LeftNavigationBar"
import SchoolBuyAndSellTabs from "../components/SchoolBuyAndSellTabs"
import SearchBar from "../components/SearchBar"
import CommunitySchoolCard from "../components/CommunitySchoolCard"
import MyBidsCard from "../components/MyBidsCard"
import MyListingsCard from "../components/MyListingsCard"
import AddSchoolButton from "../components/AddSchoolButton"
import TopBar from "../components/TopBar"

export default function BuySellPage() {
  const [activeTab, setActiveTab] = useState("Community")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const communitySchools = [
    {
      id: 1,
      name: "Saint Joseph School",
      location: "Addis Ababa, Ethiopia",
      type: "Partnership",
    }
  ]

  const myBids = [
    {
      id: 1,
      name: "Saint Joseph School",
      location: "Addis Ababa, Ethiopia",
      type: "Partnership",
      status: "Accepted"
    },
    {
      id: 2,
      name: "Addis Ababa University",
      location: "Addis Ababa, Ethiopia",
      type: "Public",
      status: "Rejected"
    }
  ]

  const myListings = [
    {
      id: 1,
      name: "Saint Joseph School",
      location: "Addis Ababa, Ethiopia",
      type: "Partnership",
    }
  ]

  const filteredCommunitySchools = communitySchools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredMyBids = myBids.filter(bid =>
    bid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bid.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredMyListings = myListings.filter(listing =>
    listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderContent = () => {
    switch (activeTab) {
      case "Community":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunitySchools.map((school) => (
              <CommunitySchoolCard
                key={school.id}
                name={school.name}
                location={school.location}
                type={school.type}
                showIcon={false}
                showHoverEffect={false}
              />
            ))}
          </div>
        )
      case "My Bids":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMyBids.map((bid) => (
              <MyBidsCard
                key={bid.id}
                name={bid.name}
                location={bid.location}
                type={bid.type}
                status={bid.status}
              />
            ))}
          </div>
        )
      case "My Listings":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMyListings.map((listing) => (
              <MyListingsCard
                key={listing.id}
                name={listing.name}
                location={listing.location}
                type={listing.type}
              />
            ))}
          </div>
        )
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunitySchools.map((school) => (
              <CommunitySchoolCard
                key={school.id}
                name={school.name}
                location={school.location}
                type={school.type}
                showIcon={false}
                showHoverEffect={false}
              />
            ))}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <LeftNavigationBar />
      <main className="ml-20 pt-8 pb-12 px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#151619]">School Buy/Sell</h1>
          <AddSchoolButton />
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <SchoolBuyAndSellTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex justify-end w-full max-w-2xl">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
        {renderContent()}
        {activeTab === "Community" && filteredCommunitySchools.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-[#625f68] text-lg">No schools found matching "{searchQuery}"</p>
          </div>
        )}

        {activeTab === "My Bids" && filteredMyBids.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-[#625f68] text-lg">No bids found matching "{searchQuery}"</p>
          </div>
        )}

        {activeTab === "My Bids" && filteredMyBids.length === 0 && !searchQuery && (
          <div className="text-center py-12">
            <p className="text-[#625f68] text-lg">You don't have any bids yet</p>
          </div>
        )}

        {activeTab === "My Listings" && filteredMyListings.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-[#625f68] text-lg">No listings found matching "{searchQuery}"</p>
          </div>
        )}

        {activeTab === "My Listings" && filteredMyListings.length === 0 && !searchQuery && (
          <div className="text-center py-12">
            <p className="text-[#625f68] text-lg">You don't have any listings yet</p>
          </div>
        )}
      </main>
    </div>
  )
}