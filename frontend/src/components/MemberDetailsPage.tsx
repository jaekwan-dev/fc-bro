"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Member } from "@/types/member";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

interface MemberDetailsPageProps {
  member: Member;
  onBack: () => void;
  onEdit: () => void;
  onDelete?: () => void;
}

export function MemberDetailsPage({ 
  member, 
  onBack, 
  onEdit, 
  onDelete 
}: MemberDetailsPageProps) {
  // 출생년도로부터 현재 나이 계산
  const calculateAge = (birthYear: number | undefined) => {
    if (!birthYear) return 0;
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 헤더 */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-6 py-5 z-10">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100"
            onClick={onBack}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">상세정보</h1>
            {/* <p className="text-sm text-gray-600 font-medium">{member.name}</p> */}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              수정
            </Button>
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                삭제
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          {/* 기본 정보 섹션 */}
          <Card className="border-0 shadow-lg">
            <CardContent className="px-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                기본 정보
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">이름</div>
                  <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                    {member.name}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">출생년도</div>
                    <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                      {member.birthYear || '정보 없음'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">나이</div>
                    <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                      {member.birthYear ? `${calculateAge(member.birthYear)}세` : '정보 없음'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">백넘버</div>
                    <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                      #{member.backNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">주발</div>
                    <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                      {member.preferredFoot || '정보 없음'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 포지션 정보 섹션 */}
          <Card className="border-0 shadow-lg">
            <CardContent className="px-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                포지션 정보
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">주 포지션</div>
                  <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                    {member.mainPosition}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">주 포지션 레벨</div>
                  <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                    {member.mainLevel}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">부 포지션</div>
                  <div className="min-h-12 px-3 py-3 text-base border border-gray-300 rounded-md bg-gray-50">
                    {member.subPosition && member.subPosition.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {member.subPosition.map((pos, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {pos}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">없음</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 추가 정보 섹션 */}
          <Card className="border-0 shadow-lg">
            <CardContent className="px-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                추가 정보
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">발사이즈</div>
                    <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                      {member.shoeSize ? `${member.shoeSize}mm` : '정보 없음'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">축구화</div>
                    <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                      {member.footballBoots || '정보 없음'}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">롤모델</div>
                  <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                    {member.roleModel || '정보 없음'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 실력 레벨 섹션 */}
          {/* <Card className="border-0 shadow-lg">
            <CardContent className="px-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                실력 레벨
              </h3>
              
              <div className="space-y-4"> */}

                {/* <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">부 포지션 레벨</div>
                  <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                    {member.subLevel}
                  </div>
                </div> */}
              {/* </div>
            </CardContent>
          </Card> */}

          {/* 출석 정보 섹션 */}
          {/* <Card className="border-0 shadow-lg">
            <CardContent className="px-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                출석 정보
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">출석률</div>
                  <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                    {attendanceRate}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">출석한 경기</div>
                    <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                      {member.attendance}경기
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">전체 경기</div>
                    <div className="h-12 px-3 text-base border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-900 font-medium">
                      {member.totalGames}경기
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* 부상이력 섹션 */}
          {member.injuries && member.injuries.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="px-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  부상이력
                </h3>
                
                <div className="space-y-3">
                  {member.injuries.map((injury) => (
                    <div key={injury.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">부상명</div>
                          <div className="h-10 px-3 text-base border border-gray-300 rounded-md bg-white flex items-center text-gray-900 font-medium">
                            {injury.injuryName}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">시작일</div>
                            <div className="h-10 px-3 text-base border border-gray-300 rounded-md bg-white flex items-center text-gray-900 font-medium">
                              {injury.startDate}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">종료일</div>
                            <div className="h-10 px-3 text-base border border-gray-300 rounded-md bg-white flex items-center text-gray-900 font-medium">
                              {injury.endDate || '진행중'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 