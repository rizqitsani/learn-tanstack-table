import { RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { HiSearch } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

type FilterProps<T extends RowData> = {
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Filter<T extends RowData>({
  className,
  table,
  ...rest
}: FilterProps<T>) {
  return (
    <div
      className={clsxm(
        'flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
      {...rest}
    >
      <div>
        <label className='sr-only text-gray-500'>Search</label>
        <div className='relative'>
          <input
            placeholder='Search...'
            value={table.getState().globalFilter ?? ''}
            onChange={(e) => {
              table.setGlobalFilter(String(e.target.value));
            }}
            className={clsxm(
              'w-full rounded-md sm:max-w-xs',
              'px-4 py-2 pl-9',
              'text-sm placeholder-gray-400 md:text-base',
              'border border-gray-300 focus:border-primary-500 focus:ring-primary-500'
            )}
          />
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2'>
            <HiSearch className='text-xl text-gray-400' />
          </div>
        </div>
      </div>
    </div>
  );
}
