export interface Fixture {
  id: number
  date: string
  time: string
  opponent: string
  location: string
  type: string
}

export const fixtures: Fixture[] = [
  {
    id: 1,
    date: "12월 15일",
    time: "14:00",
    opponent: "FC UNITED",
    location: "서울월드컵경기장",
    type: "리그전",
  },
]
