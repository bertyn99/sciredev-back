import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserControllerPort } from './port/user.controller.port';
import { User } from './entities/user.entity';
import { SecureData } from '../auth/secureData';
import { UsersRepository } from './port/user.repository';

@Injectable()
export class UserService implements UserControllerPort{
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) { }

  findAll(): Promise<User[]>  {
    return this.usersRepository.getAllUsers();
  }

  findOne(id: number) : Promise<User>  {
    return this.usersRepository.getUserById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<String> {
    const security = new SecureData();
    const hashedPwd: string = await security.hashData(updateUserDto.password);
   

    const user:Promise<User> = this.usersRepository.getUserById(1);
    (await user).email = updateUserDto.email;
    (await user).password = hashedPwd;
    (await user).name = updateUserDto.userName;
    
    this.usersRepository.saveUser(await user);
    return `This action updates a #${id} user`;
  }

  remove(id: number):string {
    this.usersRepository.deleteUser(id)
    return `This action removes a #${id} user`;
  }
}
