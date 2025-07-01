import type { Member } from "@/types/member"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PositionBadge } from "./PositionBadge"
import { AttendanceProgress } from "./AttendanceProgress"

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  const getPositionColor = (position: string) => {
    switch (position) {
      case "GK":
        return "bg-blue-50 border-blue-200 text-blue-900"
      case "DF":
        return "bg-green-50 border-green-200 text-green-900"
      case "MF":
        return "bg-purple-50 border-purple-200 text-purple-900"
      case "FW":
        return "bg-orange-50 border-orange-200 text-orange-900"
      default:
        return "bg-gray-50 border-gray-200 text-gray-900"
    }
  }



  return (
    <div className={`${getPositionColor(member.mainPosition)} border-2 rounded-xl p-4 mb-3 relative overflow-hidden`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
            <AvatarImage src={member.profileUrl || `/placeholder.svg?height=48&width=48`} />
            <AvatarFallback className="bg-white font-bold">{member.name.charAt(0)}</AvatarFallback>
          </Avatar>

                      <div>
              <div className="font-bold text-lg">{member.name}</div>
              <div className="flex items-center space-x-2 mt-1">
                <PositionBadge position={member.mainPosition} level={member.mainLevel} size="sm" />
                <span className="text-sm opacity-70">{member.age}세</span>
              </div>
            </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold opacity-30">#{member.backNumber}</div>
        </div>
      </div>

             <div className="mt-3">
         <AttendanceProgress 
           attendance={member.attendance} 
           totalGames={member.totalGames} 
           size="sm" 
         />
       </div>
    </div>
  )
}
