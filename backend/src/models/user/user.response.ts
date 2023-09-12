import { UserFullName } from 'src/models/user/user.name';

export interface UserResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  email: string;
  imageUrl: string;
  name: UserFullName;
}

export function isUserResponse(obj: unknown): obj is UserResponse {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  return 'id' in obj;
}
