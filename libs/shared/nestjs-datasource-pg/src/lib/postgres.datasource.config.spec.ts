import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresDataSourceConfig } from './postgres.datasource.config';
import { isProduction } from 'shared/env';

describe('PostgresDataSourceConfig', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };

    process.env.DATABASE_URL =
      'postgres://username:password@127.0.0.1:5432/test-mock?sslmode=disable';
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe('config', () => {
    it('should return development config', () => {
      const res = PostgresDataSourceConfig.config();
      expect(res).toMatchObject({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        host: '127.0.0.1',
        port: 5432,
        username: 'username',
        password: 'password',
        database: 'test-mock',
        namingStrategy: new SnakeNamingStrategy(),
        ssl: isProduction ? { rejectUnauthorized: false } : undefined,
      });
    });
  });
});
