import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../port/user.repository';


@Injectable()
export class UsersRepositoryAdapter extends Repository<User> implements UsersRepository  {
    
    //!WARNING : not sure of the role of the extends and datasource here
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
