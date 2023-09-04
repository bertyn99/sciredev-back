import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const configOrm = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['src/modules/**/entities/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  migrations: ['src/infrastructure/database/migrations/**/*{.ts,.js}'],
});

configOrm
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => {
    console.error('Error during Data Source initialization', error);
  });

console.log(configOrm);
export default configOrm;
