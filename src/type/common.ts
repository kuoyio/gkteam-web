export interface Response<T> {
  code?: string;
  data?: T | null;
  message?: string;
}

export interface PageResult<T> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data?: T[] | null;
}
