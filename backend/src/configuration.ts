import { registerAs } from '@nestjs/config';
import { AppConfig } from './models/server.config';

const loadConfig = (): AppConfig => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  baseUrl: process.env.SERVER_BASE_URL,
  clientBaseUrl: process.env.CLIENT_BASE_URL,
  instanceName: process.env.DRAGONHUB_INSTANCE_NAME ?? 'dragonhub',
  mongodb: {
    connectionString: process.env.MONGODB_CONNECTION_STRING,
  },
  jwt: {
    privateKey: Buffer.from(process.env.AUTH_PRIVATE_KEY, 'base64').toString('utf-8'),
    publicKey: Buffer.from(process.env.AUTH_PUBLIC_KEY, 'base64').toString('utf-8'),
    issuer: process.env.JWT_ISSUER,
    google: {
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      authority: process.env.GOOGLE_AUTH_AUTHORITY,
      tokenEndpoint: process.env.GOOGLE_AUTH_TOKEN_ENDPOINT,
      redirectUri: `${process.env.SERVER_BASE_URL}/api/auth/oauth_callback/google`,
      responseMode: process.env.GOOGLE_AUTH_RESPONSE_MODE,
      responseType: process.env.GOOGLE_AUTH_RESPONSE_TYPE,
    },
  },
});
export const appConfig = registerAs('appconfig', loadConfig);
