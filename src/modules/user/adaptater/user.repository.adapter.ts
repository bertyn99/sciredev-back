import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../port/user.repository';

@Injectable()
export class UsersRepositoryAdapter implements UsersRepository {
  constructor(
    @Inject('REPOSITORY')
    private repository: Repository<User>) {
  }

  deleteUser(id: number): void {
    this.repository.delete(id);
  }
  getUserById(id: number): Promise<User> {
    return this.repository.findOneBy({
      id: id, 
    });
  }

  saveUser(newUser: User): Promise<User> {
    return this.repository.save(newUser)
  }

  getAllUsers(): Promise<User[]> {
    return this.repository.find();
  }


}
