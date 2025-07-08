import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FixturesService } from './fixtures.service';
import {
  Fixture,
  CreateFixtureDto,
  UpdateFixtureDto,
} from '../database/schema';

@Controller('api/fixtures')
export class FixturesController {
  constructor(private readonly fixturesService: FixturesService) {}

  @Post()
  async create(@Body() createFixtureDto: CreateFixtureDto): Promise<Fixture> {
    try {
      return await this.fixturesService.create(createFixtureDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Fixture[]> {
    return await this.fixturesService.findAll();
  }

  @Get('next')
  async getNextFixture(): Promise<Fixture | null> {
    return await this.fixturesService.getNextFixture();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Fixture> {
    return await this.fixturesService.findOne(parseInt(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFixtureDto: UpdateFixtureDto,
  ): Promise<Fixture> {
    try {
      return await this.fixturesService.update(parseInt(id), updateFixtureDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.fixturesService.remove(parseInt(id));
    return { message: 'Fixture deleted successfully' };
  }
}
