export interface Injury {
  id: string
  injuryName: string
  startDate: string
  endDate?: string
  isActive: boolean
}

export interface Member {
  id: string
  name: string
  birthYear?: number
  age: number
  backNumber: number
  mainPosition: string
  subPosition: string[]
  mainLevel: "프로" | "세미프로" | "아마추어" | "루키"
  subLevel: number
  preferredFoot?: "오른발" | "왼발" | "양발"
  shoeSize?: number
  footballBoots?: string
  roleModel?: string
  totalGames: number
  attendance: number
  profileUrl: string
  injuries?: Injury[]
  createdAt: Date
  updatedAt: Date
}

export interface CreateMemberDto {
  name: string;
  birthYear?: number;
  backNumber?: number;
  mainPosition?: string;
  subPosition?: string[];
  mainLevel?: "프로" | "세미프로" | "아마추어" | "루키";
  subLevel?: number;
  preferredFoot?: "오른발" | "왼발" | "양발";
  profileUrl?: string;
}

export interface UpdateMemberDto {
  name?: string;
  birthYear?: number;
  age?: number;
  backNumber?: number;
  mainPosition?: string;
  subPosition?: string[];
  mainLevel?: "프로" | "세미프로" | "아마추어" | "루키";
  subLevel?: number;
  preferredFoot?: "오른발" | "왼발" | "양발";
  shoeSize?: number;
  footballBoots?: string;
  roleModel?: string;
  profileUrl?: string;
  injuries?: Injury[];
} 