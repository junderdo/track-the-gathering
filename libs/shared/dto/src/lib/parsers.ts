import { instanceToInstance, instanceToPlain } from 'class-transformer';
import { BASE_PROPS_REQUEST_MANY_DTO, RequestManyDto } from './request.dto';

export const parseQueryParamsWhere = <T extends RequestManyDto>(query: T) => {
  const where = instanceToInstance(query) as Record<string, unknown>;
  //remove props from the base DTO (i.e. related to pagination) to properly construct where clause
  BASE_PROPS_REQUEST_MANY_DTO.forEach((prop: string) => delete where[prop]);
  return instanceToPlain(where, { exposeUnsetFields: false });
};
