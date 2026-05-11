import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuards } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';
import type { User } from 'generated/prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtGuards) //this will protect the route and only allow authenticated users to access it
  @Get('me')
  getMe(@GetUser() user: User) {
    console.log('User info from JWT:', user);
    return this.userService.getMe();
  }
}
