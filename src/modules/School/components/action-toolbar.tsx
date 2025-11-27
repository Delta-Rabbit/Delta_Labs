import { UserPlus, Link, Bot, Zap } from "lucide-react"

export function ActionToolbar() {
  return (
    <div className="flex items-center justify-end gap-3">
      <button className="text-[#5c5f62] gap-2 px-3 py-2 rounded-lg flex items-center">
        <Zap className="h-4 w-4" />
        <span className="text-sm">Integrate</span>
      </button>

      <button className="text-[#5c5f62] gap-2 px-3 py-2 rounded-lg flex items-center">
        <Bot className="h-4 w-4" />
        <span className="text-sm">Automate</span>
      </button>

      <div className="flex items-center border border-[#cfcfcf] rounded-lg bg-transparent">
        <button className="text-[#5c5f62] gap-2 px-3 py-2 flex items-center">
          <UserPlus className="h-4 w-4" />
          <span className="text-sm">Invite</span>
        </button>
        
        <div className="h-4 w-px bg-[#cfcfcf]"></div>
        
        <button className="text-[#5c5f62] p-2 flex items-center">
          <Link className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}