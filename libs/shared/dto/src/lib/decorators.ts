/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import {
  GetOneInterceptor,
  GetManyInterceptor,
  ResponseOneInterceptor,
  ResponseManyInterceptor,
} from './interceptors';
import { ResponseLinks, ResponseMeta } from './response.dto';

// eslint-disable-next-line @typescript-eslint/ban-types
const ResponseApiDocs = (responseDto: Function) => {
  return applyDecorators(
    ApiExtraModels(responseDto, ResponseMeta, ResponseLinks),
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(responseDto),
      },
    })
  );
};

//for use in controller POST, PATCH, PUT methods where a single record is returned
export const ResponseOne = (responseDto: Function) => {
  return applyDecorators(
    ResponseApiDocs(responseDto),
    UseInterceptors(ResponseOneInterceptor)
  );
};

//for use in controller GET methods where a single record is returned
export const GetOne = (responseDto: Function) => {
  return applyDecorators(
    UseInterceptors(GetOneInterceptor),
    ResponseOne(responseDto)
  );
};

//for use in controller POST, PATCH, PUT methods where multiple records are returned
export const ResponseMany = (responseDto: Function) => {
  return applyDecorators(
    ResponseApiDocs(responseDto),
    UseInterceptors(ResponseManyInterceptor)
  );
};

//for use in controller GET methods where multiple records are returned
export const GetMany = (responseDto: Function) => {
  return applyDecorators(
    UseInterceptors(GetManyInterceptor),
    ResponseMany(responseDto)
  );
};
