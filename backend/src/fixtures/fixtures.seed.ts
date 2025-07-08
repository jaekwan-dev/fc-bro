import { Injectable, Inject } from '@nestjs/common';
import { fixtures } from '../database/schema';

@Injectable()
export class FixturesSeedService {
  constructor(@Inject('DRIZZLE') private readonly db: any) {}

  async seed() {
    const existingFixtures = await this.db.select().from(fixtures);
    if (existingFixtures.length > 0) {
      console.log('Fixtures already exist, skipping seed');
      return;
    }

    const sampleFixtures = [
      {
        date: new Date('2024-12-15T07:00:00Z'),
        time: '07:00',
        gatherTime: 20,
        lateTime: 10,
        quarterTime: 25,
        breakTime: 5,
        quarters: JSON.stringify([
          { start: '07:00', end: '07:25' },
          { start: '07:30', end: '07:55' },
          { start: '08:00', end: '08:25' },
          { start: '08:30', end: '08:55' },
        ]),
      },
      {
        date: new Date('2024-12-22T08:00:00Z'),
        time: '08:00',
        gatherTime: 15,
        lateTime: 5,
        quarterTime: 20,
        breakTime: 10,
        quarters: JSON.stringify([
          { start: '08:00', end: '08:20' },
          { start: '08:30', end: '08:50' },
          { start: '09:00', end: '09:20' },
          { start: '09:30', end: '09:50' },
        ]),
      },
      {
        date: new Date('2024-12-29T09:00:00Z'),
        time: '09:00',
        gatherTime: 25,
        lateTime: 15,
        quarterTime: 30,
        breakTime: 5,
        quarters: JSON.stringify([
          { start: '09:00', end: '09:30' },
          { start: '09:35', end: '10:05' },
          { start: '10:10', end: '10:40' },
          { start: '10:45', end: '11:15' },
        ]),
      },
    ];

    for (const fixtureData of sampleFixtures) {
      await this.db.insert(fixtures).values(fixtureData);
    }

    console.log(`Seeded ${sampleFixtures.length} fixtures`);
  }
}
