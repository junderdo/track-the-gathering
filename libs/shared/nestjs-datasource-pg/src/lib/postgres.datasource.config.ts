import { parse } from 'pg-connection-string';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isProduction } from '@track-the-gathering/shared/env';
import { ClientConfig } from 'pg';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

type PgConfig = TypeOrmModuleOptions &
  ClientConfig & {
    username: string;
    type: 'postgres';
  };

export class PostgresDataSourceConfig {
  public static config(): PgConfig {
    if (process.env.DATABASE_URL == null) {
      throw new Error('Database configuration missing!');
    }

    const creds = parse(process.env.DATABASE_URL);

    if (!creds.database) {
      throw new Error('Database configuration missing!');
    }

    const conf: PgConfig = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: creds.host ?? 'localhost',
      port: creds.port ? +creds.port : 5432,
      username: creds.user ?? '',
      password: creds.password,
      database: creds.database ?? '',
      namingStrategy: new SnakeNamingStrategy(),
      // configure SSL for production environments
      //     NOTE: Heroku PG requires the rejectUnauthorized flag for pg dependency 8.x
      //     reference: https://help.heroku.com/MDM23G46/why-am-i-getting-an-error-when-i-upgrade-to-pg-8
      ssl: isProduction ? { rejectUnauthorized: false } : undefined,
    };
    return conf;
  }
}
