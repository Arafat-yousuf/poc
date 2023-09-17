import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { appConfig } from 'src/configuration';
import { UserService } from '../user/user.service';
import { GoogleDriveService } from 'src/helpers/gdrive.helper';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>,
    private userService: UserService,
  ) {}

  async getFiles(userId: string) {
    const userToken = await this.userService.getUserRefreshToken(userId);
    const gDriveHelper = new GoogleDriveService(this.config, userToken);
    const files = await gDriveHelper.listFiles();
    return files;
  }

  async getStartPageToken(userId: string) {
    const userToken = await this.userService.getUserRefreshToken(userId);
    const gDriveHelper = new GoogleDriveService(this.config, userToken);
    const response = await gDriveHelper.getStartPageToken();
    return response;
  }

  async syncChanges(userId: string) {
    const userToken = await this.userService.getUserRefreshToken(userId);
    const gDriveHelper = new GoogleDriveService(this.config, userToken);
    const response = await gDriveHelper.syncChanges();
    return response;
  }
}
