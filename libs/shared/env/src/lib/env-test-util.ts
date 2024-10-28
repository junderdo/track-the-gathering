/**
 * @description provides utilities for unit testing
 */
export class EnvTestUtil {
  private oldEnv: NodeJS.ProcessEnv | undefined;

  constructor() {}

  public setMockEnvVars() {
    this.oldEnv = process.env;
    process.env = { ...this.oldEnv };
    process.env['API_EXAMPLE_REST_URL'] = 'http://localhost:3000/';
    process.env['POSTGRES_USER'] = 'username';
    process.env['POSTGRES_PASSWORD'] = 'password';
    process.env['POSTGRES_DB'] = 'track-the-gathering-pg';
    process.env['DATABASE_URL'] =
      'postgres://username:password@127.0.0.1:5432/track-the-gathering-pg?sslmode=disable';
    process.env['ALLOW_MOCK_DATA'] = '1';
    process.env['MOCKAROO_API_BASE_URL'] = 'https://my.api.mockaroo.com/';
    process.env['MOCKAROO_API_KEY'] = '';
    process.env['MOCKAROO_API_ENDPOINT_ACCOUNT'] = 'account.json';
    process.env['AUTH0_DOMAIN'] = 'mock.us.auth0.com';
    process.env['AUTH0_API_AUDIENCE'] = 'https://api-audience.com';
    process.env['AUTH0_NAMESPACE_BASE'] = 'https://api-audience.com';
    process.env['AUTH0_MANAGEMENT_API_AUDIENCE'] =
      'https://mock.us.auth0.com/api/v2/';
    process.env['AUTH0_MANAGEMENT_NAMESPACE_BASE'] =
      'https://mock.us.auth0.com/api/v2/';
    process.env['AUTH0_MANAGEMENT_CLIENT_ID'] =
      'mock_management_application_client_id';
    process.env['AUTH0_MANAGEMENT_CLIENT_SECRET'] =
      'mock_management_application_client_secret';
    // add additional env vars here
  }

  public resetEnv() {
    process.env = this.oldEnv!;
  }
}
