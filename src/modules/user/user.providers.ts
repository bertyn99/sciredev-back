import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersRepositoryAdapter } from './adaptater/user.repository.adapter';

export const userProviders = [
  {
    provide: 'REPOSITOY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['UsersRepository'],
  },
];