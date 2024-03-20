import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppMeta } from './app.config';
import { writeFileSync } from 'fs';

export const getSwaggerSpecDirPath = () => {
  return `${process.cwd()}/docs/swagger/`;
};

export const getSwaggerSpecFilePath = (meta: AppMeta) => {
  return `${getSwaggerSpecDirPath()}TtG-${
    meta.version
  }-swagger-spec.json`;
};

export const configureSwagger = (app: INestApplication, meta: AppMeta) => {
  const config = new DocumentBuilder()
    .setTitle(`${meta.name}`)
    .setDescription(`${meta.name}`)
    .setVersion(`${meta.version}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  try {
    writeFileSync(getSwaggerSpecFilePath(meta), JSON.stringify(document));
  } catch (err) {
    console.error(`Failed to create Swagger spec file: ${err}`);
  }
  SwaggerModule.setup('api/docs', app, document);
  return app;
};
