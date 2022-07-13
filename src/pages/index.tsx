import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <h1 className='mt-4'>Tanstack Table Examples</h1>

            <div className='mt-6 grid grid-cols-3 gap-3'>
              {/* <div className='mt-6 flex flex-col space-y-3'> */}
              <ButtonLink href='/basic' variant='light'>
                Basic
              </ButtonLink>
              <ButtonLink href='/sorting' variant='light'>
                Sorting
              </ButtonLink>
              <ButtonLink href='/filter' variant='light'>
                Filter
              </ButtonLink>
              <ButtonLink href='/pagination' variant='light'>
                Pagination
              </ButtonLink>
            </div>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://rizqitsani.com'>
                Muhammad Rizqi Tsani
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
