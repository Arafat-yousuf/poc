import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { appConfig } from 'src/configuration';
import { OAuthMapEntity, OAuthMapEntitySchema } from 'src/entities/oauth.map.entity';
import { TokenListEntity, TokenListEntitySchema } from 'src/entities/token.list.entity';
import { UserEntity, UserEntitySchema } from 'src/entities/user.entity';
import { JwtConfig } from 'src/models/server.config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<JwtConfig>('appconfig.jwt');
        return {
          privateKey: config.privateKey,
          publicKey: config.publicKey,
          signOptions: {
            algorithm: 'RS256',
            expiresIn: '1d',
            issuer: config.issuer,
          },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: OAuthMapEntity.name, schema: OAuthMapEntitySchema },
      { name: UserEntity.name, schema: UserEntitySchema },
      { name: TokenListEntity.name, schema: TokenListEntitySchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
