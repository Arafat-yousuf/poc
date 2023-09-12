import { BadRequestException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Client, Issuer, generators } from 'openid-client';
import { AuthInfo, IdTokenModel } from 'src/models/auth/auth.info';
import { AuthProviderNames } from 'src/models/auth/auth.provider.names';
import { UserResponse } from 'src/models/user/user.response';
import { isValidUrl } from 'src/utils/check.valid.url';
import { appConfig } from '../../configuration';
import { OAuthMapEntity, OAuthMapEntityDocument } from '../../entities/oauth.map.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private nonce = generators.nonce();
  private code_verifier = generators.codeVerifier();
  private loginProviders: AuthProviderNames[] = ['google'];
  private clientMap = new Map<AuthProviderNames, Client>();

  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>,
    @InjectModel(OAuthMapEntity.name)
    private oauthRepository: Model<OAuthMapEntityDocument>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.loginProviders.forEach((loginProvider) => {
      Issuer.discover(config.jwt[loginProvider].authority)
        .then(
          (issuer) =>
            new issuer.Client({
              client_id: config.jwt[loginProvider].clientId ?? '',
              client_secret: config.jwt[loginProvider].clientSecret ?? '',
              redirect_uris: [config.jwt[loginProvider].redirectUri],
              response_types: [config.jwt[loginProvider].responseType],
            }),
        )
        .then((client) => this.clientMap.set(loginProvider, client));
    });
  }

  async getLoginLink(state: string, providerName: AuthProviderNames) {
    const client = this.clientMap.get(providerName);
    if (!client) {
      throw new BadRequestException();
    }
    try {
      const code_challenge = generators.codeChallenge(this.code_verifier);
      const authURL = client.authorizationUrl({
        scope: 'openid email profile https://www.googleapis.com/auth/drive.metadata.readonly',
        code_challenge,
        code_challenge_method: 'S256',
        state,
        access_type: 'offline',
      });
      return authURL;
    } catch (err) {
      this.logger.warn(err);
    }
  }

  async handleCallback(req: Request, providerName: AuthProviderNames) {
    const client = this.clientMap.get(providerName);
    if (!client) {
      throw new BadRequestException();
    }
    const params = client.callbackParams(req);
    console.log(params);
    const url = isValidUrl(params.state ?? '');
    if (!url) {
      throw new BadRequestException('Invalid Redirect URL');
    }

    try {
      let user: UserResponse | null = null;
      const tokenSet = await client.callback(
        this.config.jwt[providerName].redirectUri,
        { code: params.code },
        { code_verifier: this.code_verifier },
      );
      const claims = tokenSet.claims();
      console.log(tokenSet.refresh_token);
      let userMapping = await this.oauthRepository
        .findOne({
          providerName,
          providerId: claims.sub,
        })
        .exec();

      if (!userMapping) {
        user = await this.userService.registerUser({
          userName: claims.nickname ?? claims.name,
          email: claims.email,
          name: {
            firstName: claims.given_name ?? claims.name,
            lastName: claims.family_name,
          },
          imageUrl: claims.picture,
          refreshToken: tokenSet.refresh_token,
        });

        userMapping = await this.oauthRepository.create({
          providerName,
          providerId: claims.sub,
          userId: user.id,
        });
      } else {
        user = await this.userService.getUserById(userMapping.userId);
      }

      if (user) {
        return {
          userId: user.id,
          email: user.email,
          url,
        };
      } else {
        this.logger.log('No user available for claim', JSON.stringify(claims));
      }
    } catch (err) {
      this.logger.warn(err);
    }
    return {
      userId: null,
      email: null,
      url,
    };
  }

  async createRefreshToken(userId: string, email: string, expiresIn = '1d') {
    return await this.jwtService.signAsync(
      {
        userId,
        email,
      },
      {
        algorithm: 'RS256',
        privateKey: this.config.jwt.privateKey,
        expiresIn,
      },
    );
  }

  async verifyRefreshToken(refreshToken: string): Promise<AuthInfo> {
    try {
      const payload = await this.jwtService.verifyAsync<IdTokenModel>(refreshToken, {
        publicKey: this.config.jwt.publicKey,
        algorithms: ['RS256'],
      });
      if (!payload || !payload.userId || !payload.email) {
        throw new UnauthorizedException();
      }
      const authInfo: AuthInfo = {
        userId: payload.userId,
        email: payload.email,
      };
      return authInfo;
    } catch (error) {
      try {
        const failedToken = this.jwtService.decode(refreshToken);
        this.logger.debug('Failed token', failedToken);
      } catch (err2) {
        this.logger.error('Failed to decode token: ' + refreshToken, err2);
      }
    }
    return null;
  }

  async createAccessToken(authInfo: AuthInfo, expiresIn = `${1 * 24}h`) {
    const user = await this.userService.getUserById(authInfo.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    const data = {
      userId: authInfo.userId,
      email: authInfo.email,
    };
    return {
      data,
      token: await this.jwtService.signAsync(data, {
        algorithm: 'RS256',
        privateKey: this.config.jwt.privateKey,
        expiresIn,
      }),
    };
  }
}
