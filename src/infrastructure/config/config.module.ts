import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';

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
  providers: [DatabaseModule],
  exports: [DatabaseModule],
})
// eslint-disable-next-line unicorn/prevent-abbreviations
export class EnvConfigModule {}