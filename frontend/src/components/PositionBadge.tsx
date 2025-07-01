import { Badge } from "@/components/ui/badge"

interface PositionBadgeProps {
  position: string
  level?: number | string
  size?: "sm" | "default" | "lg"
}

export function PositionBadge({ position, level, size = "default" }: PositionBadgeProps) {
  const getPositionColor = (pos: string) => {
    switch (pos) {
      case "GK":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "DF":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "MF":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "FW":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getPositionName = (pos: string) => {
    switch (pos) {
      case "GK":
        return "골키퍼"
      case "DF":
        return "수비수"
      case "MF":
        return "미드필더"
      case "FW":
        return "공격수"
      default:
        return pos
    }
  }

  return (
    <Badge 
      variant="secondary" 
      className={`${getPositionColor(position)} font-semibold ${size === "sm" ? "text-xs px-2 py-1" : size === "lg" ? "text-base px-3 py-1" : "text-sm px-2 py-1"}`}
    >
      {getPositionName(position)}
      {level && (
        <span className="ml-1 opacity-70">Lv.{level}</span>
      )}
    </Badge>
  )
} 