import type { Member } from "@/types/member"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  const subPosition = member.subPosition ? member.subPosition : null

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <Avatar className="w-14 h-14 border border-border">
              <AvatarImage src={member.profileUrl || `/placeholder.svg?height=56&width=56`} />
              <AvatarFallback className="text-lg font-semibold">{member.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.age}세</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">주포지션</div>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {member.mainPosition}
                  </Badge>
                </div>

                {subPosition && (
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">부포지션</div>
                    <Badge variant="outline" className="text-xs font-medium">
                      {subPosition}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">레벨</div>
                  <div className="text-sm font-medium text-foreground">{member.mainLevel}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">출석률</div>
                  <div className="text-sm font-medium text-foreground">
                    {member.attendance}/{member.totalGames}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-4">
            <div 
              className="text-5xl font-black text-muted-foreground/20 leading-none select-none tracking-tighter" 
              style={{fontFamily: '"JetBrains Mono", "Consolas", "Monaco", monospace'}}
            >
              {String(member.backNumber).padStart(2, '0')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
