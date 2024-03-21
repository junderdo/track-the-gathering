import { ConsoleLogger } from '@nestjs/common';
import { AppLogger, configureLogger } from './logger.config';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

describe('NestJS logger config', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.resetAllMocks();

    const testingModule = await Test.createTestingModule({
      providers: [AppLogger],
    }).compile();
    app = testingModule.createNestApplication();
  });

  it('should configure AppLogger', () => {
    const useLoggerSpy = jest.spyOn(app, 'useLogger');

    const res = configureLogger(app);

    expect(useLoggerSpy).toHaveBeenCalledTimes(1);
    expect(res).toBe(app);
    expect(app.get(AppLogger)).toBeInstanceOf(ConsoleLogger);
  });
});
