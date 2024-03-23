import { BaseEntity } from '@track-the-gathering/shared/data-access';

//TODO create separate metadata dtos for get one vs many?
export class ResponseLinks {
  self?: string | null;
  next?: string | null;
  previous?: string | null;
}

export class ResponseMeta {
  itemsPerPage?: number;
  currentPage?: number;
  itemCount?: number;
  //TODO?
  /* totalItems?: number; */
  /* totalPages?: number; */
  /* sortBy?: number; */
  /* filter?: unknown; */
}

export abstract class ResponseOneDto {
  abstract data: BaseEntity;
  meta!: ResponseMeta;
  links!: ResponseLinks;
}

export abstract class ResponseManyDto {
  abstract data: BaseEntity[];
  meta!: ResponseMeta;
  links!: ResponseLinks;
}
