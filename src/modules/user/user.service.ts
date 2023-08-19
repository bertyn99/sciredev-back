import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserControllerPort } from './port/user.controller.port';
import { UsersRepositoryAdapter } from './adaptater/user.repository.adapter';

@Injectable()
export class UserService implements UserControllerPort {
  constructor(
        @Inject(UsersRepositoryAdapter)
        private userRepositoryAdapter:UsersRepositoryAdapter,
  ) { }
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
