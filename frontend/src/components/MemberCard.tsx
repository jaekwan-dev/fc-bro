import type { Member } from "@/types/member"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MemberCardProps {
  member: Member
  onClick?: (member: Member) => void
}

export function MemberCard({ member, onClick }: MemberCardProps) {
  // subPosition이 배열이 아닌 경우 배열로 변환
  const subPositions = member.subPosition 
    ? (Array.isArray(member.subPosition) ? member.subPosition : [member.subPosition])
    : null

  // 출생년도로부터 현재 나이 계산
  const calculateAge = (birthYear: number | undefined) => {
    console.log('calculateAge 호출:', { birthYear, memberName: member.name });
    if (!birthYear) return 0;
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    console.log('나이 계산 결과:', { birthYear, currentYear, age });
    return age;
  };

  // 주포지션에 따른 그라데이션 색상 설정
  const getPositionGradient = (position: string) => {
    switch (position) {
      case 'GK':
        return 'from-blue-50/30 to-cyan-50/30 border-l-4 border-l-blue-200'
      case 'DF':
        return 'from-green-50/30 to-emerald-50/30 border-l-4 border-l-green-200'
      case 'MF':
        return 'from-yellow-50/30 to-orange-50/30 border-l-4 border-l-yellow-200'
      case 'FW':
        return 'from-red-50/30 to-pink-50/30 border-l-4 border-l-red-200'
      default:
        return 'from-gray-50/30 to-slate-50/30 border-l-4 border-l-gray-200'
    }
  }

  const cardContent = (
    <Card className={`mb-2 hover:shadow-md transition-shadow duration-200 bg-gradient-to-r cursor-pointer ${getPositionGradient(member.mainPosition)}`}>
      <CardContent className="px-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4 flex-1">

            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <Badge 
                    variant="secondary" 
                    className="text-xs border-1 border-gray-300 font-bold px-2 py-0.5"
                  >
                    {member.mainPosition}
                  </Badge>
                  {member.preferredFoot && (
                    <Badge 
                      variant="outline" 
                      className="text-xs border-1 border-purple-300 text-purple-700 bg-purple-50 font-bold px-2 py-0.5"
                    >
                      {member.preferredFoot}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {member.birthYear ? `${calculateAge(member.birthYear)}세` : '나이 정보 없음'}
                </p>
              </div>

              {subPositions && subPositions.length > 0 && (
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">부포지션</div>
                  <div className="flex flex-wrap gap-1">
                    {subPositions.map((pos, index) => (
                      <Badge key={index} variant="outline" className="text-xs font-medium">
                        {pos}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">레벨</div>
                <div className="text-sm font-medium text-foreground">{member.mainLevel}</div>
              </div>
            </div>
          </div>

          <div className="ml-4 flex flex-col justify-between items-center h-full min-h-[120px] gap-6">
            <div 
              className="text-7xl font-black text-muted-foreground/20 leading-none select-none tracking-tighter text-center" 
              style={{fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif'}}
            >
              {String(member.backNumber).padStart(2, '0')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (onClick) {
    return (
      <div onClick={() => onClick(member)}>
        {cardContent}
      </div>
    );
  }

  return cardContent;
}
