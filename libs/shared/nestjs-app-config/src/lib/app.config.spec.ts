import { Test } from '@nestjs/testing';
import { configureApp } from './app.config';
import { INestApplication } from '@nestjs/common';
import * as security from './security.config';
import * as validation from './validation.config';
import * as swagger from './swagger.config';
import { AppLogger } from './logger.config';
import * as fs from 'fs';

describe('NestJS app config', () => {
  const mockMeta = {
    name: 'Mock app',
    version: '0.0.0',
  };

  let app: INestApplication;
  let configureHelmetSpy: jest.SpyInstance;
  let configureCorsSpy: jest.SpyInstance;
  let configurePipesSpy: jest.SpyInstance;
  let configureSwaggerSpy: jest.SpyInstance;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [AppLogger],
    }).compile();
    app = testingModule.createNestApplication();
  });

  beforeEach(() => {
    jest.resetAllMocks();
    configureHelmetSpy = jest.spyOn(security, 'configureHelmet');
    configureCorsSpy = jest.spyOn(security, 'configureCors');
    configurePipesSpy = jest.spyOn(validation, 'configurePipes');
    configureSwaggerSpy = jest.spyOn(swagger, 'configureSwagger');
  });

  it('should configure HTTP API', async () => {
    await configureApp(app, mockMeta, ['HTTP']);

    expect(configureHelmetSpy).toHaveBeenCalledWith(app);
    expect(configureCorsSpy).toHaveBeenCalledWith(app);
    expect(configurePipesSpy).toHaveBeenCalledWith(app);
    expect(configureSwaggerSpy).toHaveBeenCalledWith(app, mockMeta);

    expect(fs.writeFileSync).toHaveBeenLastCalledWith(
      swagger.getSwaggerSpecFilePath(mockMeta),
      expect.stringContaining('{"openapi":"3.0.0"')
    );
  }, 10000);
});
