import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
})
export class AppModule {}
/* 
  a module is a class that is annotated with a @module decorator
  https://docs.nestjs.com/modules
  basically it organizes your app 
*/
// decorators are anything that passed metadata to a function or class with the @ parameter
