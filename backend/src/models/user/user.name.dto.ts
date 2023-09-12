import { ApiProperty } from '@nestjs/swagger';
import { UserFullName } from 'src/models/user/user.name';

export class UserFullNameDto implements UserFullName {
  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  lastName?: string;
}
