import type { Member } from "@/types/member"
import { MemberCard } from "./MemberCard"

interface PositionSectionProps {
  title: string
  members: Member[]
  gradient: string
}

export function PositionSection({ title, members, gradient }: PositionSectionProps) {
  if (members.length === 0) return null

  return (
    <div className="mb-10">
      <div className={`${gradient} rounded-2xl p-4 mb-6`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white font-semibold text-sm">{members.length}명</span>
          </div>
        </div>
      </div>
      <div className="space-y-0">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}
