import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetUser } from 'src/config/user.decorator';
import { AuthGuard } from 'src/guards/http/auth.guard';
import { UserResponse } from 'src/models/user/user.response';
import { UserResponseDto } from 'src/models/user/user.response.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async getAllUser(): Promise<UserResponse[]> {
    return await this.userService.getAllUser();
  }

  // @Get('/:userId')
  // async getUserById(@Param('userId') userId: string): Promise<UserResponse> {
  //   return await this.userService.getUserById(userId);
  // }

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Current User Details' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({ type: UserResponseDto })
  async findCurrentUser(@GetUser() id: string): Promise<UserResponse> {
    return await this.userService.getUserById(id);
  }
}
