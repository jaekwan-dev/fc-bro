import { Member, CreateMemberDto, UpdateMemberDto } from '@/types/member';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://fc-bro-backend.onrender.com' 
  : 'http://localhost:3001';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
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
}

export const apiClient = new ApiClient(); 