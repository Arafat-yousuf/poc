export interface AuthClientConfig {
  clientId: string;
  clientSecret: string;
  authority: string;
  tokenEndpoint: string;
  redirectUri: string;
  responseMode: string;
  responseType: string;
}
export interface JwtConfig {
  privateKey: string;
  publicKey: string;
  issuer: string;
  google: AuthClientConfig;
}
export interface MongoConfig {
  connectionString: string;
}

export interface AppConfig {
  port: number;
  baseUrl: string;
  clientBaseUrl: string;
  instanceName: string;
  mongodb: MongoConfig;
  jwt: JwtConfig;
}
