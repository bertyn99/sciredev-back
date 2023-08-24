import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersRepositoryAdapter } from './adaptater/user.repository.adapter';

export const userProviders = [
  {
    provide: 'REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  }
];