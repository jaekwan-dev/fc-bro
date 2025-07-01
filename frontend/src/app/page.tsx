"use client"

import type React from "react"

import { useState, useRef } from "react"
import { MemberCard } from "@/components/member-card"
import type { Member } from "@/types/member"
import { Calendar, Users, Trophy } from "lucide-react"

// 샘플 팀원 데이터
const members: Member[] = [
  {
    id: "1",
    name: "홍길동",
    age: 25,
    backNumber: 10,
    mainPosition: "FW",
    subPosition: "MF",
    mainLevel: 4,
    subLevel: 3,
    totalGames: 15,
    attendance: 12,
    profileUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "김철수",
    age: 28,
    backNumber: 1,
    mainPosition: "GK",
    subPosition: "DF",
    mainLevel: 5,
    subLevel: 2,
    totalGames: 15,
    attendance: 14,
    profileUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "박민수",
    age: 26,
    backNumber: 7,
    mainPosition: "MF",
    subPosition: "FW",
    mainLevel: 4,
    subLevel: 4,
    totalGames: 12,
    attendance: 10,
    profileUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "이준호",
    age: 24,
    backNumber: 3,
    mainPosition: "DF",
    subPosition: "MF",
    mainLevel: 3,
    subLevel: 2,
    totalGames: 13,
    attendance: 11,
    profileUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// 샘플 경기 일정
const fixtures = [
  {
    id: 1,
    date: "12월 15일",
    time: "14:00",
    opponent: "FC UNITED",
    location: "서울월드컵경기장",
    type: "리그전",
    color: "from-pink-400 to-pink-600",
  },
  {
    id: 2,
    date: "12월 22일",
    time: "16:00",
    opponent: "SEOUL FC",
    location: "잠실종합운동장",
    type: "친선경기",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    date: "12월 29일",
    time: "15:00",
    opponent: "VICTORY FC",
    location: "상암월드컵경기장",
    type: "컵대회",
    color: "from-green-400 to-green-600",
  },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const difference = touchStartX.current - touchEndX.current
    const isLeftSwipe = difference > 50
    const isRightSwipe = difference < -50

    if (isLeftSwipe && slide === 0) {
      setSlide(1)
    } else if (isRightSwipe && slide === 1) {
      setSlide(0)
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 overflow-hidden">
      {/* Status bar mockup */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-between px-6 text-sm font-bold">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2 bg-black/60 rounded-sm"></div>
          <div className="w-1 h-3 bg-black/60 rounded-sm"></div>
          <div className="w-6 h-3 bg-black/60 rounded-sm"></div>
        </div>
      </div>

      {/* 슬라이드 컨테이너 */}
      <div
        className="flex h-full w-full transition-transform duration-300 ease-in-out pt-12"
        style={{
          transform: `translateX(-${slide * 100}%)`,
          width: "200%",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 첫 화면: 팀명 + 일정 */}
        <section className="w-1/2 h-full flex flex-col items-center justify-start pt-8 px-6 flex-shrink-0">
          {/* 헤더 */}
          <div className="w-full max-w-md mb-8">
            <div className="text-right mb-2">
              <div className="inline-block w-6 h-6 bg-black rounded-full"></div>
            </div>
            <div className="text-6xl font-black text-black tracking-tighter leading-none">DECEMBER</div>
            <div className="text-6xl font-black text-black/30 tracking-tighter leading-none">2024</div>
          </div>

          {/* 팀 정보 카드 */}
          <div className="w-full max-w-md mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
                <Trophy className="w-full h-full" />
              </div>
              <div className="relative z-10">
                <div className="text-sm font-bold opacity-80 mb-1">NEXT GAME</div>
                <div className="text-3xl font-black tracking-tight mb-2">FC BRO</div>
                <div className="text-lg font-bold opacity-90">SOCCER TEAM</div>
                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{members.length} 명</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>12월 15일</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 경기 일정 */}
          <div className="w-full max-w-md space-y-3 flex-1 overflow-y-auto">
            {fixtures.map((fixture) => (
              <div key={fixture.id} className={`bg-gradient-to-r ${fixture.color} rounded-2xl p-4 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold opacity-80">{fixture.date}</div>
                    <div className="text-sm font-bold">{fixture.type}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black">{fixture.time}</div>
                    <div className="text-sm font-bold opacity-90">FC BRO</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black">{fixture.opponent}</div>
                    <div className="text-xs opacity-80">{fixture.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 하단 버튼 */}
          <div className="w-full max-w-md mt-6 mb-6">
            <button
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-black py-4 rounded-2xl text-lg tracking-wide"
              onClick={() => setSlide(1)}
            >
              TRACK THE TEAM
            </button>
          </div>
        </section>

        {/* 두 번째 화면: 팀원 카드 목록 */}
        <section className="w-1/2 h-full px-6 pt-8 pb-24 flex flex-col items-center flex-shrink-0 overflow-y-auto">
          <div className="flex items-center justify-between w-full max-w-md mb-6">
            <button
              className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center font-bold text-lg"
              onClick={() => setSlide(0)}
            >
              ←
            </button>
            <div>
              <div className="font-black text-2xl text-black text-center">TEAM</div>
              <div className="font-black text-2xl text-black/30 text-center">ROSTER</div>
            </div>
            <div className="w-10" />
          </div>

          <div className="w-full max-w-md">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      </div>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <button
          className={`w-2 h-2 rounded-full transition-all duration-300 ${slide === 0 ? "bg-black w-6" : "bg-black/30"}`}
          onClick={() => setSlide(0)}
        />
        <button
          className={`w-2 h-2 rounded-full transition-all duration-300 ${slide === 1 ? "bg-black w-6" : "bg-black/30"}`}
          onClick={() => setSlide(1)}
        />
      </div>
    </div>
  )
}
