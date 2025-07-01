"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Member, UpdateMemberDto } from "@/types/member";
import { apiClient } from "@/lib/api";

interface MemberDetailsModalProps {
  member: Member;
  children: React.ReactNode;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const positions = ["GK", "DF", "MF", "FW"];

export function MemberDetailsModal({ 
  member, 
  children, 
  onUpdate, 
  onDelete 
}: MemberDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<UpdateMemberDto>({
    name: member.name,
    age: member.age,
    backNumber: member.backNumber,
    mainPosition: member.mainPosition,
    subPosition: member.subPosition,
    mainLevel: member.mainLevel,
    subLevel: member.subLevel,
    profileUrl: member.profileUrl,
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      await apiClient.updateMember(member.id, formData);
      setIsEditing(false);
      onUpdate?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말로 이 팀원을 삭제하시겠습니까?")) return;
    
    setIsLoading(true);
    try {
      await apiClient.deleteMember(member.id);
      setIsOpen(false);
      onDelete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const attendanceRate = member.totalGames > 0 
    ? Math.round((member.attendance / member.totalGames) * 100) 
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "팀원 정보 수정" : "팀원 정보"}</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={member.profileUrl} />
              <AvatarFallback className="text-lg">{member.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">#{member.backNumber}</p>
            </div>
          </div>

          {!isEditing ? (
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">나이:</span> {member.age}세
                  </div>
                  <div>
                    <span className="font-medium">백넘버:</span> #{member.backNumber}
                  </div>
                  <div>
                    <span className="font-medium">주 포지션:</span> {member.mainPosition} (Lv.{member.mainLevel})
                  </div>
                  <div>
                    <span className="font-medium">부 포지션:</span> {member.subPosition || "없음"} 
                    {member.subLevel && ` (Lv.${member.subLevel})`}
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {attendanceRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      출석률 ({member.attendance}/{member.totalGames})
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="age">나이</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="backNumber">백넘버</Label>
                  <Input
                    id="backNumber"
                    type="number"
                    value={formData.backNumber}
                    onChange={(e) => setFormData({ ...formData, backNumber: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="mainPosition">주 포지션</Label>
                  <select
                    id="mainPosition"
                    value={formData.mainPosition}
                    onChange={(e) => setFormData({ ...formData, mainPosition: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="mainLevel">주 포지션 레벨</Label>
                  <Input
                    id="mainLevel"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.mainLevel}
                    onChange={(e) => setFormData({ ...formData, mainLevel: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="subPosition">부 포지션</Label>
                  <select
                    id="subPosition"
                    value={formData.subPosition || ""}
                    onChange={(e) => setFormData({ ...formData, subPosition: e.target.value || undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">선택안함</option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            {!isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  className="flex-1"
                >
                  수정
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="flex-1"
                >
                  삭제
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button 
                  onClick={handleUpdate}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "저장 중..." : "저장"}
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 