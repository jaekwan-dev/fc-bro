'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Member, UpdateMemberDto } from '@/types/member';
import { apiClient } from '@/lib/api';

interface MemberEditFormProps {
  member: Member;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const positions = ['GK', 'DF', 'MF', 'FW'];
const levels = ['프로', '세미프로', '아마추어', '루키'];
const feet = ['오른발', '왼발', '양발'];

export function MemberEditForm({
  member,
  onSuccess,
  onCancel,
}: MemberEditFormProps) {
  const [formData, setFormData] = useState<UpdateMemberDto>({
    name: member.name,
    birthYear: member.birthYear,
    backNumber: member.backNumber,
    mainPosition: member.mainPosition,
    subPosition: member.subPosition || [],
    mainLevel: member.mainLevel,
    subLevel: member.subLevel,
    preferredFoot: member.preferredFoot,
    shoeSize: member.shoeSize,
    footballBoots: member.footballBoots,
    favoritePlayer: member.favoritePlayer,
    favoriteTeam: member.favoriteTeam,
    profileUrl: member.profileUrl,
    injuries: member.injuries,
  });

  // 부포지션 레벨을 주포지션보다 하나 낮게 자동 계산
  const getSubLevel = (mainLevel: string): number => {
    const levelMap = { 프로: 5, 세미프로: 4, 아마추어: 3, 루키: 2 };
    const mainLevelValue = levelMap[mainLevel as keyof typeof levelMap] || 3;
    return Math.max(2, mainLevelValue - 1); // 최소값은 2 (루키)
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.name?.trim()) {
      errors.name = '이름을 입력해주세요';
    }

    if (
      !formData.birthYear ||
      formData.birthYear < 1970 ||
      formData.birthYear > 2010
    ) {
      errors.birthYear = '출생년도는 1970년부터 2010년 사이여야 합니다';
    }

    if (
      !formData.backNumber ||
      formData.backNumber < 1 ||
      formData.backNumber > 99
    ) {
      errors.backNumber = '등번호는 1-99 사이여야 합니다';
    }

    if (!formData.mainPosition) {
      errors.mainPosition = '주 포지션을 선택해주세요';
    }

    if (!formData.mainLevel) {
      errors.mainLevel = '주 포지션 레벨을 선택해주세요';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await apiClient.updateMember(member.id, formData);
      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '팀원 수정에 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubPositionChange = (position: string, checked: boolean) => {
    const currentSubPositions = formData.subPosition || [];
    if (checked) {
      setFormData({
        ...formData,
        subPosition: [...currentSubPositions, position],
      });
    } else {
      setFormData({
        ...formData,
        subPosition: currentSubPositions.filter(pos => pos !== position),
      });
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            팀원 정보 수정
          </h1>
          <p className="text-gray-600">{member.name}의 정보를 수정해보세요</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xs">!</span>
            </div>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 섹션 */}
          <Card className="border-0 shadow-lg">
            <CardContent className="px-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                기본 정보
              </h3>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    이름
                  </Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="선수 이름을 입력하세요"
                    className={`h-12 text-base ${validationErrors.name ? 'border-red-500' : ''}`}
                    required
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="birthYear"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      출생년도
                    </Label>
                    <Input
                      id="birthYear"
                      type="number"
                      min="1970"
                      max="2010"
                      placeholder="YYYY"
                      value={formData.birthYear || ''}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          birthYear: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={`h-12 text-base ${validationErrors.birthYear ? 'border-red-500' : ''}`}
                      required
                    />
                    {validationErrors.birthYear && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.birthYear}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="backNumber"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      백넘버
                    </Label>
                    <Input
                      id="backNumber"
                      type="number"
                      min="1"
                      max="99"
                      value={formData.backNumber || ''}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          backNumber: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={`h-12 text-base ${validationErrors.backNumber ? 'border-red-500' : ''}`}
                      required
                    />
                    {validationErrors.backNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.backNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    주발
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {feet.map(foot => (
                      <button
                        key={foot}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            preferredFoot: foot as '오른발' | '왼발' | '양발',
                          })
                        }
                        className={`p-4 text-center rounded-lg border-2 transition-all ${
                          formData.preferredFoot === foot
                            ? 'border-purple-500 bg-purple-50 text-purple-700 font-semibold'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {foot}
                      </button>
                    ))}
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
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    주 포지션
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {positions.map(pos => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, mainPosition: pos })
                        }
                        className={`p-4 text-center rounded-lg border-2 transition-all ${
                          formData.mainPosition === pos
                            ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        } ${validationErrors.mainPosition ? 'border-red-500' : ''}`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                  {validationErrors.mainPosition && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.mainPosition}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    주 포지션 레벨
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {levels.map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            mainLevel: level as
                              | '프로'
                              | '세미프로'
                              | '아마추어'
                              | '루키',
                            subLevel: getSubLevel(level),
                          });
                        }}
                        className={`p-4 text-center rounded-lg border-2 transition-all ${
                          formData.mainLevel === level
                            ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        } ${validationErrors.mainLevel ? 'border-red-500' : ''}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  {validationErrors.mainLevel && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.mainLevel}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    부 포지션 (다중 선택)
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {positions
                      .filter(pos => pos !== formData.mainPosition)
                      .map(pos => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => {
                            const isSelected =
                              formData.subPosition?.includes(pos) || false;
                            handleSubPositionChange(pos, !isSelected);
                          }}
                          className={`p-4 text-center rounded-lg border-2 transition-all ${
                            formData.subPosition?.includes(pos)
                              ? 'border-green-500 bg-green-50 text-green-700 font-semibold'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
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
                    <Label
                      htmlFor="shoeSize"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      발사이즈 (mm)
                    </Label>
                    <Input
                      id="shoeSize"
                      type="number"
                      min="200"
                      max="350"
                      placeholder="250"
                      value={formData.shoeSize || ''}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          shoeSize: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="footballBoots"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      축구화
                    </Label>
                    <Input
                      id="footballBoots"
                      value={formData.footballBoots || ''}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          footballBoots: e.target.value,
                        })
                      }
                      placeholder="축구화 모델명"
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="favoritePlayer"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    좋아하는 선수
                  </Label>
                  <Input
                    id="favoritePlayer"
                    value={formData.favoritePlayer || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        favoritePlayer: e.target.value,
                      })
                    }
                    placeholder="예: 손흥민, 메시, 호날두"
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="favoriteTeam"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    좋아하는 팀
                  </Label>
                  <Input
                    id="favoriteTeam"
                    value={formData.favoriteTeam || ''}
                    onChange={e =>
                      setFormData({ ...formData, favoriteTeam: e.target.value })
                    }
                    placeholder="예: 맨체스터 유나이티드, 레알 마드리드"
                    className="h-12 text-base"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 버튼 영역 */}
          <div className="flex gap-3 pt-4 pb-8">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 h-14 text-base font-semibold border-2 hover:bg-gray-50"
                disabled={isLoading}
              >
                취소
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-14 text-base font-bold bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  수정 중...
                </div>
              ) : (
                '정보 수정'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
