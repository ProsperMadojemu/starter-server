import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
/* 
  a module is a class that is annotated with apnpm dlx prisma init --output ../src/generated/prisma @module decorator
  https://docs.nestjs.com/modules
  basically it organizes your app 
*/
// decorators are anything that passed metadata to a function or class with the @ parameter
