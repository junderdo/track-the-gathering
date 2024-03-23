import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseManyDto, ResponseOneDto } from './response.dto';
import { getMeta, getLinks } from './response.utils';
import { Request } from 'express';

@Injectable()
export class ResponseOneInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ResponseOneDto> {
    const req: Request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        return {
          data: data,
          meta: getMeta(req, 'one'),
          links: getLinks(req, 'one'),
        };
      })
    );
  }
}

@Injectable()
export class GetOneInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ResponseOneDto> {
    return next.handle();
  }
}

@Injectable()
export class ResponseManyInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ResponseManyDto> {
    const req: Request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        return {
          data: data,
          meta: getMeta(req, 'many', data),
          links: getLinks(req, 'many', data),
        };
      })
    );
  }
}

@Injectable()
export class GetManyInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ResponseManyDto> {
    const req: Request = context.switchToHttp().getRequest();

    //set default RequestManyDto properties if not provided
    if (!req.query['take']) req.query['take'] = `${20}`;
    if (!req.query['page']) req.query['page'] = `${1}`;

    return next.handle();
  }
}
