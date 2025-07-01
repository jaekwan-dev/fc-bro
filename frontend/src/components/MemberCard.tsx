import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MemberDetailsModal } from "./MemberDetailsModal";
import { Member } from "@/types/member";

interface MemberCardProps {
  member: Member;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export function MemberCard({ member, onUpdate, onDelete }: MemberCardProps) {
  // 포지션별 컬러 예시
  const positionColor: Record<string, string> = {
    FW: "bg-red-100",
    MF: "bg-blue-100",
    DF: "bg-green-100",
    GK: "bg-yellow-100",
  };

  return (
    <MemberDetailsModal member={member} onUpdate={onUpdate} onDelete={onDelete}>
      <Card className={`mb-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow ${positionColor[member.mainPosition] || "bg-gray-100"}`}>
        <CardContent className="flex items-center gap-4 py-4">
          <Avatar>
            <AvatarImage src={member.profileUrl} />
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-bold text-lg">{member.name}</div>
            <div className="text-sm text-muted-foreground">
              #{member.backNumber} | {member.mainPosition} ({member.mainLevel}레벨)
            </div>
            <div className="text-xs mt-1">
              출석률: <span className="font-bold text-orange-600 text-base">{member.attendance}/{member.totalGames}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </MemberDetailsModal>
  );
} 