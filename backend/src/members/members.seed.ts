import { Injectable, Inject } from '@nestjs/common';
import { members } from '../database/schema';

@Injectable()
export class MembersSeedService {
  constructor(@Inject('DRIZZLE') private readonly db: any) {}

  async seed() {
    const existingMembers = await this.db.select().from(members);
    if (existingMembers.length > 0) {
      console.log('Members already exist, skipping seed');
      return;
    }

    const sampleMembers = [
      // 노랑팀 (1-14번)
      {
        name: '홍길동',
        birthYear: 1998,
        age: 25,
        backNumber: 10,
        mainPosition: 'FW',
        subPosition: ['MF'],
        mainLevel: '프로',
        subLevel: 3,
        preferredFoot: '오른발',
        totalGames: 15,
        attendance: 12,
        profileUrl: '',
        favoritePlayer: '손흥민',
        favoriteTeam: '맨체스터 유나이티드',
        injuries: [
          {
            id: '1',
            injuryName: '무릎 인대 손상',
            startDate: '2024-11-01',
            endDate: '2024-12-15',
            isActive: true,
          },
        ],
      },
      {
        name: '김철수',
        birthYear: 1995,
        age: 28,
        backNumber: 1,
        mainPosition: 'GK',
        subPosition: ['DF'],
        mainLevel: '세미프로',
        subLevel: 2,
        preferredFoot: '왼발',
        totalGames: 15,
        attendance: 14,
        profileUrl: '',
        favoritePlayer: '메시',
        favoriteTeam: '레알 마드리드',
      },
      {
        name: '박민수',
        birthYear: 1997,
        age: 26,
        backNumber: 7,
        mainPosition: 'MF',
        subPosition: ['FW', 'DF'],
        mainLevel: '아마추어',
        subLevel: 4,
        preferredFoot: '양발',
        totalGames: 12,
        attendance: 10,
        profileUrl: '',
        favoritePlayer: '케인',
        favoriteTeam: '토트넘',
        injuries: [
          {
            id: '2',
            injuryName: '발목 염좌',
            startDate: '2024-11-15',
            endDate: '2024-12-20',
            isActive: true,
          },
        ],
      },
      {
        name: '이준호',
        birthYear: 1999,
        age: 24,
        backNumber: 3,
        mainPosition: 'DF',
        subPosition: ['MF'],
        mainLevel: '루키',
        subLevel: 2,
        preferredFoot: '오른발',
        totalGames: 13,
        attendance: 11,
        profileUrl: '',
        favoritePlayer: '반다이크',
        favoriteTeam: '리버풀',
      },
      {
        name: '정우진',
        birthYear: 1996,
        age: 27,
        backNumber: 9,
        mainPosition: 'FW',
        subPosition: ['MF'],
        mainLevel: '프로',
        subLevel: 3,
        preferredFoot: '오른발',
        totalGames: 14,
        attendance: 13,
        profileUrl: '',
        favoritePlayer: '하알란드',
        favoriteTeam: '맨체스터 시티',
      },
    ];

    for (const memberData of sampleMembers) {
      await this.db.insert(members).values({
        ...memberData,
        injuries: memberData.injuries
          ? JSON.stringify(memberData.injuries)
          : null,
      });
    }

    console.log(`Seeded ${sampleMembers.length} members`);
  }
}
