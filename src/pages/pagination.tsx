import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import students, { Student } from '@/data/students';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import Seo from '@/components/Seo';
import PaginatedTable from '@/components/table/PaginatedTable';
import VerificationLabel from '@/components/VerificationLabel';

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

            <PaginatedTable
              columns={columns}
              data={students}
              className='mt-8'
              withFilter
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
