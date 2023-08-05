/* eslint-disable unicorn/prefer-module */
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  DataSource,
} from '@nestjs/typeorm';
import { DatabaseConfigService } from '../../config/config.database';
import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../../config/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const typeOrmConfig = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    configService.get('database'),
  dataSourceFactory: async (options) => new DataSource(options).initialize(),
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [DatabaseConfigService],
    }),
  ],
})
export class TypeOrmConfigModule {}
