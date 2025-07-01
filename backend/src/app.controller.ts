import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('api/info')
  getApiInfo(): { name: string; version: string; environment: string } {
    return {
      name: 'FC-BRO Backend API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
