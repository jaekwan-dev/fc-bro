import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { db } from '../database/connection';
import {
  members,
  Member,
  NewMember,
  CreateMemberDto,
  UpdateMemberDto,
} from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class MembersService {
  constructor(@Inject('DRIZZLE') private readonly db: any) {}

  async findAll(): Promise<Member[]> {
    return await this.db.select().from(members).orderBy(members.backNumber);
  }

  async findOne(id: string): Promise<Member> {
    const result = await this.db
      .select()
      .from(members)
      .where(eq(members.id, id));
    if (!result[0])
      throw new NotFoundException('해당 멤버를 찾을 수 없습니다.');
    return result[0];
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    // DTO를 Drizzle 스키마에 맞게 변환
    const memberData: NewMember = {
      name: createMemberDto.name,
      birthYear: createMemberDto.birthYear,
      age:
        createMemberDto.age ||
        (createMemberDto.birthYear
          ? new Date().getFullYear() - createMemberDto.birthYear
          : 25), // age가 없으면 birthYear로 계산
      backNumber: createMemberDto.backNumber,
      mainPosition: createMemberDto.mainPosition,
      subPosition: createMemberDto.subPosition ?? [],
      mainLevel: createMemberDto.mainLevel,
      subLevel: createMemberDto.subLevel,
      preferredFoot: createMemberDto.preferredFoot,
      shoeSize: createMemberDto.shoeSize,
      footballBoots: createMemberDto.footballBoots,
      favoritePlayer: createMemberDto.favoritePlayer,
      favoriteTeam: createMemberDto.favoriteTeam,
      profileUrl: createMemberDto.profileUrl,
      injuries: createMemberDto.injuries
        ? JSON.stringify(createMemberDto.injuries)
        : null,
    };

    const [created] = await this.db
      .insert(members)
      .values(memberData)
      .returning();
    return created;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.findOne(id);
    if (!member) {
      throw new NotFoundException('해당 멤버를 찾을 수 없습니다.');
    }

    // 백넘버 중복 검사 (다른 멤버와)
    if (updateMemberDto.backNumber) {
      const existingMember = await this.db
        .select()
        .from(members)
        .where(eq(members.backNumber, updateMemberDto.backNumber));
      if (existingMember[0] && existingMember[0].id !== id) {
        throw new Error(
          `Back number ${updateMemberDto.backNumber} is already taken`,
        );
      }
    }

    // 업데이트 데이터 준비
    const updateData: Partial<NewMember> = {};
    if (updateMemberDto.name !== undefined)
      updateData.name = updateMemberDto.name;
    if (updateMemberDto.birthYear !== undefined)
      updateData.birthYear = updateMemberDto.birthYear;
    if (updateMemberDto.age !== undefined) updateData.age = updateMemberDto.age;
    if (updateMemberDto.backNumber !== undefined)
      updateData.backNumber = updateMemberDto.backNumber;
    if (updateMemberDto.mainPosition !== undefined)
      updateData.mainPosition = updateMemberDto.mainPosition;
    if (updateMemberDto.subPosition !== undefined)
      updateData.subPosition = updateMemberDto.subPosition;
    if (updateMemberDto.mainLevel !== undefined)
      updateData.mainLevel = updateMemberDto.mainLevel;
    if (updateMemberDto.subLevel !== undefined)
      updateData.subLevel = updateMemberDto.subLevel;
    if (updateMemberDto.preferredFoot !== undefined)
      updateData.preferredFoot = updateMemberDto.preferredFoot;
    if (updateMemberDto.shoeSize !== undefined)
      updateData.shoeSize = updateMemberDto.shoeSize;
    if (updateMemberDto.footballBoots !== undefined)
      updateData.footballBoots = updateMemberDto.footballBoots;
    if (updateMemberDto.favoritePlayer !== undefined)
      updateData.favoritePlayer = updateMemberDto.favoritePlayer;
    if (updateMemberDto.favoriteTeam !== undefined)
      updateData.favoriteTeam = updateMemberDto.favoriteTeam;
    if (updateMemberDto.profileUrl !== undefined)
      updateData.profileUrl = updateMemberDto.profileUrl;
    if (updateMemberDto.injuries !== undefined)
      updateData.injuries = JSON.stringify(updateMemberDto.injuries);

    const [updated] = await this.db
      .update(members)
      .set(updateData)
      .where(eq(members.id, id))
      .returning();
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.db
      .delete(members)
      .where(eq(members.id, id))
      .returning();
    if (!deleted[0])
      throw new NotFoundException('해당 멤버를 찾을 수 없습니다.');
  }
}
