import { IsDate, IsUUID } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BasePublicEntity extends BaseEntity {
  //NOTE: primary key is generated as a UUID for simpler data management (database merging, complex relationships), uniqueness across instances / env,
  //    and no max ceiling like int
  //    **we might want to consider converting this to an int if we experience notable performance issues
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id!: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  createdDate!: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  lastModifiedDate!: Date;

  constructor(data?: Partial<BasePublicEntity>) {
    super();
    Object.assign(this, data);
  }
}
