import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async editUser(user_id: number, dto: EditUserDto) {
    const update = await this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        ...dto,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...result } = update;
    return result;
  }
}
