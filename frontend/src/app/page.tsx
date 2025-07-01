"use client"

import { useState } from "react"
import { members } from "@/data/members"
import { fixtures } from "@/data/fixtures"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, ArrowLeft, Clock, MapPin, Trophy } from "lucide-react"
import { PositionSection } from "@/components/PositionSection"

export default function Home() {
  const [showTeamRoster, setShowTeamRoster] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {!showTeamRoster ? (
        // 메인 화면
        <div className="max-w-md mx-auto min-h-screen">
          {/* 헤더 */}
          <div className="px-6 pt-16 pb-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">축구팀</span>
              </div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tight">FC BRO</h1>
              <p className="text-gray-600 font-medium">프로페셔널 축구팀</p>
            </div>
          </div>

          {/* 다음 경기 카드 */}
          <div className="px-6 mb-8">
            <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0 shadow-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-white/20 text-white border-0 mb-3">다음 경기</Badge>
                    <CardTitle className="text-3xl font-bold">12월 15일</CardTitle>
                    <p className="text-white/80 font-medium">14:00 킥오프</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-sm font-medium">VS</p>
                    <p className="text-2xl font-bold">FC UNITED</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-6 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{members.length}명</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">서울월드컵경기장</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 경기 일정 */}
          <div className="px-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">경기 일정</h2>
            <div className="space-y-4">
              {fixtures.map((fixture, index) => (
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
                      <span className="text-gray-400 font-bold">VS</span>
                      <span className="font-bold text-lg text-gray-900">{fixture.opponent}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span className="font-medium">{fixture.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                <p className="text-sm text-gray-600 font-medium">{members.length}명의 선수</p>
              </div>
              <div className="w-10" />
            </div>
          </div>

          <div className="px-6 py-8">
            <PositionSection
              title="골키퍼"
              members={members.filter((m) => m.mainPosition === "GK")}
              gradient="bg-gradient-to-r from-blue-500 to-blue-600"
            />
            <PositionSection
              title="수비수"
              members={members.filter((m) => m.mainPosition === "DF")}
              gradient="bg-gradient-to-r from-green-500 to-green-600"
            />
            <PositionSection
              title="미드필더"
              members={members.filter((m) => m.mainPosition === "MF")}
              gradient="bg-gradient-to-r from-purple-500 to-purple-600"
            />
            <PositionSection
              title="공격수"
              members={members.filter((m) => m.mainPosition === "FW")}
              gradient="bg-gradient-to-r from-orange-500 to-orange-600"
            />
          </div>
        </div>
      )}
    </div>
  )
}
