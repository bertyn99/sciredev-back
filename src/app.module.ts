import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'admin.bertynboulikou.com',
      port: 9010,
      username: 'postgres',
      password: '1d196bc70b1a14850ae6',
      database: 'sciredev-dev',
      entities: [],
      synchronize: true,
      logging: true,
      ssl: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
