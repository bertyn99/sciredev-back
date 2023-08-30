import { Module } from '@nestjs/common';
import { EnvConfigModule as EnvironmentConfigModule } from './config/config.module';
import { TypeOrmConfigModule } from './database/typeorm/typeorm.module';
import { UserModule } from '../modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './../modules/auth/auth.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
