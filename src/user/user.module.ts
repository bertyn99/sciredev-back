import { Module } from '@nestjs/common';
import { UsersController } from './adapter/user.controller.adapter';
import { UserServices } from './metier/user.service';
import { UserRepository } from './port/user.repository';
import { UserRepositoryAdapter } from './adapter/user.repository.adapter';
import { CONTROLLERPORT } from './port/controllerPort';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UserServices,
    {
      provide: CONTROLLERPORT,
      useValue: UserServices, // Utilisez UserServices en tant que valeur pour ControllerPort
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryAdapter,
    },
  ],
})
export class UserModule {}
