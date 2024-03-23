import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsDate, IsInt, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseHCEntity extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  @IsInt()
  id!: number;

  @Column({ type: 'varchar', length: 18, nullable: true })
  @IsString()
  @MaxLength(18)
  sfid?: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: 'John Doe',
  })
  name!: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  createddate!: Date;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  lastmodifieddate!: Date;

  constructor(data?: Partial<BaseHCEntity>) {
    super();
    Object.assign(this, data);
  }
}
