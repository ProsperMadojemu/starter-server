import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuards } from '../auth/guards';
import { GetUser } from '../auth/decorators';
import type { User } from '../../generated/prisma/client';
import { EditUserDto } from './dto';

@Controller('user')
@UseGuards(JwtGuards) //this will protect the route and only allow authenticated users to access it
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') user_id: number, @Body() dto: EditUserDto) {
    console.log(user_id, dto);
    return this.userService.editUser(user_id, dto);
  }
}
