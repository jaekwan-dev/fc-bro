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
    <div className="mb-10">
      <div className={`${gradient} rounded-2xl p-4 mb-6`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{getPositionLabel(title)}</h2>
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
