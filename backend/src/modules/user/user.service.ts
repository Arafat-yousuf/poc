import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { appConfig } from 'src/configuration';
import { OAuthMapEntity, OAuthMapEntityDocument } from 'src/entities/oauth.map.entity';
import { UserEntity, UserEntityDocument } from 'src/entities/user.entity';
import { GoogleDriveService } from 'src/helpers/gdrive.helper';
import { RegisterUserInput } from 'src/models/user/register.user.input';
import { UserResponse } from 'src/models/user/user.response';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>,
    @InjectModel(UserEntity.name)
    private userRepository: Model<UserEntityDocument>,
    @InjectModel(OAuthMapEntity.name)
    private oAuthMapRepository: Model<OAuthMapEntityDocument>,
  ) {}

  async getAllUser() {
    const users = await this.userRepository.find().limit(50).exec();
    if (!users) {
      throw new NotFoundException();
    }
    return users.map((user) => UserEntity.toUserDto(user));
  }

  async getUserById(userId: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ _id: userId }).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return UserEntity.toUserDto(user);
  }

  async registerUser(input: RegisterUserInput): Promise<UserResponse> {
    const { email, userName, name, imageUrl, refreshToken } = input;

    const emailTaken = await this.userRepository.findOne({ email }).exec();
    if (emailTaken) {
      throw new BadRequestException('Email already exists.');
    }
    try {
      const data: UserEntity = {
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate(),
        email: email.trim(),
        userName: userName.trim(),
        imageUrl: imageUrl ? imageUrl : '',
        name,
        refreshToken,
      };

      const user = await this.userRepository.create(data);
      return UserEntity.toUserDto(user);
    } catch (err) {
      this.logger.warn(err);
    }
  }

  async findByEmail(email: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ email }).exec();
    if (!user) {
      return null;
    }
    return UserEntity.toUserDto(user);
  }

  async getFiles(userId: string) {
    const user = await this.userRepository.findOne({ _id: userId }).exec();
    if (!user) {
      return null;
    }
    const gDriveHelper = new GoogleDriveService(this.config, user.refreshToken);
    const files = await gDriveHelper.listFiles();
    return files;
  }
}
