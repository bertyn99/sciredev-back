import { DataSource } from 'typeorm';
import { User } from '../../modules/user/entities/user.entity';

export const repositoryProvider = [
  {
    provide: 'REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];