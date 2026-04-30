import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: Request) {
    console.log({ user: req.user });
    return this.userService.getMe();
  }
}
