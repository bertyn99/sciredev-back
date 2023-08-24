import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './../../modules/user/entities/user.entity';
import { DataSource } from 'typeorm';

//? cant use this yet
export const typeOrmOptions: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
    schema: process.env.DATABASE_SCHEMA,
    migrationsRun: true,
    migrations: [__dirname + '/migrations**/*{.ts,.js}'],
    // cli: {
    //     migrationsDir: 'src/migrations',
    // },
};

// export const redisOptions: RedisModuleOptions = {
//     host: 'localhost',
//     port: 6379,
// };

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            // return await TypeOrmModule.forRoot(typeOrmOptions);
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: [User],
                logging: true,
                synchronize: true,
                schema: process.env.DATABASE_SCHEMA,
                
            });

            return dataSource.initialize();
        },
    },
    
    // {
    //     provide: 'REDIS_CONNECTION',
    //     useFactory: async () => {
    //         return await RedisModule.forRoot(redisOptions);
    //     },
    // },
];
