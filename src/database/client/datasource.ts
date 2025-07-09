import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import { UserEntity } from 'src/user/entities/user.entity';
import { TaskEntity } from 'src/task/entities/task.entity';

dotenv.config({
  path: '.env',
});

const createDatasource: () => DataSource = () => {
  return new DataSource({
    type: 'mariadb',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [UserEntity, TaskEntity],
    migrations: ['src/database/migrations/*.ts'],
    namingStrategy: new SnakeNamingStrategy(),
  });
};

export const datasource = createDatasource();
