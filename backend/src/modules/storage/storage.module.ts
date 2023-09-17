import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from 'src/configuration';
import { UserEntity, UserEntitySchema } from 'src/entities/user.entity';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    UserModule,
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserEntitySchema }]),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
