import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import students from '@/data/students';

import Button from '@/components/buttons/Button';
import Filter from '@/components/table/Filter';
import TBody from '@/components/table/TBody';
import THead from '@/components/table/THead';

type PaginatedTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  omitSort?: boolean;
  withFilter?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function PaginatedTable<T extends object>({
  className,
  columns,
  data,
  pageSize = 10,
  omitSort = false,
  withFilter = false,
  ...rest
}: PaginatedTableProps<T>) {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const TABLE_MESSAGE = {
    DATA_NOT_FOUND: 'Tidak ada data',
    DATA_FOUND: `Menampilkan data ke ${
      table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize +
      1
    } - ${
      table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize +
      table.getState().pagination.pageSize
    } dari ${students.length} data`,
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
          {table.getPageCount() > 0
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
              disabled={
                !table.getCanNextPage() ||
                students.length < table.getState().pagination.pageSize
              }
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
