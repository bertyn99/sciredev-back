import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './adaptater/user.controller';
import { USERCONTROLLERPORT } from "./port/user.controller.port";
import { UsersRepositoryAdapter } from './adaptater/user.repository.adapter';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UsersRepositoryAdapter,
    {
        provide: USERCONTROLLERPORT,
        useValue: UserService, // Utilisez UserServices en tant que valeur pour ControllerPort
    }
]
})
export class UserModule {}
