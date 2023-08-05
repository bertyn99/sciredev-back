import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './config.database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      /*   ignoreEnvFile:
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
          ? false
          : true, */
      isGlobal: true,
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
// eslint-disable-next-line unicorn/prevent-abbreviations
export class EnvConfigModule {}
