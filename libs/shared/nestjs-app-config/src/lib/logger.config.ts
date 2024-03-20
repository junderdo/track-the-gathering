import { ConsoleLogger, INestApplication, Injectable } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger {}

export const configureLogger = (app: INestApplication) => {
  app.useLogger(app.get(AppLogger));
  return app;
};
