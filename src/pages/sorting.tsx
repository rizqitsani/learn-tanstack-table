import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import students, { Student } from '@/data/students';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';
import VerificationLabel from '@/components/VerificationLabel';

export default function SortingTablePage() {
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
      <Seo templateTitle='Sorting Table' />

      <main>
        <section>
          <div className='layout min-h-screen py-20'>
            <ArrowLink href='/' direction='left' as={PrimaryLink}>
              Back
            </ArrowLink>

            <h1 className='mt-4'>Sorting Table</h1>

            <Table columns={columns} data={students} className='mt-8' />
          </div>
        </section>
      </main>
    </Layout>
  );
}
