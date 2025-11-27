import type { LucideIcon } from "lucide-react"

interface AnalysisCardProps {
  value: number | string
  label: string
  icon: LucideIcon
  bgColor: string
  iconColor?: string
}

export default function AnalysisCard({ value, label, icon: Icon, bgColor, iconColor = "#174a5f" }: AnalysisCardProps) {
  return (
    <div
      className="rounded-2xl p-6 shadow-sm border border-black/5"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-5xl font-bold text-[#151619] mb-1">{value}</div>
          <div className="text-base font-medium text-[#151619]/70">{label}</div>
        </div>
        <div
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm"
          style={{ color: iconColor }}
        >
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
      </div>
    </div>
  )
}