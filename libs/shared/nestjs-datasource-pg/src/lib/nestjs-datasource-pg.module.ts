import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDataSourceConfig } from './postgres.datasource.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...PostgresDataSourceConfig.config(),
      //auto-register all entities registered via TypeOrmModule.forFeature()
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class SharedNestjsDatasourcePgModule {}
