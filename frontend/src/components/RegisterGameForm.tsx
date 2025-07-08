import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { apiClient, CreateFixtureDto } from '@/lib/api';

const hourOptions = Array.from({ length: 24 }, (_, i) => i);
const minuteOptions = [0, 10, 20, 30, 40, 50];
const quarterTimeOptions = [15, 20, 25, 30, 35, 40]; // 쿼터당 시간 옵션 (5분 단위)
const breakTimeOptions = [0, 5, 10, 15, 20]; // 쉬는 시간 옵션 (5분 단위)
const gatherTimeOptions = [10, 15, 20, 25, 30]; // 집합 시간 옵션 (5분 단위)
const lateTimeOptions = [5, 10, 15, 20]; // 지각 체크 시간 옵션 (5분 단위)

function toTimeString(hour: number, minute: number) {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}
function fromTimeString(time: string) {
  const [h, m] = time.split(':').map(Number);
  return { hour: h, minute: m };
}
function addMinutes(time: string, minutes: number) {
  const { hour, minute } = fromTimeString(time);
  const date = new Date(0, 0, 0, hour, minute + minutes);
  return toTimeString(date.getHours(), date.getMinutes());
}

// CreateFixtureDto 타입을 string으로 맞추기 위해 임시로 재정의
interface FixedCreateFixtureDto extends Omit<CreateFixtureDto, 'date'> {
  date: string;
}

