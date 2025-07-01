import type { Member } from "@/types/member"
import { MemberCard } from "./MemberCard"

interface PositionSectionProps {
  title: string
  members: Member[]
  gradient: string
}

export function PositionSection({ title, members, gradient }: PositionSectionProps) {
  if (members.length === 0) return null

  // 한글 → 영어 변환 (혹시 한글이 들어올 경우 대비)
  const getPositionLabel = (title: string) => {
    switch (title) {
      case "골키퍼": return "GK"
      case "수비수": return "DF"
      case "미드필더": return "MF"
      case "공격수": return "FW"
      default: return title
    }
  }

  return (
    <div className="mb-3">
      <div className={`${gradient} border rounded-xl p-2 mb-2`}>
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-semibold text-gray-900">{getPositionLabel(title)}</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-200">
            <span className="text-gray-700 font-medium text-sm">{members.length}명</span>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}
