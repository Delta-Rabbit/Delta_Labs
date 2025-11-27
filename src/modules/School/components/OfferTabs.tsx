"use client"

const tabs = ["Requested", "Approved", "Amendment", "Rejected"]

interface OfferTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

function OfferTabs({ activeTab, onTabChange }: OfferTabsProps) {
  return (
    <div className="flex gap-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === tab ? "text-[#174a5f]" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {tab}
          {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174a5f]" />}
        </button>
      ))}
    </div>
  )
}

export default OfferTabs