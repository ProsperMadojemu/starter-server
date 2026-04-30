import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
//strategy is a class that extends the PassportStrategy class and implements the validate method
//it just validates the token and returns the user information if the token is valid
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  //unique identifier that allows us to use multiple strategies in the same application
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow('JWT_SECRET'),
    });
  }
  validate(payload: { sub: number; email: string }) {
    return payload;
  }
}
