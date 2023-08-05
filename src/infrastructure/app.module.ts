import { Module } from '@nestjs/common';
import { EnvConfigModule as EnvironmentConfigModule } from './config/config.module';
import { TypeOrmConfigModule } from './database/typeorm/typeorm.module';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [EnvironmentConfigModule, TypeOrmConfigModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
