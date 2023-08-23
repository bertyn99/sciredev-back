import { Module } from '@nestjs/common';
import { EnvConfigModule as EnvironmentConfigModule } from './config/config.module';
import { TypeOrmConfigModule } from './database/typeorm/typeorm.module';
import { UserModule } from '../modules/user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [EnvironmentConfigModule, DatabaseModule,UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
