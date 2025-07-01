"use client";
import { useState, useRef } from "react";
import { MemberCard } from "@/components/MemberCard";
import { Member } from "@/types/member";

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
    totalGames: 10,
    attendance: 3,
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
    totalGames: 10,
    attendance: 7,
    profileUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0); // 0: 일정(비어있음), 1: 팀원카드
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const difference = touchStartX.current - touchEndX.current;
    const isLeftSwipe = difference > 50;
    const isRightSwipe = difference < -50;

    if (isLeftSwipe && slide === 0) {
      setSlide(1); // 첫 화면에서 왼쪽 스와이프 시 두 번째 화면으로
    } else if (isRightSwipe && slide === 1) {
      setSlide(0); // 두 번째 화면에서 오른쪽 스와이프 시 첫 화면으로
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-pink-100 to-white overflow-hidden">
      {/* 슬라이드 컨테이너 */}
      <div
        className="flex h-full w-full transition-transform duration-300 ease-in-out"
        style={{ 
          transform: `translateX(-${slide * 100}%)`,
          width: '200%' // 두 개의 화면을 위해
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 첫 화면: 팀명 + 일정(비워둠) */}
        <section className="w-1/2 h-full flex flex-col items-center justify-start pt-12 px-4 flex-shrink-0">
          <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-purple-900 mb-2 text-center drop-shadow-lg">
            FC BRO
          </div>
          <div className="text-lg font-bold text-purple-400 mb-8 text-center">SOCCER TEAM</div>
          {/* 일정 영역 (비워둠) */}
          <div className="w-full max-w-md h-40 bg-white/60 rounded-xl flex items-center justify-center text-gray-400 text-lg font-bold border-2 border-dashed border-gray-300">
            일정 정보는 추후 추가 예정입니다
          </div>
          <button
            className="mt-10 text-sm text-purple-700 font-bold underline"
            onClick={() => setSlide(1)}
          >
            → 팀원 카드 보기
          </button>
        </section>
        
        {/* 두 번째 화면: 팀원 카드 목록 */}
        <section className="w-1/2 h-full px-4 pt-8 pb-24 flex flex-col items-center bg-gradient-to-b from-pink-100 to-white flex-shrink-0 overflow-y-auto">
          <div className="flex items-center justify-between w-full max-w-md mb-4">
            <button
              className="text-purple-700 font-bold text-lg p-2"
              onClick={() => setSlide(0)}
            >
              ←
            </button>
            <div className="font-bold text-xl text-purple-900">팀원 목록</div>
            <div className="w-8" /> {/* placeholder for alignment */}
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
          className={`w-3 h-3 rounded-full transition-colors ${slide === 0 ? "bg-purple-700" : "bg-gray-300"}`}
          onClick={() => setSlide(0)}
        />
        <button
          className={`w-3 h-3 rounded-full transition-colors ${slide === 1 ? "bg-purple-700" : "bg-gray-300"}`}
          onClick={() => setSlide(1)}
        />
      </div>
    </div>
  );
}