export function RegisterGameForm() {
  const [gameHour, setGameHour] = useState('7'); // 오전 7시
  const [gameMinute, setGameMinute] = useState('0'); // 00분
  const [gatherTime, setGatherTime] = useState('20'); // 집합 시간 (기본 20분전)
  const [lateTime, setLateTime] = useState('10'); // 지각 체크 시간 (기본 10분전)
  const [quarterTime, setQuarterTime] = useState('25'); // 쿼터당 시간 (기본 25분)
  const [breakTime, setBreakTime] = useState('5'); // 쉬는 시간 (기본 5분)
  const [quarters, setQuarters] = useState([
    { start: '', end: '' },
    { start: '', end: '' },
    { start: '', end: '' },
    { start: '', end: '' },
  ]);
  const [dateOpen, setDateOpen] = useState(false);
  const [gameDate, setGameDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 경기 시간, 쿼터 시간, 쉬는 시간, 집합/지각 시간 변경 시 자동 계산
  useEffect(() => {
    if (
      !gameHour ||
      !gameMinute ||
      !quarterTime ||
      !breakTime ||
      !gatherTime ||
      !lateTime
    )
      return;

    const gameTime = toTimeString(Number(gameHour), Number(gameMinute));
    setQuarters(prev => prev); // quarters 상태는 별도 useEffect에서 처리

    // 쿼터별 시간 자동 계산
    const quarterMinutes = Number(quarterTime);
    const breakMinutes = Number(breakTime);
    let currentTime = gameTime;

    const calculatedQuarters = [];
    for (let i = 0; i < 4; i++) {
      const start = currentTime;
      const end = addMinutes(currentTime, quarterMinutes);
      calculatedQuarters.push({ start, end });

      // 다음 쿼터 시작 시간 (쉬는 시간 포함)
      if (i < 3) {
        // 마지막 쿼터가 아니면 쉬는 시간 추가
        currentTime = addMinutes(end, breakMinutes);
      }
    }

    setQuarters(calculatedQuarters);
  }, [gameHour, gameMinute, quarterTime, breakTime, gatherTime, lateTime]);

  // 시(hour) 변경 시 분(minute)은 항상 00으로 자동 설정
  useEffect(() => {
    setGameMinute('0');
  }, [gameHour]);

  // 집합 시간과 지각 체크 시간 계산
  const gameTime = toTimeString(Number(gameHour), Number(gameMinute));
  const gatherTimeCalculated = gatherTime
    ? addMinutes(gameTime, -Number(gatherTime))
    : '';
  const lateTimeCalculated = lateTime
    ? addMinutes(gameTime, -Number(lateTime))
    : '';

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameDate) {
      setError('경기 날짜를 선택해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const fixtureData: FixedCreateFixtureDto = {
        date: gameDate.toISOString(),
        time: toTimeString(Number(gameHour), Number(gameMinute)),
        gatherTime: Number(gatherTime),
        lateTime: Number(lateTime),
        quarterTime: Number(quarterTime),
        breakTime: Number(breakTime),
        quarters: quarters,
      };

      await apiClient.createFixture(fixtureData);

      // 성공 시 폼 초기화
      setGameDate(undefined);
      setGameHour('7');
      setGameMinute('0');
      setGatherTime('20');
      setLateTime('10');
      setQuarterTime('25');
      setBreakTime('5');
      setQuarters([
        { start: '', end: '' },
        { start: '', end: '' },
        { start: '', end: '' },
        { start: '', end: '' },
      ]);

      alert('경기가 성공적으로 등록되었습니다!');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '경기 등록에 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="space-y-6 pb-24 w-full max-w-[390px] mx-auto p-4 md:p-8"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      <Card className="p-6 rounded-xl shadow-lg border-0 bg-white/80 w-full">
        <div className="space-y-6">
          {/* 날짜 */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              경기 날짜
            </label>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {gameDate ? (
                    format(gameDate, 'PPP')
                  ) : (
                    <span className="text-muted-foreground">
                      날짜를 선택하세요
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={gameDate}
                  onSelect={date => {
                    setGameDate(date);
                    setDateOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* 경기 시간 */}
          <div className="flex gap-3">
            <Select value={gameHour} onValueChange={setGameHour}>
              <SelectTrigger className="w-28 py-3">
                <SelectValue placeholder="시" />
              </SelectTrigger>
              <SelectContent>
                {hourOptions.map(h => (
                  <SelectItem key={h} value={h.toString()} className="py-3">
                    {h}시
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={gameMinute} onValueChange={setGameMinute}>
              <SelectTrigger className="w-28 py-3">
                <SelectValue placeholder="분" />
              </SelectTrigger>
              <SelectContent>
                {minuteOptions.map(m => (
                  <SelectItem key={m} value={m.toString()} className="py-3">
                    {m}분
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* 집합/지각 시간 설정 */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                집합 시간
              </label>
              <Select value={gatherTime} onValueChange={setGatherTime}>
                <SelectTrigger className="w-full py-3">
                  <SelectValue placeholder="집합 시간" />
                </SelectTrigger>
                <SelectContent>
                  {gatherTimeOptions.map(t => (
                    <SelectItem key={t} value={t.toString()} className="py-3">
                      {t}분전
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                지각 체크
              </label>
              <Select value={lateTime} onValueChange={setLateTime}>
                <SelectTrigger className="w-full py-3">
                  <SelectValue placeholder="지각 체크" />
                </SelectTrigger>
                <SelectContent>
                  {lateTimeOptions.map(t => (
                    <SelectItem key={t} value={t.toString()} className="py-3">
                      {t}분전
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* 쿼터 시간 설정 */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                쿼터당 시간
              </label>
              <Select value={quarterTime} onValueChange={setQuarterTime}>
                <SelectTrigger className="w-full py-3">
                  <SelectValue placeholder="쿼터 시간" />
                </SelectTrigger>
                <SelectContent>
                  {quarterTimeOptions.map(t => (
                    <SelectItem key={t} value={t.toString()} className="py-3">
                      {t}분
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                쉬는 시간
              </label>
              <Select value={breakTime} onValueChange={setBreakTime}>
                <SelectTrigger className="w-full py-3">
                  <SelectValue placeholder="쉬는 시간" />
                </SelectTrigger>
                <SelectContent>
                  {breakTimeOptions.map(t => (
                    <SelectItem key={t} value={t.toString()} className="py-3">
                      {t}분
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* 집합/지각/쿼터 요약 */}
          <div className="flex flex-col gap-1 text-sm text-gray-700 bg-gray-50 rounded-xl p-3 border">
            <div>
              집합 시간:{' '}
              <span className="font-bold text-blue-900">
                {gatherTimeCalculated}
              </span>
            </div>
            <div>
              지각 체크:{' '}
              <span className="font-bold text-red-600">
                {lateTimeCalculated}
              </span>
            </div>
            <div className="mt-2 font-semibold text-blue-900">쿼터별 시간</div>
            {quarters.map((q, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-8">{i + 1}Q</span>
                <span className="font-mono text-base">
                  {q.start}~{q.end}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <div className="fixed bottom-0 left-0 w-full max-w-[390px] mx-auto p-2 bg-gradient-to-t from-white/90 to-white/30 z-10">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              등록 중...
            </div>
          ) : (
            '등록'
          )}
        </Button>
      </div>
    </form>
  );
}
