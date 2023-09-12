import { ApiProperty } from '@nestjs/swagger';
import { RegisterUserInput } from './register.user.input';
import { UserFullName } from './user.name';
import { UserFullNameDto } from './user.name.dto';

export class RegisterUserInputDto implements RegisterUserInput {
  @ApiProperty({ type: String })
  userName: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: UserFullNameDto })
  name: UserFullName;

  @ApiProperty({ type: String })
  imageUrl?: string;
}
