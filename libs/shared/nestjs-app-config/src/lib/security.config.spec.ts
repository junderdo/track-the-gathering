import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { configureCors, configureHelmet } from './security.config';

describe('NestJS security config', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.resetAllMocks();

    const testingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
    app = testingModule.createNestApplication();
  });

  it('should configure helmet', () => {
    const useSpy = jest.spyOn(app, 'use');

    const res = configureHelmet(app);

    expect(useSpy).toHaveBeenCalledTimes(1);
    expect(res).toBe(app);
  });

  it('should configure cors', () => {
    const enableCorsSpy = jest.spyOn(app, 'enableCors');

    const res = configureCors(app);

    expect(enableCorsSpy).toHaveBeenCalledTimes(1);
    expect(res).toBe(app);
  });
});
