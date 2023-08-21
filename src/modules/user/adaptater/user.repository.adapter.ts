import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../port/user.repository';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersRepositoryAdapter implements UsersRepository  {
  // constructor(
  //   @InjectRepository(User)
  //   private  usersRepository: Repository<User>,
  // ) {}
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}
  findSignInUser(userEmail:string): Promise<any> {
    return this.usersRepository.findOneBy({
      email: userEmail,
  }) 
  }

 

}
