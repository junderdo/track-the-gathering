import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configureSwagger, getSwaggerSpecFilePath } from './swagger.config';
import * as fs from 'fs';

describe('NestJS swagger config', () => {
  const mockMeta = {
    name: 'Mock app',
    version: '0.0.0',
  };

  const mockConfig = new DocumentBuilder()
    .setTitle(mockMeta.name)
    .setDescription(mockMeta.name)
    .setVersion(mockMeta.version)
    .addBearerAuth()
    .build();

  let app: INestApplication;

  beforeEach(async () => {
    jest.resetAllMocks();

    const testingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
    app = testingModule.createNestApplication();
  });

  it('should configure swagger', () => {
    const mockDocument = SwaggerModule.createDocument(app, mockConfig);
    const createDocumentSpy = jest
      .spyOn(SwaggerModule, 'createDocument')
      .mockReturnValue(mockDocument);
    const setupSpy = jest.spyOn(SwaggerModule, 'setup');

    const res = configureSwagger(app, mockMeta);

    expect(createDocumentSpy).toHaveBeenCalledWith(app, mockConfig);
    expect(setupSpy).toHaveBeenCalledWith('api/docs', app, mockDocument);
    expect(res).toBe(app);

    expect(fs.writeFileSync).toHaveBeenLastCalledWith(
      getSwaggerSpecFilePath(mockMeta),
      JSON.stringify(mockDocument)
    );
  });
});
