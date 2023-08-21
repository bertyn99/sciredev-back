import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './adaptater/user.controller';
import { USERCONTROLLERPORT } from "./port/user.controller.port";
import { UsersRepositoryAdapter } from './adaptater/user.repository.adapter';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { USERSREPOSITORY } from './port/user.repository';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { userProviders } from './user.providers';
import { TypeOrmConfigModule } from 'src/infrastructure/database/typeorm/typeorm.module';

@Module({
  controllers: [UserController],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmConfigModule
  ],
  providers: [
    UserService,
    ...userProviders,
    {
      provide: USERCONTROLLERPORT,
      useClass: UserService, // Utilisez UserServices en tant que valeur pour ControllerPort
    },
    {
      provide: USERSREPOSITORY,
      useClass: UsersRepositoryAdapter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class UserModule { }
