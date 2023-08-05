import { Module } from '@nestjs/common';
import { EnvConfigModule as EnvironmentConfigModule } from './config/config.module';
import { TypeOrmConfigModule } from './database/typeorm/typeorm.module';

@Module({
  imports: [EnvironmentConfigModule, TypeOrmConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
