import { Body, Injectable } from '@nestjs/common';

@Injectable({}) // to be able to use the depen...
// is responsible for handling the logic in requests
export class AuthService {
  signup() {
    return { message: 'i have signed up' };
  }

  signin() {
    return ' I have signed in';
  }
}
