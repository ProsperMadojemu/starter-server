import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getMe() {
    return "Hello, I'm the user service!";
  }
}
