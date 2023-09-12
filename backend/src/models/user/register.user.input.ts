import { UserFullName } from './user.name';

export interface RegisterUserInput {
  userName: string;
  email: string;
  name: UserFullName;
  imageUrl?: string;
  refreshToken?: string;
}
