import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule as EnvironmentConfigModule } from './infrastructure/config/config.module';
import { TypeOrmConfigModule } from './infrastructure/database/typeorm/typeorm.module';

@Module({
  imports: [EnvironmentConfigModule, TypeOrmConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
