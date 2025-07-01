"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CreateMemberDto } from "@/types/member";
import { apiClient } from "@/lib/api";

interface AddMemberFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const positions = ["GK", "DF", "MF", "FW"];
const levels = ["프로", "세미프로", "아마추어", "루키"];

export function AddMemberForm({ onSuccess, onCancel }: AddMemberFormProps) {
  const [formData, setFormData] = useState<CreateMemberDto>({
    name: "",
    age: 20,
    backNumber: 1,
    mainPosition: "MF",
    subPosition: [],
    mainLevel: "아마추어",
    subLevel: 2,
    profileUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await apiClient.createMember(formData);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "팀원 추가에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubPositionChange = (position: string, checked: boolean) => {
    const currentSubPositions = formData.subPosition || [];
    if (checked) {
      setFormData({
        ...formData,
        subPosition: [...currentSubPositions, position]
      });
    } else {
      setFormData({
        ...formData,
        subPosition: currentSubPositions.filter(pos => pos !== position)
      });
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">새 팀원 추가</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">나이</Label>
            <Input
              id="age"
              type="number"
              min="16"
              max="50"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
              required
            />
          </div>
          <div>
            <Label htmlFor="backNumber">백넘버</Label>
            <Input
              id="backNumber"
              type="number"
              min="1"
              max="99"
              value={formData.backNumber}
              onChange={(e) => setFormData({ ...formData, backNumber: parseInt(e.target.value) })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mainPosition">주 포지션</Label>
            <select
              id="mainPosition"
              value={formData.mainPosition}
              onChange={(e) => setFormData({ ...formData, mainPosition: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {positions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>부 포지션 (다중 선택 가능)</Label>
            <div className="space-y-2 mt-2">
              {positions.filter(pos => pos !== formData.mainPosition).map((pos) => (
                <div key={pos} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`sub-${pos}`}
                    checked={formData.subPosition?.includes(pos) || false}
                    onChange={(e) => handleSubPositionChange(pos, e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor={`sub-${pos}`} className="text-sm cursor-pointer">
                    {pos}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mainLevel">주 포지션 레벨</Label>
            <select
              id="mainLevel"
              value={formData.mainLevel}
              onChange={(e) => setFormData({ ...formData, mainLevel: e.target.value as "프로" | "세미프로" | "아마추어" | "루키" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {levels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="subLevel">부 포지션 레벨 (1-5)</Label>
            <Input
              id="subLevel"
              type="number"
              min="1"
              max="5"
              value={formData.subLevel || ""}
              onChange={(e) => setFormData({ ...formData, subLevel: e.target.value ? parseInt(e.target.value) : undefined })}
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              취소
            </Button>
          )}
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "추가 중..." : "팀원 추가"}
          </Button>
        </div>
      </form>
    </Card>
  );
} 