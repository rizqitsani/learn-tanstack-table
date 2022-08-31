import { PaginationState, SortingState } from '@tanstack/react-table';
import * as React from 'react';

type useServerTableProps<T extends object> = {
  pageSize?: number;
  sort: {
    key: Extract<keyof T, string>;
    type: 'asc' | 'desc';
  };
};

export type ServerTableState = {
  pagination: PaginationState;
  sorting: SortingState;
};

export default function useServerTable<T extends object>({
  pageSize = 10,
  sort,
}: useServerTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: sort.key,
      desc: sort.type === 'desc',
    },
  ]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  return {
    tableState: {
      pagination,
      sorting,
    },
    setTableState: {
      setPagination,
      setSorting,
    },
  };
}
