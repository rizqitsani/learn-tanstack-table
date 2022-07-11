import React from 'react';
import { HiCheck, HiX } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

type VerificationProps = {
  status: boolean;
};

export default function VerificationLabel({ status }: VerificationProps) {
  return (
    <span
      className={clsxm(
        'inline-flex items-center gap-1 rounded-md border py-1 px-2 text-xs font-semibold',
        status
          ? 'border-green-200 bg-green-200 text-green-900'
          : 'border-red-200 bg-red-200 text-red-900'
      )}
    >
      {status ? (
        <>
          Sudah Verifikasi <HiCheck />
        </>
      ) : (
        <>
          Belum Diverifikasi <HiX />
        </>
      )}
    </span>
  );
}
