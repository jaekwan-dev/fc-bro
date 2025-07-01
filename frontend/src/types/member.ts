export interface Member {
  id: string
  name: string
  age: number
  backNumber: number
  mainPosition: string
  subPosition: string
  mainLevel: "프로" | "세미프로" | "아마추어" | "루키"
  subLevel: number
  totalGames: number
  attendance: number
  profileUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateMemberDto {
  name: string;
  age: number;
  backNumber: number;
  mainPosition: string;
  subPosition?: string;
  mainLevel: "프로" | "세미프로" | "아마추어" | "루키";
  subLevel?: number;
  profileUrl?: string;
}

export interface UpdateMemberDto {
  name?: string;
  age?: number;
  backNumber?: number;
  mainPosition?: string;
  subPosition?: string;
  mainLevel?: "프로" | "세미프로" | "아마추어" | "루키";
  subLevel?: number;
  profileUrl?: string;
} 