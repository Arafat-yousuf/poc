import { ApiProperty } from '@nestjs/swagger';
import { UserFullName } from './user.name';
import { UserFullNameDto } from './user.name.dto';
import { UserResponse } from './user.response';

export class UserResponseDto implements UserResponse {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  createdAt: string;

  @ApiProperty({ type: String })
  updatedAt: string;

  @ApiProperty({ type: String })
  userName: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  imageUrl: string;

  @ApiProperty({ type: UserFullNameDto })
  name: UserFullName;
}
