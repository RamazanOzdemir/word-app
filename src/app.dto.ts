export type PaginationList<T> = {
  limit: number;
  offset: number;
  total: number;
  data: Array<T>;
};
