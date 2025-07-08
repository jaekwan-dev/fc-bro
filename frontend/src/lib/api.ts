import { Member, CreateMemberDto, UpdateMemberDto } from '@/types/member';

// Fixture 타입 정의 (새로운 스키마에 맞춤)
export interface Quarter {
  start: string;
  end: string;
}

export interface Fixture {
  id: number;
  date: string;
  time: string;
  gatherTime: number;
  lateTime: number;
  quarterTime: number;
  breakTime: number;
  quarters?: Quarter[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateFixtureDto {
  date: string;
  time: string;
  gatherTime: number;
  lateTime: number;
  quarterTime: number;
  breakTime: number;
  quarters?: Quarter[];
}

export interface UpdateFixtureDto {
  date?: string;
  time?: string;
  gatherTime?: number;
  lateTime?: number;
  quarterTime?: number;
  breakTime?: number;
  quarters?: Quarter[];
}

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://fc-bro-backend.onrender.com'
    : 'http://localhost:3001';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options?.headers,
      },
      mode: 'cors',
      credentials: 'omit',
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    // 204 No Content 처리
    if (response.status === 204) {
      return null as T;
    }

    // 응답이 비어있지 않은 경우만 파싱
    const text = await response.text();
    if (!text) return null as T;
    return JSON.parse(text);
  }

  // Members API
  async getMembers(): Promise<Member[]> {
    return this.request<Member[]>('/api/members');
  }

  async getMember(id: string): Promise<Member> {
    return this.request<Member>(`/api/members/${id}`);
  }

  async createMember(member: CreateMemberDto): Promise<Member> {
    return this.request<Member>('/api/members', {
      method: 'POST',
      body: JSON.stringify(member),
    });
  }

  async updateMember(id: string, member: UpdateMemberDto): Promise<Member> {
    return this.request<Member>(`/api/members/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(member),
    });
  }

  async deleteMember(id: string): Promise<void> {
    await this.request(`/api/members/${id}`, {
      method: 'DELETE',
    });
  }

  // Fixtures API
  async getFixtures(): Promise<Fixture[]> {
    return this.request<Fixture[]>('/api/fixtures');
  }

  async getNextFixture(): Promise<Fixture | null> {
    return this.request<Fixture | null>('/api/fixtures/next');
  }

  async getFixture(id: string): Promise<Fixture> {
    return this.request<Fixture>(`/api/fixtures/${id}`);
  }

  async createFixture(fixture: CreateFixtureDto): Promise<Fixture> {
    return this.request<Fixture>('/api/fixtures', {
      method: 'POST',
      body: JSON.stringify(fixture),
    });
  }

  async updateFixture(id: string, fixture: UpdateFixtureDto): Promise<Fixture> {
    return this.request<Fixture>(`/api/fixtures/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(fixture),
    });
  }

  async deleteFixture(id: string): Promise<void> {
    await this.request(`/api/fixtures/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
