import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

/*
    The controller recieves request a from the internet then it calls a function from the auth.service class 
    to return the its result back  

    Dependency Intection 
    is basically a variable that nest js handled decleration for you so: Without DI (manual way)
    class UserController {
    private userService = new UserService();

    getUsers() {
        return this.userService.getUsers();
    }
    you can just use it 

    With DI (NestJS way)

    In NestJS:

    class UserController {
    constructor(private userService: UserService) {}

    getUsers() {
        return this.userService.getUsers();
    }
    }
}

*/
@Controller('auth') // this decorator handles the response and request between the client and the server
export class AuthController {
  constructor(private authService: AuthService) {}
  // private is just a shorthand for
  /*
          authService: AuthService
          constructor(authService: AuthService) {
              this.authService = authService
          }
  */
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({ dto });
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
