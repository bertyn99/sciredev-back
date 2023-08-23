import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, EntityRepository, EntityTarget, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../port/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/infrastructure/common/repository';

export function buildCustomRepositoryMethods<T>(): Pick<UsersRepository> {
  return {
  async testrepo()  {
    console.log("dsf");
    return this.repository.find();
    
  }
  };
}
// @Injectable()
// export class UsersRepositoryAdapter  extends Repository<User> implements UsersRepository  {
//   // repository: Repository<User>;
//   // constructor(dataSource: DataSource) {
//   //   console.log(dataSource);
    
//   //   this.repository = dataSource.getRepository<User>(User)
//   // }
//   // constructor(@InjectRepository(User) private repository: Repository<User>) {
//   //   super(repository.target, repository.manager, repository.queryRunner)
//   // }
//   constructor(
//     @Inject()
//   )

//   testrepo() {
//     console.log("dsf");
//     return this.repository.find();
    
//   }

//   // constructor( 
//   //   @InjectRepository(User)
//   //   repository:Repository<User>) {
//   //   super(User);
//   // }
  
//   findSignInUser(userEmail:string): Promise<any> {
//     return this.repository.findOneBy({
//       email: userEmail,
//   })  
//   }

 

// }
