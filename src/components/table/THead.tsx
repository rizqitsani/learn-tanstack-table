import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

import clsxm from '@/lib/clsxm';

type THeadProps<T extends RowData> = {
  omitSort: boolean;
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function THead<T extends RowData>({
  className,
  omitSort,
  table,
  ...rest
}: THeadProps<T>) {
  return (
    <thead className={clsxm('bg-gray-50', className)} {...rest}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              scope='col'
              className='group py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6'
            >
              {header.isPlaceholder ? null : (
                <div
                  className={clsxm(
                    'relative flex items-center gap-3 py-1',
                    !omitSort && header.column.getCanSort()
                      ? 'cursor-pointer select-none'
                      : ''
                  )}
                  onClick={
                    omitSort
                      ? () => null
                      : header.column.getToggleSortingHandler()
                  }
                >
                  <p>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </p>
                  {!omitSort &&
                  header.column.getCanSort() &&
                  !header.column.getIsSorted() ? (
                    <GoTriangleUp className='text-transparent group-hover:text-gray-400' />
                  ) : (
                    {
                      asc: <GoTriangleUp className='text-gray-700' />,
                      desc: <GoTriangleDown className='text-gray-700' />,
                    }[header.column.getIsSorted() as string] ?? null
                  )}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
