import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export const configureHelmet = (app: INestApplication) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    })
  );
  return app;
};

export const configureCors = (app: INestApplication) => {
  // TODO: properly configure cors
  app.enableCors();
  return app;
};
