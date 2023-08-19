import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './adaptater/user.controller';
import { USERCONTROLLERPORT } from "./port/user.controller.port";
import { UsersRepositoryAdapter } from './adaptater/user.repository.adapter';

@Module({
  controllers: [UserController],
  providers: [
    UsersRepositoryAdapter,
    {
        provide: USERCONTROLLERPORT,
        useClass: UserService, // Utilisez UserServices en tant que valeur pour ControllerPort
    }
]
})
export class UserModule {}
