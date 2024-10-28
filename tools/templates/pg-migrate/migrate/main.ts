import { DataSource } from 'typeorm';
import { isProduction } from '@track-the-gathering/shared/env';
import { PostgresDataSourceConfig } from '@track-the-gathering/shared/nestjs-datasource-pg';
import {
  BaseHCEntity,
  BasePublicEntity,
} from '@track-the-gathering/shared/data-access';

//TODO handle HC migrations differently than public schema
const entities: (typeof BasePublicEntity | typeof BaseHCEntity)[] = [];
const publicEntities = [];
const hcEntities: (typeof BaseHCEntity)[] = [];

entities.push(...publicEntities);

if (!isProduction) {
  console.log(
    'Including Heroku Connect entities in database migration for local development'
  );
  entities.push(...hcEntities);
}
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
