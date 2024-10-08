import { Column, Entity } from 'typeorm';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';
import {
  BasePublicEntity,
} from '@track-the-gathering/shared/data-access';

@Entity({ name: 'user' })
export class User extends BasePublicEntity {

  constructor(data?: Partial<User>) {
    super(data);
    Object.assign(this, data);
  }

  @Column({ type: 'text' })
  @IsString()
  name!: string;

  @Column({ type: 'text', unique: true })
  @IsEmail()
  email!: string;

  @Column({ type: 'text', nullable: true })
  @IsUrl()
  @IsOptional()
  pictureUrl?: string;
}
