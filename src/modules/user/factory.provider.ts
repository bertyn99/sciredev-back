import { DataSource, Repository } from "typeorm";
import { UsersRepositoryAdapter } from "./adaptater/user.repository.adapter";
import { User } from "./entities/user.entity";

export const connectionProvider = {
    provide: 'CONNECTION',
    useFactory: (dataSource: DataSource) => {
      const options = dataSource.getRepository(User)
      return new UsersRepositoryAdapter(options);
    },
    // inject: [Repository<User>, { token: 'SomeOptionalProvider', optional: true }],
    //       \_____________/            \__________________/
    //        This provider              The provider with this
    //        is mandatory.              token can resolve to `undefined`.
  };