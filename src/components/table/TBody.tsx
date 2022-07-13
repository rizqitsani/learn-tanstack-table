import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

type TBodyProps<T extends RowData> = {
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TBody<T extends RowData>({
  className,
  table,
  ...rest
}: TBodyProps<T>) {
  return (
    <tbody
      className={clsxm('divide-y divide-gray-200 bg-white', className)}
      {...rest}
    >
      {table.getRowModel().rows.map((row, index) => (
        <tr
          key={row.id}
          className={clsxm(index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}
        >
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6'
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
