import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable({}) // to be able to use the depen...
// is responsible for handling the logic in requests
export class AuthService {
  constructor(private prisma: PrismaService) {}

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

  async signin(dto: AuthDto) {
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

      return { message: 'User signed in', user };
    } catch (error) {
      console.error(error);
    }

    return ' I have signed in';
  }
}
