import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

import clsxm from '@/lib/clsxm';

import students, { Student } from '@/data/students';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import Seo from '@/components/Seo';
import VerificationLabel from '@/components/VerificationLabel';

export default function SortingTablePage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

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
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Layout>
      <Seo templateTitle='Sorting Table' />

      <main>
        <section>
          <div className='layout min-h-screen py-20'>
            <ArrowLink href='/' direction='left' as={PrimaryLink}>
              Back
            </ArrowLink>

            <h1 className='mt-4'>Sorting Table</h1>

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
                                className='group py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6'
                              >
                                {header.isPlaceholder ? null : (
                                  <div
                                    className={clsxm(
                                      'relative flex items-center gap-3 py-1',
                                      header.column.getCanSort()
                                        ? 'cursor-pointer select-none'
                                        : ''
                                    )}
                                    onClick={header.column.getToggleSortingHandler()}
                                  >
                                    <p>
                                      {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                    </p>
                                    {header.column.getCanSort() &&
                                    !header.column.getIsSorted() ? (
                                      <GoTriangleUp className='text-transparent group-hover:text-gray-400' />
                                    ) : (
                                      {
                                        asc: (
                                          <GoTriangleUp className='text-gray-700' />
                                        ),
                                        desc: (
                                          <GoTriangleDown className='text-gray-700' />
                                        ),
                                      }[
                                        header.column.getIsSorted() as string
                                      ] ?? null
                                    )}
                                  </div>
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
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
