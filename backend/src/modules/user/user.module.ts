import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from 'src/configuration';
import { UserEntity, UserEntitySchema } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { OAuthMapEntity, OAuthMapEntitySchema } from 'src/entities/oauth.map.entity';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserEntitySchema }]),
    MongooseModule.forFeature([{ name: OAuthMapEntity.name, schema: OAuthMapEntitySchema }]),
  ],
  providers: [UserService, Logger],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
