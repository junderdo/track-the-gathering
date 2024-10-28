import { ApiPropertyOptional } from '@nestjs/swagger';

//IMPORTANT: if these base DTOs are updated, review the functionality in the DTO parsers (./parsers.ts)
//    and ensure that any new base properties are properly accounted for and removed as needed
//    i.e. review BASE_PROPS_REQUEST_MANY_DTO values and how it's used in the DTO parsers

export class RequestOneDto {}
export const BASE_PROPS_REQUEST_ONE_DTO: string[] = Object.keys(
  Reflect.construct(RequestOneDto, [])
);

export class RequestManyDto {
  @ApiPropertyOptional({
    description: 'Number of records to return per page',
    default: 20,
  })
  take?: number;

  @ApiPropertyOptional({
    description: 'Page number to get',
    default: 1,
  })
  page?: number;

  constructor(take = 20, page = 1) {
    this.take = take;
    this.page = page;
  }
}
export const BASE_PROPS_REQUEST_MANY_DTO: string[] = Object.keys(
  Reflect.construct(RequestManyDto, [])
);
