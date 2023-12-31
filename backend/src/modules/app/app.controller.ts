import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '../auth/is.public';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getData(): { message: string } {
    return this.appService.getData();
  }
}
