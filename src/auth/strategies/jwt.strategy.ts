import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

export type JwtPayload = {
  sub: number;
  email: string;
};

@Injectable()
//strategy is a class that extends the PassportStrategy class and implements the validate method
//it just validates the token and returns the user information if the token is valid
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  //unique identifier that allows us to use multiple strategies in the same application
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow('JWT_SECRET'),
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) return null; //this will also block requests with 404
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...rest } = user;
    return { user: rest };
  }
}
