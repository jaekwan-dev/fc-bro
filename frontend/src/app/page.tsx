"use client";
import { useState } from "react";
import { MemberCard } from "@/components/MemberCard";

// 샘플 팀원 데이터
const members = [
  {
    name: "홍길동",
    age: 25,
    backNumber: 10,
    mainPosition: "FW",
    subPosition: "MF",
    mainLevel: 4,
    subLevel: 3,
    attendance: "3/10",
    profileUrl: "",
  },
  {
    name: "김철수",
    age: 28,
    backNumber: 1,
    mainPosition: "GK",
    subPosition: "DF",
    mainLevel: 5,
    subLevel: 2,
    attendance: "7/10",
    profileUrl: "",
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0); // 0: 일정(비어있음), 1: 팀원카드

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-100 to-white overflow-x-hidden">
      {/* 슬라이드 영역 */}
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${slide * 100}vw)` }}
      >
        {/* 첫 화면: 팀명 + 일정(비워둠) */}
        <section className="w-screen flex flex-col items-center justify-start pt-12 px-4">
          <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-purple-900 mb-2 text-center drop-shadow-lg">
            FC BRO
          </div>
          <div className="text-lg font-bold text-purple-400 mb-8 text-center">SOCCER TEAM</div>
          {/* 일정 영역 (비워둠) */}
          <div className="w-full h-40 bg-white/60 rounded-xl flex items-center justify-center text-gray-400 text-xl font-bold border-2 border-dashed border-gray-300">
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
        <section className="w-screen px-4 pt-8 pb-24 flex flex-col items-center bg-gradient-to-b from-pink-100 to-white">
          <div className="flex items-center justify-between w-full mb-4">
            <button
              className="text-purple-700 font-bold text-lg"
              onClick={() => setSlide(0)}
            >
              ←
            </button>
            <div className="font-bold text-xl text-purple-900">팀원 목록</div>
            <div style={{ width: 32 }} /> {/* placeholder for alignment */}
          </div>
          <div className="w-full max-w-md">
            {members.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>
      </div>
      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        <button
          className={`w-3 h-3 rounded-full ${slide === 0 ? "bg-purple-700" : "bg-gray-300"}`}
          onClick={() => setSlide(0)}
        />
        <button
          className={`w-3 h-3 rounded-full ${slide === 1 ? "bg-purple-700" : "bg-gray-300"}`}
          onClick={() => setSlide(1)}
        />
      </div>
    </div>
  );
}
