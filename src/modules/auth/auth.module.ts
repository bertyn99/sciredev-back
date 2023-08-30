import { Module } from "@nestjs/common";
import { AuthController } from "./adapter/auth.controller";
import { AuthRepositoryAdapter } from "./adapter/auth.repository.adapter";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { AUTHPORT } from "./port/auth.port";
import { UsersRepositoryAdapter } from "../user/adaptater/user.repository.adapter";
import { repositoryProvider } from "../../infrastructure/common/repository.providers";
import { DatabaseModule } from "./../../infrastructure/database/database.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from '../../infrastructure/common/constants';

@Module({
    controllers: [AuthController],
    imports: [
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '600s' },//TODO: UPDATE THAT VALUE
        }),
    ],
    providers: [
        ...repositoryProvider,
        AuthRepositoryAdapter,
        {
            provide: 'UsersRepository',
            useClass: UsersRepositoryAdapter, 
        },
        {
            provide: 'AuthRepository',
            useClass: AuthRepositoryAdapter, 
        },
        {
            provide: AUTHPORT,
            useClass: AuthService
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        AuthService
    ]
})
export class AuthModule {}