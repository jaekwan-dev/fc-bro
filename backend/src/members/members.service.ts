import { Injectable, NotFoundException } from '@nestjs/common';
import { Member, CreateMemberDto, UpdateMemberDto } from './member.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MembersService {
  private members: Member[] = [
    {
      id: '1',
      name: '홍길동',
      age: 25,
      backNumber: 10,
      mainPosition: 'FW',
      subPosition: ['MF'],
      mainLevel: '프로',
      subLevel: 3,
      totalGames: 10,
      attendance: 3,
      profileUrl: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: '김철수',
      age: 28,
      backNumber: 1,
      mainPosition: 'GK',
      subPosition: ['DF'],
      mainLevel: '프로',
      subLevel: 2,
      totalGames: 10,
      attendance: 7,
      profileUrl: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll(): Member[] {
    return this.members;
  }

  findOne(id: string): Member {
    const member = this.members.find(m => m.id === id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  create(createMemberDto: CreateMemberDto): Member {
    // 백넘버 중복 검사
    const existingMember = this.members.find(m => m.backNumber === createMemberDto.backNumber);
    if (existingMember) {
      throw new Error(`Back number ${createMemberDto.backNumber} is already taken`);
    }

    const newMember: Member = {
      id: uuidv4(),
      ...createMemberDto,
      subPosition: createMemberDto.subPosition || [],
      totalGames: 0,
      attendance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.members.push(newMember);
    return newMember;
  }

  update(id: string, updateMemberDto: UpdateMemberDto): Member {
    const memberIndex = this.members.findIndex(m => m.id === id);
    if (memberIndex === -1) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    // 백넘버 중복 검사 (다른 멤버와)
    if (updateMemberDto.backNumber) {
      const existingMember = this.members.find(m => m.backNumber === updateMemberDto.backNumber && m.id !== id);
      if (existingMember) {
        throw new Error(`Back number ${updateMemberDto.backNumber} is already taken`);
      }
    }

    const updatedMember = {
      ...this.members[memberIndex],
      ...updateMemberDto,
      updatedAt: new Date(),
    };
    
    this.members[memberIndex] = updatedMember;
    return updatedMember;
  }

  remove(id: string): void {
    const memberIndex = this.members.findIndex(m => m.id === id);
    if (memberIndex === -1) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    this.members.splice(memberIndex, 1);
  }
} 