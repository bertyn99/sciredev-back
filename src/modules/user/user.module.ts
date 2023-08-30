import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './adaptater/user.controller';
import { USERCONTROLLERPORT } from "./port/user.controller.port";
import { UsersRepositoryAdapter } from './adaptater/user.repository.adapter';
import { repositoryProvider } from '../../infrastructure/common/repository.providers';
import { DatabaseModule } from './../../infrastructure/database/database.module';

@Module({
  controllers: [UserController],
  imports: [
    DatabaseModule,
  ],
  providers: [
    ...repositoryProvider,
    UsersRepositoryAdapter,
    {
      provide: USERCONTROLLERPORT,
      useClass: UserService, // Utilisez UserServices en tant que valeur pour ControllerPort
    },
    {
      provide: 'UsersRepository',
      useClass: UsersRepositoryAdapter, // Utilisez UserServices en tant que valeur pour ControllerPort
    },
    UserService,
  ]
})
export class UserModule { }
