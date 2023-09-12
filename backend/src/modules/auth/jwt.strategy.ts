import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { isAuthInfo } from 'src/models/auth/auth.info';
import { appConfig } from '../../configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(@Inject(appConfig.KEY) config: ConfigType<typeof appConfig>) {
    const tokenExtractor = (req: Request) => {
      let token = null;
      if (!token && req.headers.authorization) {
        this.logger.debug(req?.path);
        token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      }

      if (!token && req.query && req.query.token) {
        this.logger.debug(req?.path);
        token = ExtractJwt.fromUrlQueryParameter('token')(req);
      }

      return token;
    };

    super({
      jwtFromRequest: tokenExtractor,
      ignoreExpiration: false,
      secretOrKey: config.jwt.publicKey,
    });
  }

  async validate(payload: unknown) {
    if (isAuthInfo(payload)) {
      return {
        userId: payload.userId,
        email: payload.email,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
