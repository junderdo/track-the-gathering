import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class BaseEntityService<T extends BaseEntity> {
  constructor(protected repository: Repository<T>) {}

  find(
    options: FindManyOptions<T>,
    dto?: { take: number | string; page: number | string }
  ): Promise<T[]> {
    if (dto) {
      options = {
        ...options,
        ...this.getPaginationDetails(dto),
      };
    }
    return this.repository.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    const data = await this.repository.findOne(options);
    if (!data) throw new NotFoundException();
    return data;
  }

  exists(where: FindOptionsWhere<T>): Promise<boolean> {
    return this.repository.exist({ where });
  }

  async update(
    id: string | number,
    data: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    const exists = await this.exists(<FindOptionsWhere<T>>{ id });
    if (!exists) throw new NotFoundException();
    return this.repository.update(id, data);
  }

  save(data: T): Promise<T> {
    return this.repository.save(data);
  }

  saveMany(data: T[]): Promise<T[]> {
    return this.repository.save(data.map((dataRow) => dataRow));
  }

  async remove(id: string | number): Promise<void> {
    await this.repository.delete(id);
  }

  getPaginationDetails(dto: { take: number | string; page: number | string }): {
    take: number;
    skip: number;
  } {
    const take = +dto.take;
    const page = +dto.page;
    const skip = (page - 1) * take;
    return { take, skip };
  }
}
