import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, EntityRepository, EntityTarget, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../port/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/infrastructure/common/repository';

@Injectable()
export class UsersRepositoryAdapter implements UsersRepository {
  constructor(
    @Inject('REPOSITORY')
    private repository: Repository<User>) {
  }
  // update(user: User): void {
  //   this.repository.update(user);
  // }
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

  checkAuthUser(userEmail: string): Promise<User> {
    return this.repository.findOneBy({
      email: userEmail,
    })
  }
}
