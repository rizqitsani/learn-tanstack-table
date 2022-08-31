import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import { buildPaginatedTableURL } from '@/lib/table';
import useServerTable from '@/hooks/useServerTable';

import { Student } from '@/data/students';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import Seo from '@/components/Seo';
import ServerTable from '@/components/table/ServerTable';
import VerificationLabel from '@/components/VerificationLabel';

import { PaginatedApiResponse } from '@/types/api';

export default function ServerTablePage() {
  const { tableState, setTableState } = useServerTable<Student>({
    sort: { key: 'name', type: 'desc' },
  });

  const { data: queryData, isLoading } = useQuery<
    PaginatedApiResponse<Student[]>,
    Error
  >([buildPaginatedTableURL({ baseUrl: '/students', tableState })], {
    keepPreviousData: true,
  });

  const columns = React.useMemo<ColumnDef<Student>[]>(
    () => [
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
    ],
    []
  );

  return (
    <Layout>
      <Seo templateTitle='Server Table' />

      <main>
        <section>
          <div className='layout min-h-screen py-20'>
            <ArrowLink href='/' direction='left' as={PrimaryLink}>
              Back
            </ArrowLink>

            <h1 className='mt-4'>Server Table</h1>

            <ServerTable
              columns={columns}
              data={queryData?.data ?? []}
              meta={queryData?.meta}
              isLoading={isLoading}
              tableState={tableState}
              setTableState={setTableState}
              className='mt-8'
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
