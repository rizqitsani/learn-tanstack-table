import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import students, { Student } from '@/data/students';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import Seo from '@/components/Seo';
import VerificationLabel from '@/components/VerificationLabel';

enum TableMessageEnum {
  'COLUMN_LOADING',
  'COLUMN_NOT_FOUND',
  'TEXT_LOADING',
  'TEXT_NOT_FOUND',
  'TEXT_FOUND',
  'PAGINATE_FOUND',
}
type TableMessageType = {
  [key in keyof typeof TableMessageEnum]: string;
};

export default function PaginationTablePage() {
  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: 'name',
    },
    {
      accessorKey: 'address',
    },
    {
      accessorKey: 'verified',
      cell: (props) => <VerificationLabel status={props.getValue()} />,
    },
  ];

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const TABLE_MESSAGE: TableMessageType = {
    COLUMN_LOADING: 'Memuat data...',
    COLUMN_NOT_FOUND: 'Tidak ditemukan Data',
    TEXT_LOADING: 'Memuat data...',
    TEXT_NOT_FOUND: 'Tidak ditemukan Data',
    TEXT_FOUND: `Menampilkan data ke ${
      table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize +
      1
    } - ${
      table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize +
      table.getState().pagination.pageSize
    } dari ${students.length} data`,
    PAGINATE_FOUND: 'Data per Halaman',
  };

  return (
    <Layout>
      <Seo templateTitle='Pagination Table' />

      <main>
        <section>
          <div className='layout min-h-screen py-20'>
            <ArrowLink href='/' direction='left' as={PrimaryLink}>
              Back
            </ArrowLink>

            <h1 className='mt-4'>Pagination Table</h1>

            <div className='mt-8 flex flex-col'>
              <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                  <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-300'>
                      <thead className='bg-gray-50'>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <th
                                key={header.id}
                                scope='col'
                                className='py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6'
                              >
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody className='divide-y divide-gray-200 bg-white'>
                        {table.getRowModel().rows.map((row, index) => (
                          <tr
                            key={row.id}
                            className={clsxm(
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            )}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <td
                                key={cell.id}
                                className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6'
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className='mt-4 flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between'>
                <p className='text-sm text-gray-400'>
                  {table.getPageCount() > 0
                    ? TABLE_MESSAGE.TEXT_FOUND
                    : TABLE_MESSAGE.TEXT_NOT_FOUND}
                </p>
                <div className='flex items-center justify-between gap-x-2  md:justify-end'>
                  <div className='flex items-center gap-2'>
                    <p className='flex-shrink-0 text-sm text-gray-400'>
                      {TABLE_MESSAGE.PAGINATE_FOUND}
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
          </div>
        </section>
      </main>
    </Layout>
  );
}
