export interface Fixture {
  id: number;
  date: string;
  time: string;
  gatherTime: number;
  lateTime: number;
  quarterTime: number;
  breakTime: number;
  quarters?: { start: string; end: string }[];
}

export const fixtures: Fixture[] = [
  {
    id: 1,
    date: '2024-12-15',
    time: '07:00',
    gatherTime: 20,
    lateTime: 10,
    quarterTime: 25,
    breakTime: 5,
    quarters: [
      { start: '07:00', end: '07:25' },
      { start: '07:30', end: '07:55' },
      { start: '08:00', end: '08:25' },
      { start: '08:30', end: '08:55' },
    ],
  },
];
