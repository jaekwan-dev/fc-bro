"use client";
import { MemberCard } from "@/components/member-card";
import { AddMemberForm } from "@/components/AddMemberForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Member } from "@/types/member";
import { apiClient } from "@/lib/api";

export default function MemberListPage() {
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [positionFilter, setPositionFilter] = useState<string>("ALL");
  const [showFilter, setShowFilter] = useState(false);

  const positions = ["ALL", "GK", "DF", "MF", "FW"];

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.getMembers();
      setMembers(data);
    } catch (err) {
      setError("팀원 목록을 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filtered = members.filter((m) => {
    const matchesSearch = m.name.includes(search) || m.mainPosition.includes(search);
    const matchesPosition = positionFilter === "ALL" || m.mainPosition === positionFilter;
    return matchesSearch && matchesPosition;
  });

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchMembers();
  };

  if (showAddForm) {
    return (
      <div className="max-w-md mx-auto p-4 min-h-screen bg-gradient-to-b from-pink-100 to-white">
        <AddMemberForm
          onSuccess={handleAddSuccess}
          onCancel={() => setShowAddForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-24 min-h-screen bg-gradient-to-b from-pink-100 to-white">
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="이름/포지션 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Button 
            variant={showFilter ? "default" : "outline"}
            onClick={() => setShowFilter(!showFilter)}
            className="ml-2"
          >
            필터
          </Button>
        </div>
        
        {showFilter && (
          <div className="flex gap-2 flex-wrap">
            {positions.map((position) => (
              <Button
                key={position}
                size="sm"
                variant={positionFilter === position ? "default" : "outline"}
                onClick={() => setPositionFilter(position)}
                className="text-xs"
              >
                {position === "ALL" ? "전체" : position}
              </Button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">로딩 중...</div>
      ) : (
        <div>
          {filtered.map((member) => (
            <MemberCard 
              key={member.id} 
              member={member} 
              onUpdate={fetchMembers}
              onDelete={fetchMembers}
            />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {search ? "검색 결과가 없습니다." : "등록된 팀원이 없습니다."}
            </div>
          )}
        </div>
      )}

      <Button
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-md bg-orange-500 text-lg font-bold shadow-lg"
        size="lg"
        onClick={() => setShowAddForm(true)}
      >
        + 팀원 추가
      </Button>
    </div>
  );
} 