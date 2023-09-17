import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/config/user.decorator';
import { AuthGuard } from 'src/guards/http/auth.guard';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  private readonly logger = new Logger(StorageController.name);
  constructor(private readonly storageService: StorageService) {}

  @Get('/getFiles')
  @UseGuards(AuthGuard)
  async getFiles(@GetUser() id: string) {
    return await this.storageService.getFiles(id);
  }

  @Get('/getStartPageToken')
  @UseGuards(AuthGuard)
  async getStartPageToken(@GetUser() id: string) {
    return await this.storageService.getStartPageToken(id);
  }

  @Get('/syncChanges')
  @UseGuards(AuthGuard)
  async syncChanges(@GetUser() id: string) {
    return await this.storageService.syncChanges(id);
  }
}
