import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  json,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Member 테이블 (기존 엔티티 구조에 맞춤)
export const members = pgTable('members', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  birthYear: integer('birth_year'),
  age: integer('age').notNull(),
  backNumber: integer('back_number').notNull().unique(),
  mainPosition: varchar('main_position', { length: 50 }).notNull(),
  subPosition: text('sub_position')
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  mainLevel: varchar('main_level', { length: 20 }).notNull(), // '프로' | '세미프로' | '아마추어' | '루키'
  subLevel: integer('sub_level'),
  preferredFoot: varchar('preferred_foot', { length: 10 }), // '오른발' | '왼발' | '양발'
  shoeSize: integer('shoe_size'),
  footballBoots: varchar('football_boots', { length: 100 }),
  favoritePlayer: varchar('favorite_player', { length: 100 }),
  favoriteTeam: varchar('favorite_team', { length: 100 }),
  totalGames: integer('total_games').default(0),
  attendance: integer('attendance').default(0),
  profileUrl: text('profile_url'),
  injuries: json('injuries'), // JSON으로 저장
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Fixture 테이블
export const fixtures = pgTable('fixtures', {
  id: serial('id').primaryKey(),
  date: timestamp('date').notNull(), // 경기 날짜
  time: varchar('time', { length: 10 }).notNull(), // 경기 시간 (HH:MM)
  gatherTime: integer('gather_time').notNull(), // 집합 시간 (분전)
  lateTime: integer('late_time').notNull(), // 지각 체크 시간 (분전)
  quarterTime: integer('quarter_time').notNull(), // 쿼터당 시간 (분)
  breakTime: integer('break_time').notNull(), // 쉬는 시간 (분)
  quarters: json('quarters'), // 쿼터별 시간 정보 (JSON)
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 타입 추출
export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;
export type Fixture = typeof fixtures.$inferSelect;
export type NewFixture = typeof fixtures.$inferInsert;

// 기존 DTO 타입들 (호환성을 위해 유지)
export interface Injury {
  id: string;
  injuryName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface CreateMemberDto {
  name: string;
  birthYear?: number;
  age: number;
  backNumber: number;
  mainPosition: string;
  subPosition?: string[];
  mainLevel: '프로' | '세미프로' | '아마추어' | '루키';
  subLevel?: number;
  preferredFoot?: '오른발' | '왼발' | '양발';
  shoeSize?: number;
  footballBoots?: string;
  favoritePlayer?: string;
  favoriteTeam?: string;
  profileUrl?: string;
  injuries?: Injury[];
}

export interface UpdateMemberDto {
  name?: string;
  birthYear?: number;
  age?: number;
  backNumber?: number;
  mainPosition?: string;
  subPosition?: string[];
  mainLevel?: '프로' | '세미프로' | '아마추어' | '루키';
  subLevel?: number;
  preferredFoot?: '오른발' | '왼발' | '양발';
  shoeSize?: number;
  footballBoots?: string;
  favoritePlayer?: string;
  favoriteTeam?: string;
  profileUrl?: string;
  injuries?: Injury[];
}

// Fixture 관련 DTO 타입들
export interface Quarter {
  start: string;
  end: string;
}

export interface CreateFixtureDto {
  date: Date;
  time: string; // HH:MM 형식
  gatherTime: number; // 분전
  lateTime: number; // 분전
  quarterTime: number; // 분
  breakTime: number; // 분
  quarters?: Quarter[];
}

export interface UpdateFixtureDto {
  date?: Date;
  time?: string;
  gatherTime?: number;
  lateTime?: number;
  quarterTime?: number;
  breakTime?: number;
  quarters?: Quarter[];
}
