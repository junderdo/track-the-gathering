import { DataSource, EntitySchema } from 'typeorm';
import { PostgresDataSourceConfig } from '@track-the-gathering/shared/nestjs-datasource-pg';
import { User } from '@track-the-gathering/shared/users/data-access';
import { BasePublicEntity } from '@track-the-gathering/shared/data-access';

const entities: typeof BasePublicEntity[] = [
  User
];
console.log('Migrating entities: ', entities);

const dsConfig = PostgresDataSourceConfig.config();
export const getDs = () => {
  return new DataSource({
    type: dsConfig.type,
    url: dsConfig.url,
    host: dsConfig.host,
    port: dsConfig.port,
    username: dsConfig.username,
    password: <string>dsConfig.password,
    database: <string>dsConfig.database,
    namingStrategy: dsConfig.namingStrategy,
    ssl: dsConfig.ssl,
    entities: entities,
    migrations: [__dirname + '/migrations/**/*.js'],
  });
};
