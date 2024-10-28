/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BaseEntity } from 'typeorm';
import { ResponseLinks, ResponseMeta } from './response.dto';
import { Request } from 'express';

type RequestType = 'one' | 'many';

export const getLinks = (
  req: Request,
  type: RequestType,
  data?: BaseEntity[]
): ResponseLinks => {
  const protocol = req.secure ? 'https' : 'http';
  const urlString = `${protocol}://${req.get('Host')}${req.originalUrl}`;
  const url = new URL(urlString);

  //only return self link if request type is get one
  if (type === 'one') return { self: url.toString() };

  //these values should be set for all GET Many requests via the GetManyInterceptor
  const pageNum = req.query['page'];
  const takeNum = req.query['take'];

  //set pagination query params on url if getting many
  url.searchParams.set('page', `${pageNum}`);
  url.searchParams.set('take', `${takeNum}`);

  let next, previous, self;
  if (takeNum && pageNum) {
    self = url;

    //assumes that if there is exactly the same number of records as the page limit,
    //    there could be more to query for (written this way to avoid an additional db query)
    if (data?.length === +takeNum) {
      next = new URL(url);
      next.searchParams.set('page', `${+pageNum + 1}`);
    }

    if (+pageNum > 1) {
      previous = new URL(url);
      previous.searchParams.set('page', `${+pageNum - 1}`);
    }
  }

  return {
    self: self?.toString() ?? null,
    next: next?.toString() ?? null,
    previous: previous?.toString() ?? null,
  };
};

export const getMeta = (
  req: Request,
  type: RequestType,
  data?: BaseEntity[]
): ResponseMeta => {
  const meta: ResponseMeta = {};
  if (type === 'many') {
    const { take, page } = req.query;
    meta.itemCount = data?.length;

    if (req.query['page'] && req.query['take']) {
      meta.itemsPerPage = take ? +take : undefined;
      meta.currentPage = page ? +page : 1;
    }
  } else if (type === 'one') {
    meta.itemCount = 1;
  }
  return meta;
};
