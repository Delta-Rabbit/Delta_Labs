"use client"

import { Home, Tag, Building2, Download } from "lucide-react"
import { useNavigation } from "./NavigationContext"

export default function LeftNavigationBar() {
  const { currentPage, setCurrentPage } = useNavigation()

  const navItems = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "offers" as const, icon: Tag, label: "Offers" },
    { id: "buy-sell" as const, icon: Building2, label: "Buy/sell" },
    { id: "archive" as const, icon: Download, label: "Archive" },
  ]

  const handleNavigation = (pageId: typeof navItems[number]['id']) => {
    setCurrentPage(pageId)
  }

  return (
    <div className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-20 bg-white flex flex-col items-center justify-center py-6 gap-3 shadow-sm z-30">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = currentPage === item.id

        return (
          <div key={item.id} className="relative group">
            <button
              onClick={() => handleNavigation(item.id)}
              className={`
                w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200
                ${
                  isActive
                    ? "bg-[#174a5f] text-white shadow-lg"
                    : "bg-white text-[#625f68] border border-[#dce5e9]"
                }
              `}
              aria-label={item.label}
            >
              <Icon className="w-6 h-6" />
            </button>
            
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#323338] text-white text-sm font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
              {item.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}