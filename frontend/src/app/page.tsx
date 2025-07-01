"use client"

import { useState, useEffect } from "react"
import { members } from "@/data/members"
import { fixtures } from "@/data/fixtures"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, ArrowLeft, Clock, MapPin } from "lucide-react"
import { PositionSection } from "@/components/PositionSection"
import { AddMemberForm } from "@/components/AddMemberForm"
import { MemberDetailsPage } from "@/components/MemberDetailsPage"
import { MemberEditForm } from "@/components/MemberEditForm"
import { Member } from "@/types/member"

export default function Home() {
  const [showTeamRoster, setShowTeamRoster] = useState(false)
  const [search, setSearch] = useState("")
  const [positionFilter, setPositionFilter] = useState<string>("ALL")
  const [injuryFilter, setInjuryFilter] = useState<boolean>(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [membersData, setMembersData] = useState<Member[]>(members)
  const [isLoading, setIsLoading] = useState(false)

  // 경기 시간 계산 함수
  const calculateGameTimes = (meetingTime: string) => {
    const [hour, minute] = meetingTime.split(':').map(Number)
    const meetingMinutes = hour * 60 + minute
    
    const lateCheckMinutes = meetingMinutes + 10
    const firstQuarterStartMinutes = meetingMinutes + 30
    
    const formatTime = (totalMinutes: number) => {
      const h = Math.floor(totalMinutes / 60)
      const m = totalMinutes % 60
      return `${h}:${m.toString().padStart(2, '0')}`
    }
    
    const formatQuarterTime = (startMinutes: number) => {
      const start = formatTime(startMinutes)
      const end = formatTime(startMinutes + 25)
      return `${start}~${end}`
    }
    
    return {
      lateCheck: formatTime(lateCheckMinutes),
      quarters: [
        formatQuarterTime(firstQuarterStartMinutes),
        formatQuarterTime(firstQuarterStartMinutes + 30),
        formatQuarterTime(firstQuarterStartMinutes + 60),
        formatQuarterTime(firstQuarterStartMinutes + 90)
      ]
    }
  }

  // 다음 경기 정보 (실제로는 API에서 가져올 데이터)
  const nextGame = {
    date: "12월 15일",
    meetingTime: "6:30"
  }
  
  const gameTimes = calculateGameTimes(nextGame.meetingTime)

  const positions = ["ALL", "GK", "DF", "MF", "FW"]

  const fetchMembers = async () => {
    try {
      setIsLoading(true)
      // 임시로 로컬 데이터 사용 (API 문제 해결 전까지)
      setMembersData(members)
      console.log('로컬 데이터 로드:', members)
    } catch (err) {
      console.error(err)
      setMembersData(members)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const filtered = membersData.filter((m) => {
    const matchesSearch = m.name.includes(search) || m.mainPosition.includes(search)
    const matchesPosition = positionFilter === "ALL" || m.mainPosition === positionFilter
    const matchesInjury = !injuryFilter || (m.injuries && m.injuries.length > 0 && m.injuries.some(injury => injury.isActive))
    return matchesSearch && matchesPosition && matchesInjury
  })

  const handleAddSuccess = () => {
    setShowAddForm(false)
    fetchMembers()
  }

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member)
  }

  const handleBackFromDetails = () => {
    setSelectedMember(null)
  }

  const handleEditMember = () => {
    setShowEditForm(true)
  }

  const handleEditSuccess = () => {
    setShowEditForm(false)
    setSelectedMember(null)
    fetchMembers()
  }

  const handleEditCancel = () => {
    setShowEditForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {selectedMember && showEditForm ? (
        <MemberEditForm
          member={selectedMember}
          onSuccess={handleEditSuccess}
          onCancel={handleEditCancel}
        />
      ) : selectedMember ? (
        <MemberDetailsPage
          member={selectedMember}
          onBack={handleBackFromDetails}
          onEdit={handleEditMember}
          onDelete={() => {
            fetchMembers()
            setSelectedMember(null)
          }}
        />
      ) : !showTeamRoster ? (
        // 메인 화면
        <div className="max-w-md mx-auto min-h-screen">
          {/* 헤더 */}
          <div className="px-6 pt-4 pb-4">
            <div className="text-left space-y-3">
              {/* <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm"> */}
                {/* <Trophy className="w-5 h-5 text-yellow-500" /> */}
                {/* <span className="text-sm font-semibold text-gray-700">축구팀</span> */}
              {/* </div> */}
            <h1 className="text-2xl font-bold text-gray-900">다음 경기 일정</h1>
              {/* <p className="text-gray-600 font-medium">프로페셔널 축구팀</p> */}
            </div>
          </div>

          {/* 다음 경기 카드 */}
          <div className="px-6 mb-8">
            <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0 shadow-2xl">
              <CardHeader className="pb-1">
                <div>
                  <div className="flex items-center gap-6 text-sm text-white/80 mb-6">
                  {/* <Badge className="bg-white/20 text-white border-0">다음 경기</Badge> */}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">서울월드컵경기장</span>
                    </div>
                  </div>
                  {/* 경기 일자와 시간 */}
                  <div className="text-center mb-3">
                    <div className="text-4xl font-black text-white mb-2">{nextGame.date} {nextGame.meetingTime}</div>
                  </div>
                  
                  {/* 지각자 체크 시간 */}
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold text-red-300 mb-1">지각자 체크 : {gameTimes.lateCheck}</div>
                  </div>
                  
                  {/* 쿼터별 시간 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <span className="w-10 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">1Q</span>
                      <span className="text-white font-semibold">{gameTimes.quarters[0]}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <span className="w-10 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">2Q</span>
                      <span className="text-white font-semibold">{gameTimes.quarters[1]}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <span className="w-10 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">3Q</span>
                      <span className="text-white font-semibold">{gameTimes.quarters[2]}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <span className="w-10 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">4Q</span>
                      <span className="text-white font-semibold">{gameTimes.quarters[3]}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 border-0 shadow-lg">
              <CardContent className="px-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-700">{members.length}명</span>
                  </div>
                </div>

                {/* 참석자 목록 */}
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-800">노랑팀</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                    {members.slice(0, 14)
                      .sort((a, b) => {
                        const positionOrder = { "GK": 1, "DF": 2, "MF": 3, "FW": 4 };
                        const aOrder = positionOrder[a.mainPosition as keyof typeof positionOrder] || 5;
                        const bOrder = positionOrder[b.mainPosition as keyof typeof positionOrder] || 5;
                        return aOrder - bOrder;
                      })
                      .map((member) => (
                      <div key={member.id} className="flex items-center justify-center gap-1 bg-white rounded-full px-3 py-1 text-xs shadow-sm border border-yellow-200">
                        <span className="font-medium text-gray-800">{member.name}</span>
                        <span className={`font-bold ${
                          member.mainPosition === "GK" ? "text-blue-600" :
                          member.mainPosition === "DF" ? "text-green-600" :
                          member.mainPosition === "MF" ? "text-purple-600" :
                          "text-orange-600"
                        }`}>{member.mainPosition}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-8">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-800">파랑팀</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                    {members.slice(14, 28)
                      .sort((a, b) => {
                        const positionOrder = { "GK": 1, "DF": 2, "MF": 3, "FW": 4 };
                        const aOrder = positionOrder[a.mainPosition as keyof typeof positionOrder] || 5;
                        const bOrder = positionOrder[b.mainPosition as keyof typeof positionOrder] || 5;
                        return aOrder - bOrder;
                      })
                      .map((member) => (
                      <div key={member.id} className="flex items-center justify-center gap-1 bg-white rounded-full px-3 py-1 text-xs shadow-sm border border-blue-200">
                        <span className="font-medium text-gray-800">{member.name}</span>
                        <span className={`font-bold ${
                          member.mainPosition === "GK" ? "text-blue-600" :
                          member.mainPosition === "DF" ? "text-green-600" :
                          member.mainPosition === "MF" ? "text-purple-600" :
                          "text-orange-600"
                        }`}>{member.mainPosition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 이후 경기 일정 */}
          <div className="px-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">이후 경기 일정</h2>
            <div className="space-y-4">
                            {fixtures.length > 0 ? (
                fixtures.map((fixture, index) => (
                  <Card key={fixture.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${index === 0 ? "bg-green-400" : index === 1 ? "bg-blue-400" : "bg-orange-400"}`}
                          />
                          <Badge variant="secondary" className="font-semibold">
                            {fixture.type}
                          </Badge>
                          <span className="text-sm text-gray-600 font-medium">{fixture.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                          <Clock className="w-4 h-4" />
                          {fixture.time}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-lg text-gray-900">FC BRO</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span className="font-medium">{fixture.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium mb-2">예정된 경기가 없습니다</p>
                      <p className="text-sm">새로운 경기 일정이 추가되면 여기에 표시됩니다.</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* 팀원 보기 버튼 */}
          <div className="px-6 pb-8">
            <Button
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 shadow-xl"
              onClick={() => setShowTeamRoster(true)}
            >
              팀원 목록 보기
            </Button>
          </div>
        </div>
      ) : showAddForm ? (
        // 팀원 추가 화면
        <div className="max-w-md mx-auto p-4 min-h-screen">
          <AddMemberForm
            onSuccess={handleAddSuccess}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      ) : (
        // 팀원 목록 화면
        <div className="max-w-md mx-auto min-h-screen">
          <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-6 py-5 z-10">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100"
                onClick={() => setShowTeamRoster(false)}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">팀원 목록</h1>
                {/* <p className="text-sm text-gray-600 font-medium">{membersData.length}명의 선수</p> */}
              </div>
              <div className="w-10" />
            </div>
          </div>

          {/* 검색 및 필터 */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="이름 검색"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1"
                />
                {/* <Button 
                  variant={showFilter ? "default" : "outline"}
                  onClick={() => setShowFilter(!showFilter)}
                  className="ml-2"
                >
                  필터
                </Button> */}
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  + 추가
                </Button>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {positions.map((position) => (
                  <Button
                    key={position}
                    size="sm"
                    variant={positionFilter === position ? "default" : "outline"}
                    onClick={() => setPositionFilter(position)}
                    className="text-xs w-12 h-8 flex-shrink-0"
                  >
                    {position === "ALL" ? "전체" : position}
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant={injuryFilter ? "default" : "outline"}
                  onClick={() => setInjuryFilter(!injuryFilter)}
                  className={`text-xs px-3 h-8 flex-shrink-0 ${
                    injuryFilter 
                      ? "bg-red-600 hover:bg-red-700 text-white border-red-600" 
                      : "bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                  }`}
                >
                  부상자
                </Button>
              </div>
            </div>
          </div>

          <div className="px-6 py-3">
            {/* 필터 상태 표시 */}
            {(positionFilter !== "ALL" || injuryFilter || search) && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-800 font-medium mb-2">적용된 필터:</div>
                <div className="flex flex-wrap gap-2">
                  {positionFilter !== "ALL" && (
                    <Badge variant="secondary" className="text-xs">
                      포지션: {positionFilter}
                    </Badge>
                  )}
                  {injuryFilter && (
                    <Badge variant="destructive" className="text-xs bg-red-100 text-red-700 border-red-300">
                      부상자만
                    </Badge>
                  )}
                  {search && (
                    <Badge variant="outline" className="text-xs">
                      검색: &quot;{search}&quot;
                    </Badge>
                  )}
                </div>
                <div className="mt-2 text-xs text-blue-600">
                  총 {filtered.length}명의 선수가 표시됩니다
                </div>
              </div>
            )}
            
            {isLoading ? (
              <div className="text-center py-8">로딩 중...</div>
            ) : filtered.length > 0 ? (
              <>
                <PositionSection
                  title="골키퍼"
                  members={filtered.filter((m) => m.mainPosition === "GK")}
                  gradient="border-blue-200 bg-blue-50"
                  onMemberClick={handleMemberClick}
                />
                <PositionSection
                  title="수비수"
                  members={filtered.filter((m) => m.mainPosition === "DF")}
                  gradient="border-green-200 bg-green-50"
                  onMemberClick={handleMemberClick}
                />
                <PositionSection
                  title="미드필더"
                  members={filtered.filter((m) => m.mainPosition === "MF")}
                  gradient="border-purple-200 bg-purple-50"
                  onMemberClick={handleMemberClick}
                />
                <PositionSection
                  title="공격수"
                  members={filtered.filter((m) => m.mainPosition === "FW")}
                  gradient="border-orange-200 bg-orange-50"
                  onMemberClick={handleMemberClick}
                />
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {search ? "검색 결과가 없습니다." : "등록된 팀원이 없습니다."}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
