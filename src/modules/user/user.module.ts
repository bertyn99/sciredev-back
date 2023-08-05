import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './adaptater/user.controller';
import { UsersRepository } from './adaptater/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UsersRepository],
})
export class UserModule {}
