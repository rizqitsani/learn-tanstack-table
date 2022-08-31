import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Filter from '@/components/table/Filter';
import TBody from '@/components/table/TBody';
import THead from '@/components/table/THead';

import { PaginatedApiResponse } from '@/types/api';

type ServerTableState = {
  pagination: PaginationState;
  sorting: SortingState;
};

type SetServerTableState = {
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
};

type ServerTableProps<T extends object> = {
  columns: ColumnDef<T>[];
  data: T[];
  meta: Pick<PaginatedApiResponse<T>, 'meta'>['meta'] | undefined;
  isLoading: boolean;
  tableState: ServerTableState;
  setTableState: SetServerTableState;
  omitSort?: boolean;
  withFilter?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function ServerTable<T extends object>({
  className,
  columns,
  data,
  meta,
  isLoading,
  tableState,
  setTableState,
  omitSort = false,
  withFilter = false,
  ...rest
}: ServerTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: meta?.last_page ?? 0,
    state: tableState,
    onPaginationChange: setTableState.setPagination,
    onSortingChange: setTableState.setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  const TABLE_MESSAGE = {
    LOADING: 'Memuat data...',
    DATA_NOT_FOUND: 'Tidak ada data',
    DATA_FOUND: `Menampilkan data ke ${meta?.from} - ${meta?.to} dari ${meta?.total} data`,
    PAGE_SIZE: 'Data per Halaman',
  };

  return (
    <div className={clsxm('flex flex-col', className)} {...rest}>
      {withFilter && <Filter table={table} />}
      <div className='-my-2 -mx-4 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <THead table={table} omitSort={omitSort} />
              <TBody table={table} />
            </table>
          </div>
        </div>
      </div>

      {/* Pagination Control */}
      <div className='mt-4 flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between'>
        <p className='text-sm text-gray-400'>
          {isLoading
            ? TABLE_MESSAGE.LOADING
            : table.getPageCount() > 0
            ? TABLE_MESSAGE.DATA_FOUND
            : TABLE_MESSAGE.DATA_NOT_FOUND}
        </p>
        <div className='flex items-center justify-between gap-x-2  md:justify-end'>
          <div className='flex items-center gap-2'>
            <p className='flex-shrink-0 text-sm text-gray-400'>
              {TABLE_MESSAGE.PAGE_SIZE}
            </p>
            <select
              className={clsxm(
                'border-gray-300 bg-gray-50 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
                'block w-full rounded-md text-sm text-gray-500 shadow-sm sm:max-w-xs'
              )}
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 25].map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </div>
          <div className='flex gap-1'>
            <Button
              className='rounded-md !p-2'
              variant='light'
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <HiChevronLeft size={20} />
            </Button>
            <Button
              className='rounded-md !p-2'
              variant='light'
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <HiChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
