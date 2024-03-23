import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { BaseEntityService } from './base-entity.service';
import { BaseEntity } from './base.entity';
import { NotFoundException } from '@nestjs/common';

class MockEntityImpl extends BaseEntity {
  id!: string;
}

class MockServiceImpl extends BaseEntityService<MockEntityImpl> {
  constructor(
    @InjectRepository(MockEntityImpl) repository: Repository<MockEntityImpl>
  ) {
    super(repository);
  }
}

const mockEntities: MockEntityImpl[] = [
  new MockEntityImpl(),
  new MockEntityImpl(),
];

describe('BaseEntityService', () => {
  let service: MockServiceImpl;
  let repository: Repository<MockEntityImpl>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        MockServiceImpl,
        {
          provide: getRepositoryToken(MockEntityImpl),
          useValue: createMock<Repository<MockEntityImpl>>(),
        },
      ],
    }).compile();

    service = app.get<MockServiceImpl>(MockServiceImpl);
    repository = app.get<Repository<MockEntityImpl>>(
      getRepositoryToken(MockEntityImpl)
    );
  });

  describe('find', () => {
    it('should call repository.find()', async () => {
      jest.spyOn(repository, 'find').mockResolvedValueOnce(mockEntities);

      const res = await service.find({});

      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(res).toEqual(mockEntities);
    });
  });

  describe('findOne', () => {
    it('should call repository.findOne()', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockEntities[0]);

      const mockUuid = 'mock-uuid';

      const res = await service.findOne({ where: { id: mockUuid } });

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id: mockUuid,
        },
      });
      expect(res).toEqual(mockEntities[0]);
    });

    it('should throw 404 error if found data is null', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      const mockUuid = 'mock-uuid';

      try {
        await service.findOne({ where: { id: mockUuid } });
      } catch (err) {
        expect((<NotFoundException>err).getStatus()).toBe(404);
      }

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id: mockUuid,
        },
      });
      expect.assertions(3);
    });
  });

  describe('exists', () => {
    it('should call repository.exist() with provided where filter', async () => {
      const mockUuid = 'mock-uuid';

      const expected = true;
      const existSpy = jest
        .spyOn(repository, 'exist')
        .mockResolvedValueOnce(expected);

      const res = await service.exists({ id: mockUuid });

      expect(res).toBe(expected);
      expect(existSpy).toHaveBeenCalledWith({ where: { id: mockUuid } });
    });
  });

  describe('update', () => {
    it('should call repository.update() with provided data if record exists', async () => {
      const mockUuid = 'mock-uuid';
      const mockData = new MockEntityImpl();

      const existSpy = jest
        .spyOn(repository, 'exist')
        .mockResolvedValueOnce(true);

      const expected = { raw: {}, generatedMaps: [] };
      const updateSpy = jest
        .spyOn(repository, 'update')
        .mockResolvedValueOnce(expected);

      const res = await service.update(mockUuid, mockData);

      expect(res).toBe(expected);
      expect(existSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith(mockUuid, mockData);
    });

    it('should throw 404 if record does not exist', async () => {
      const mockUuid = 'mock-uuid';
      const mockData = new MockEntityImpl();

      const existSpy = jest
        .spyOn(repository, 'exist')
        .mockResolvedValueOnce(false);

      const mockRes = { raw: {}, generatedMaps: [] };
      const updateSpy = jest
        .spyOn(repository, 'update')
        .mockResolvedValueOnce(mockRes);

      try {
        await service.update(mockUuid, mockData);
      } catch (err) {
        expect((<NotFoundException>err).getStatus()).toBe(404);
      }

      expect(existSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledTimes(0);
      expect.assertions(3);
    });
  });

  describe('save', () => {
    it('should call repository.save() with a single record', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(mockEntities[0]);

      const res = await service.save(mockEntities[0]);

      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(mockEntities[0]);
      expect(res).toBe(mockEntities[0]);
    });
  });

  describe('saveMany', () => {
    it('should call repository.save() with multiple records', async () => {
      //note: type error when trying to mock return value as array
      //    setting to single value to verify that the return value
      //    of service.saveMany === return value from repository.save
      const mockSaveValue = mockEntities[0];
      const saveSpy = jest.spyOn(repository, 'save');
      saveSpy.mockResolvedValueOnce(mockSaveValue);

      const res = await service.saveMany(mockEntities);

      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(res).toBe(mockSaveValue);
    });
  });

  describe('remove', () => {
    it('should call repository.delete()', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValueOnce(createMock<DeleteResult>());

      const mockUuid = 'mock-uuid';

      const res = await service.remove(mockUuid);

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(mockUuid);
      expect(res).toEqual(undefined);
    });
  });
});
