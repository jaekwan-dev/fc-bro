import type { Member } from "@/types/member"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MemberCardProps {
  member: Member
  onUpdate?: () => void
  onDelete?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MemberCard({ member, onUpdate, onDelete }: MemberCardProps) {
  const getPositionColor = (position: string) => {
    switch (position) {
      case "GK":
        return "from-orange-400 to-red-500"
      case "DF":
        return "from-blue-400 to-blue-600"
      case "MF":
        return "from-green-400 to-green-600"
      case "FW":
        return "from-purple-400 to-purple-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  const attendanceRate = Math.round((member.attendance / member.totalGames) * 100)

  return (
    <div
      className={`relative bg-gradient-to-r ${getPositionColor(member.mainPosition)} rounded-2xl p-6 mb-4 text-white shadow-lg overflow-hidden`}
    >
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="text-8xl font-black transform rotate-12">{member.backNumber}</div>
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-3 border-white/30">
            <AvatarImage src={member.profileUrl || `/placeholder.svg?height=64&width=64`} />
            <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
              {member.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="text-2xl font-black tracking-tight">{member.name}</div>
            <div className="text-sm font-bold opacity-90">
              {member.mainPosition} • {member.age}세
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-4xl font-black opacity-80">{member.backNumber}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-black">{member.totalGames}</div>
          <div className="text-xs font-bold opacity-80">GAMES</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black">{member.mainLevel}</div>
          <div className="text-xs font-bold opacity-80">LEVEL</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black">{attendanceRate}%</div>
          <div className="text-xs font-bold opacity-80">ATTEND</div>
        </div>
      </div>
    </div>
  )
} 