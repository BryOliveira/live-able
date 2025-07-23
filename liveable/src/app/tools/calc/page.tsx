// Adjust the import path and extension if needed
import CalcClient from '@/app/components/tools/calc/client/calcclient';
import React, { Suspense  } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Calculator' };

export default function CalcPage(): React.ReactNode {
  return (
    <div className='calc-wrapper'>
      <h1>Liveability Mortgage Calculator</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CalcClient />
      </Suspense>
    </div>
  );
}