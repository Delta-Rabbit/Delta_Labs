import { TopNavigation } from "./top-navigation"
import { ActionToolbar } from "./action-toolbar"
import { DepartmentHeader } from "./department-header"
import { TabNavigation } from "../components/tab-navigation"
import { EmptyState } from "./empty-state"

export function DepartmentManagement() {
  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <TopNavigation />
      <div className="px-8 py-6">
        <div className="mb-6">
          <ActionToolbar />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <DepartmentHeader />
            <TabNavigation />
            <EmptyState />
          </div>
        </div>
      </div>
    </div>
  )
}