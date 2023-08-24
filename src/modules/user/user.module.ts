import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './adaptater/user.controller';
import { USERCONTROLLERPORT } from "./port/user.controller.port";
import { UsersRepositoryAdapter } from './adaptater/user.repository.adapter';
import { jwtConstants } from '../../infrastructure/common/constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { userProviders } from './user.providers';
import { DatabaseModule } from './../../infrastructure/database/database.module';
import { AuthController } from './adaptater/auth.controller';
import { AUTHPORT } from './port/auth.port';

@Module({
  controllers: [UserController, AuthController],
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },//TODO: UPDATE THAT VALUE
    }),

  ],
  providers: [
    ...userProviders,
    UsersRepositoryAdapter,
    {
      provide: USERCONTROLLERPORT,
      useClass: UserService, // Utilisez UserServices en tant que valeur pour ControllerPort
    },
    {
      provide: 'UsersRepository',
      useClass: UsersRepositoryAdapter, // Utilisez UserServices en tant que valeur pour ControllerPort
    },
    {
      provide: AUTHPORT,
      useClass: UserService
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UserService,
  ]
})
export class UserModule { }
