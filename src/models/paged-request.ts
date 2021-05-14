import { SortDirection } from "./sort-direction.enum";

export interface PagedRequest<T> {
  page: Page;
  searchField: T;
}

export interface Page {
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}
