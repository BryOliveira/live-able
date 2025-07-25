import CalcClient from '@/app/components/tools/calc/client/calcclient';
import React, { Suspense  } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Calculator' };

/**
 * Renders the main page for the Liveability Mortgage Calculator tool.
 *
 * This component displays a heading and loads the `CalcClient` component
 * asynchronously, showing a loading message while it is being fetched.
 *
 * @returns The rendered calculator page as a ReactNode.
 */
export default function CalcPage(): React.ReactNode {
  return (
    <div className='calc-wrapper'>
      <h1>Liveability Mortgage Calculator</h1>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <CalcClient />
      </Suspense>
    </div>
  );
}