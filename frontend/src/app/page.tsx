'use client';

import { useState, useEffect } from 'react';
import { members } from '@/data/members';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, MapPin } from 'lucide-react';
import { PositionSection } from '@/components/PositionSection';
import { AddMemberForm } from '@/components/AddMemberForm';
import { Member } from '@/types/member';
import { apiClient, Fixture } from '@/lib/api';
import Image from 'next/image';
import { RegisterGameForm } from '@/components/RegisterGameForm';

export default function Home() {
  const [search, setSearch] = useState('');
  const [membersData, setMembersData] = useState<Member[]>(members);
  const [fixturesData, setFixturesData] = useState<Fixture[]>([]);
  const [nextFixture, setNextFixture] = useState<Fixture | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [hideSplash, setHideSplash] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'schedule' | 'register' | 'members' | 'addMember'
  >('schedule');
  const [activePositionTab, setActivePositionTab] = useState<string>('ALL');

  // 경기 시간 계산 함수 (등록화면과 동일한 로직)
  // 실제 시간 계산 함수
  const calculateActualTime = (meetingTime: string, minutesBefore: number) => {
    const [hour, minute] = meetingTime.split(':').map(Number);
    const meetingMinutes = hour * 60 + minute;
    const actualMinutes = meetingMinutes - minutesBefore;

    const h = Math.floor(actualMinutes / 60);
    const m = actualMinutes % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
  };

  const calculateGameTimes = (
    meetingTime: string,
    quarterTime: number = 25,
    breakTime: number = 5
  ) => {
    const [hour, minute] = meetingTime.split(':').map(Number);
    const meetingMinutes = hour * 60 + minute;

    const lateCheckMinutes = meetingMinutes + 10;
    const firstQuarterStartMinutes = meetingMinutes;

    const formatTime = (totalMinutes: number) => {
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;
      return `${h}:${m.toString().padStart(2, '0')}`;
    };

    const formatQuarterTime = (startMinutes: number) => {
      const start = formatTime(startMinutes);
      const end = formatTime(startMinutes + quarterTime);
      return `${start}~${end}`;
    };

    // 쿼터별 시간 계산 (등록화면과 동일한 로직)
    const quarters = [];
    let currentTime = firstQuarterStartMinutes;

    for (let i = 0; i < 4; i++) {
      const start = currentTime;
      const end = start + quarterTime;
      quarters.push(formatQuarterTime(start));

      // 다음 쿼터 시작 시간 (쉬는 시간 포함)
      if (i < 3) {
        currentTime = end + breakTime;
      }
    }

    return {
      lateCheck: formatTime(lateCheckMinutes),
      quarters: quarters,
    };
  };

  const positions = ['ALL', 'GK', 'DF', 'MF', 'FW'];

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const members = await apiClient.getMembers();
      setMembersData(members);
      console.log('DB에서 팀원 데이터 로드:', members);
    } catch (err) {
      console.error('팀원 데이터 로드 실패:', err);
      // API 실패 시 로컬 데이터 사용
      setMembersData(members);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFixtures = async () => {
    try {
      const fixtures = await apiClient.getFixtures();
      setFixturesData(fixtures);
      console.log('DB에서 경기 일정 로드:', fixtures);
    } catch (err) {
      console.error('경기 일정 로드 실패:', err);
      // API 실패 시 빈 배열 사용
      setFixturesData([]);
    }
  };

  const fetchNextFixture = async () => {
    try {
      const next = await apiClient.getNextFixture();
      setNextFixture(next);
      console.log('다음 경기 정보 로드:', next);
    } catch (err) {
      console.error('다음 경기 정보 로드 실패:', err);
      // API 실패 시 기본값 사용
      setNextFixture(null);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchFixtures();
    fetchNextFixture();
  }, []);

  // 스플래시(엠블럼) 화면 2초 후 자동 전환 + 페이드아웃 효과
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => setHideSplash(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  useEffect(() => {
    if (hideSplash) {
      const timer = setTimeout(() => setShowSplash(false), 500);
      return () => clearTimeout(timer);
    }
  }, [hideSplash]);

  const filtered = membersData.filter(m => {
    const matchesSearch =
      m.name.includes(search) || m.mainPosition.includes(search);
    return matchesSearch;
  });

  const handleAddSuccess = () => {
    setActiveTab('members');
    fetchMembers();
  };

  // 다음 경기 정보 (DB에서 가져온 데이터 또는 기본값)
  const nextGame = nextFixture
    ? {
        date: new Date(nextFixture.date).toLocaleDateString('ko-KR', {
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        }),
        meetingTime: nextFixture.time,
        gatherTime: nextFixture.gatherTime,
        lateTime: nextFixture.lateTime,
      }
    : {
        date: '12월 15일 (일요일)',
        meetingTime: '07:00',
        gatherTime: 20,
        lateTime: 10,
      };

  const gameTimes = nextFixture
    ? calculateGameTimes(
        nextGame.meetingTime,
        nextFixture.quarterTime,
        nextFixture.breakTime
      )
    : calculateGameTimes(nextGame.meetingTime);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 상단 네비게이션 바 */}
      {!showSplash && (
        <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200 flex items-center justify-between px-2 sm:px-6 h-14">
          <button
            className={`flex-1 h-full text-center font-bold text-base sm:text-lg transition-colors ${activeTab === 'schedule' ? 'text-blue-700 border-b-2 border-blue-700 bg-white' : 'text-gray-500'}`}
            onClick={() => {
              setActiveTab('schedule');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            경기 일정
          </button>
          <button
            className={`flex-1 h-full text-center font-bold text-base sm:text-lg transition-colors ${activeTab === 'register' ? 'text-yellow-600 border-b-2 border-yellow-500 bg-white' : 'text-gray-500'}`}
            onClick={() => {
              setActiveTab('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            경기 등록
          </button>
          <button
            className={`flex-1 h-full text-center font-bold text-base sm:text-lg transition-colors ${activeTab === 'members' ? 'text-green-700 border-b-2 border-green-600 bg-white' : 'text-gray-500'}`}
            onClick={() => {
              setActiveTab('members');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            선수 관리
          </button>
        </nav>
      )}
      {showSplash ? (
        <div
          className={`flex items-center justify-center min-h-screen transition-opacity duration-500 ${hideSplash ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={{ backgroundColor: '#1B1A16' }}
        >
          <Image
            src="/fc-bro-emblem.jpg"
            alt="FC BRO 엠블럼"
            width={320}
            height={320}
            priority
          />
        </div>
      ) : activeTab === 'schedule' ? (
        // 메인(일정) 화면
        <div className="max-w-md mx-auto min-h-screen">
          {/* 헤더 */}
          <div className="px-6 pt-4 pb-4">
            <h1 className="text-2xl font-bold text-gray-900">다음 경기 일정</h1>
          </div>

          {/* 다음 경기 카드 */}
          <div className="px-4 mb-8">
            <div className="rounded-3xl shadow-xl border border-white/30 bg-white/30 backdrop-blur-lg p-6 flex flex-col gap-4 items-center relative overflow-hidden">
              <div className="flex flex-col items-center gap-2 mt-2">
                <div className="flex items-center gap-2 text-2xl font-extrabold text-[#18305a] tracking-tight">
                  <Clock className="w-6 h-6 text-blue-500" />
                  {nextGame.date}{' '}
                  <span className="text-blue-500">{nextGame.meetingTime}</span>
                </div>
                <div className="flex items-center gap-2 text-base font-semibold text-slate-700">
                  <MapPin className="w-5 h-5 text-yellow-500" />
                  집합:{' '}
                  {calculateActualTime(
                    nextGame.meetingTime,
                    nextGame.gatherTime
                  )}{' '}
                  | 지각체크:{' '}
                  {calculateActualTime(nextGame.meetingTime, nextGame.lateTime)}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 w-full mt-2">
                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                  {gameTimes.quarters.map((q, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center bg-white/60 rounded-xl p-2 shadow border border-blue-100"
                    >
                      <span className="text-xs font-bold text-blue-600 mb-1">
                        {i + 1}Q
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {q}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 경기 일정 목록 */}
          <div className="px-4 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              전체 경기 일정
            </h2>
            <div className="space-y-3">
              {fixturesData.map(fixture => (
                <div
                  key={fixture.id}
                  className="rounded-2xl shadow-lg border border-white/30 bg-white/30 backdrop-blur-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <div className="text-base font-bold text-gray-900">
                          {new Date(fixture.date).toLocaleDateString('ko-KR', {
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long',
                          })}{' '}
                          {fixture.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          집합:{' '}
                          {calculateActualTime(
                            fixture.time,
                            fixture.gatherTime
                          )}{' '}
                          | 지각체크:{' '}
                          {calculateActualTime(fixture.time, fixture.lateTime)}
                        </div>
                        <div className="text-xs text-gray-500">
                          쿼터: {fixture.quarterTime}분 | 쉬는시간:{' '}
                          {fixture.breakTime}분
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {fixture.quarters?.length || 0}Q
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'register' ? (
        // 경기 등록 화면
        <div className="max-w-md mx-auto min-h-screen">
          <RegisterGameForm />
        </div>
      ) : activeTab === 'addMember' ? (
        // 선수 등록 화면
        <div className="max-w-md mx-auto min-h-screen">
          <AddMemberForm
            onSuccess={handleAddSuccess}
            onCancel={() => setActiveTab('members')}
          />
        </div>
      ) : (
        // 선수 관리 화면
        <div className="max-w-md mx-auto min-h-screen">
          {/* 검색 및 필터 */}
          <div className="px-4 pt-4 pb-2">
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="이름 또는 포지션 검색"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={() => setActiveTab('addMember')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4"
              >
                +
              </Button>
            </div>

            {/* 포지션별 탭 */}
            <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg">
              {positions.map(pos => (
                <button
                  key={pos}
                  onClick={() => setActivePositionTab(pos)}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    activePositionTab === pos
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {pos === 'ALL' ? '전체' : pos}
                </button>
              ))}
            </div>
          </div>

          {/* 팀원 목록 */}
          <div className="px-4 pb-24">
            {isLoading ? (
              <div className="text-center py-8">로딩 중...</div>
            ) : (
              <>
                {activePositionTab === 'ALL' && (
                  <>
                    <PositionSection
                      title="골키퍼"
                      members={filtered.filter(m => m.mainPosition === 'GK')}
                      gradient="border-blue-200 bg-blue-50"
                      onMemberClick={member => {
                        console.log('팀원 클릭:', member);
                      }}
                    />
                    <PositionSection
                      title="수비수"
                      members={filtered.filter(m => m.mainPosition === 'DF')}
                      gradient="border-green-200 bg-green-50"
                      onMemberClick={member => {
                        console.log('팀원 클릭:', member);
                      }}
                    />
                    <PositionSection
                      title="미드필더"
                      members={filtered.filter(m => m.mainPosition === 'MF')}
                      gradient="border-purple-200 bg-purple-50"
                      onMemberClick={member => {
                        console.log('팀원 클릭:', member);
                      }}
                    />
                    <PositionSection
                      title="공격수"
                      members={filtered.filter(m => m.mainPosition === 'FW')}
                      gradient="border-orange-200 bg-orange-50"
                      onMemberClick={member => {
                        console.log('팀원 클릭:', member);
                      }}
                    />
                  </>
                )}
                {activePositionTab === 'GK' && (
                  <PositionSection
                    title="골키퍼"
                    members={filtered.filter(m => m.mainPosition === 'GK')}
                    gradient="border-blue-200 bg-blue-50"
                    onMemberClick={member => {
                      console.log('팀원 클릭:', member);
                    }}
                  />
                )}
                {activePositionTab === 'DF' && (
                  <PositionSection
                    title="수비수"
                    members={filtered.filter(m => m.mainPosition === 'DF')}
                    gradient="border-green-200 bg-green-50"
                    onMemberClick={member => {
                      console.log('팀원 클릭:', member);
                    }}
                  />
                )}
                {activePositionTab === 'MF' && (
                  <PositionSection
                    title="미드필더"
                    members={filtered.filter(m => m.mainPosition === 'MF')}
                    gradient="border-purple-200 bg-purple-50"
                    onMemberClick={member => {
                      console.log('팀원 클릭:', member);
                    }}
                  />
                )}
                {activePositionTab === 'FW' && (
                  <PositionSection
                    title="공격수"
                    members={filtered.filter(m => m.mainPosition === 'FW')}
                    gradient="border-orange-200 bg-orange-50"
                    onMemberClick={member => {
                      console.log('팀원 클릭:', member);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
