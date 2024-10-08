import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseEntityService } from '@track-the-gathering/shared/data-access';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: createMock<Repository<User>>(),
        },
      ],
    }).compile();

    service = app.get<UserService>(UserService);
    repository = app.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('have base service properties', () => {
    it('should have base service properties', () => {
      expect(service['repository']).toBe(repository);
      expect(service).toBeInstanceOf(BaseEntityService<User>);
      expect(service).toHaveProperty('find');
      expect(service).toHaveProperty('findOne');
      expect(service).toHaveProperty('exists');
      expect(service).toHaveProperty('update');
      expect(service).toHaveProperty('save');
      expect(service).toHaveProperty('saveMany');
      expect(service).toHaveProperty('remove');
      expect(service).toHaveProperty('getPaginationDetails');
    });
  });
});
