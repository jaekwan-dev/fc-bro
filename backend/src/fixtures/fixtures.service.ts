import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  fixtures,
  Fixture,
  NewFixture,
  CreateFixtureDto,
  UpdateFixtureDto,
} from '../database/schema';
import { eq, gte, asc } from 'drizzle-orm';

@Injectable()
export class FixturesService {
  constructor(@Inject('DRIZZLE') private readonly db: any) {}

  async findAll(): Promise<Fixture[]> {
    const today = new Date();
    return await this.db
      .select()
      .from(fixtures)
      .where(gte(fixtures.date, today))
      .orderBy(asc(fixtures.date), asc(fixtures.time));
  }

  async findOne(id: number): Promise<Fixture> {
    const result = await this.db
      .select()
      .from(fixtures)
      .where(eq(fixtures.id, id));
    if (!result[0]) {
      throw new NotFoundException(`Fixture with ID ${id} not found`);
    }
    return result[0];
  }

  async create(createFixtureDto: CreateFixtureDto): Promise<Fixture> {
    // DTO를 Drizzle 스키마에 맞게 변환
    const fixtureData: NewFixture = {
      date: new Date(createFixtureDto.date),
      time: createFixtureDto.time,
      gatherTime: createFixtureDto.gatherTime,
      lateTime: createFixtureDto.lateTime,
      quarterTime: createFixtureDto.quarterTime,
      breakTime: createFixtureDto.breakTime,
      quarters: createFixtureDto.quarters
        ? JSON.stringify(createFixtureDto.quarters)
        : null,
    };

    const [created] = await this.db
      .insert(fixtures)
      .values(fixtureData)
      .returning();
    return created;
  }

  async update(
    id: number,
    updateFixtureDto: UpdateFixtureDto,
  ): Promise<Fixture> {
    // 업데이트 데이터 준비
    const updateData: Partial<NewFixture> = {};
    if (updateFixtureDto.date !== undefined)
      updateData.date = new Date(updateFixtureDto.date);
    if (updateFixtureDto.time !== undefined)
      updateData.time = updateFixtureDto.time;
    if (updateFixtureDto.gatherTime !== undefined)
      updateData.gatherTime = updateFixtureDto.gatherTime;
    if (updateFixtureDto.lateTime !== undefined)
      updateData.lateTime = updateFixtureDto.lateTime;
    if (updateFixtureDto.quarterTime !== undefined)
      updateData.quarterTime = updateFixtureDto.quarterTime;
    if (updateFixtureDto.breakTime !== undefined)
      updateData.breakTime = updateFixtureDto.breakTime;
    if (updateFixtureDto.quarters !== undefined) {
      updateData.quarters = JSON.stringify(updateFixtureDto.quarters);
    }

    const [updated] = await this.db
      .update(fixtures)
      .set(updateData)
      .where(eq(fixtures.id, id))
      .returning();
    if (!updated) {
      throw new NotFoundException(`Fixture with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.db
      .delete(fixtures)
      .where(eq(fixtures.id, id))
      .returning();
    if (!deleted[0]) {
      throw new NotFoundException(`Fixture with ID ${id} not found`);
    }
  }

  async getNextFixture(): Promise<Fixture | null> {
    const today = new Date();

    const result = await this.db
      .select()
      .from(fixtures)
      .where(gte(fixtures.date, today))
      .orderBy(asc(fixtures.date), asc(fixtures.time))
      .limit(1);

    return result[0] || null;
  }
}
