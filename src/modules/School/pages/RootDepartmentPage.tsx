// src/modules/School/pages/RootDepartmentPage.tsx
import { TopNavigation } from "../components/top-navigation"
import { ActionToolbar } from "../components/action-toolbar"
import { DepartmentHeader } from "../components/department-header"
import { TabNavigation } from "../components/tab-navigation"
import { EmptyState } from "../components/empty-state"
import { useEffect } from "react"

export default function RootDepartmentPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <TopNavigation />
      <div className="pl-12 pr-8 py-4">
        <div className="mb-4">
          <ActionToolbar />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 pl-6">
            <DepartmentHeader />
            <TabNavigation />
            <EmptyState />
          </div>
        </div>
      </div>
    </div>
  )
}