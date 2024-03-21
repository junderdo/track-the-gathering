import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { configurePipes } from './validation.config';

describe('NestJS validation config', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.resetAllMocks();

    const testingModule = await Test.createTestingModule({
      providers: [],
    }).compile();
    app = testingModule.createNestApplication();
  });

  it('should globally set validation pipe', () => {
    const useGlobalPipesSpy = jest.spyOn(app, 'useGlobalPipes');

    const res = configurePipes(app);

    expect(useGlobalPipesSpy).toHaveBeenCalledTimes(1);
    expect(res).toBe(app);
  });
});
