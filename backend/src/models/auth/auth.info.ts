export interface AuthInfo {
  userId: string;
  email: string;
}

export function isAuthInfo(obj: unknown): obj is AuthInfo {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  return 'userId' in obj && 'email' in obj;
}

export interface IdTokenModel {
  userId: string;
  email: string;
}
