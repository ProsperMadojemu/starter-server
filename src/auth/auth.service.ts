import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({}) // to be able to use the depen...
// is responsible for handling the logic in requests
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    //generate password hash
    const hash = await argon.hash(dto.password);

    try {
      // add user to db
      const user = await this.prisma.user.create({
        // pass data object
        data: {
          email: dto.email,
          hash: hash,
        },
      });

      return { message: 'user created successfully', user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Already Exists');
        }
      }
      throw error;
    }
  }

  async signin(
    dto: AuthDto,
  ): Promise<{ access_token: string; user: unknown; message: string }> {
    try {
      // find user
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      // throw exception for no user found
      if (!user) throw new ForbiddenException('Invalid Credentials');

      // compare password
      const pwMatches = await argon.verify(user.hash, dto.password);

      // if password incorrect throw exception
      if (!pwMatches) throw new ForbiddenException('Invalid Credentials');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hash, ...rest } = user;

      const jwtSign = await this.signToken(rest.id, rest.email);

      return {
        message: 'User signed in',
        user: rest,
        access_token: jwtSign,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      id: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
    return token;
  }
}
