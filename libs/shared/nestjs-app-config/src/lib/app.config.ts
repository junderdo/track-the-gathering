import { INestApplication } from '@nestjs/common';
import { configurePipes } from './validation.config';
import { configureCors, configureHelmet } from './security.config';
import { configureSwagger } from './swagger.config';
import { configureLogger } from './logger.config';

type AppType = 'HTTP';
export interface AppMeta {
  name: string;
  version: string;
}

export const configureApp = async (
  app: INestApplication,
  meta: AppMeta,
  types: AppType[]
) => {
  app = configureHelmet(app);
  app = configureCors(app);
  app = configureLogger(app);

  if (types.includes('HTTP')) {
    app = configurePipes(app);
    app = configureSwagger(app, meta);
  }
  return app;
};
