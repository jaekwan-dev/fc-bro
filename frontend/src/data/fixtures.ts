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
  {
    id: 2,
    date: "12월 22일",
    time: "16:00",
    opponent: "SEOUL FC",
    location: "잠실종합운동장",
    type: "친선경기",
  },
  {
    id: 3,
    date: "12월 29일",
    time: "15:00",
    opponent: "VICTORY FC",
    location: "상암월드컵경기장",
    type: "컵대회",
  },
]
