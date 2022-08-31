import { ServerTableState } from '@/hooks/useServerTable';

type BuildPaginationTableParam = {
  /** API Base URL, with / on the front */
  baseUrl: string;
  tableState: ServerTableState;
  /** Parameter addition
   * @example ['include=user,officer']
   */
  additionalParam?: string[];
};
type BuildPaginationTableURL = (props: BuildPaginationTableParam) => string;

export const buildPaginatedTableURL: BuildPaginationTableURL = ({
  baseUrl,
  tableState,
  additionalParam,
}) => {
  const pagePaginateOption = `page_size=${
    tableState.pagination.pageSize
  }&page_number=${tableState.pagination.pageIndex + 1}`;

  const pageSortOption =
    tableState.sorting.length > 0
      ? `&sort=${tableState.sorting[0].id}&type=${
          tableState.sorting[0].desc ? 'desc' : 'asc'
        }`
      : '';

  const additional =
    additionalParam && additionalParam.length > 0
      ? `&${additionalParam.join('&')}`
      : '';

  return `${baseUrl}?${pagePaginateOption}${pageSortOption}${additional}`;
};
