// Adjust the import path and extension if needed
import CalcClient from '@/app/components/tools/calc/client/calcclient';
import React from 'react';

export default function CalcPage(): React.ReactNode {
  return (
    <div className='calc-wrapper'>
      <h1>Liveability Mortgage Calculator</h1>
      <CalcClient />
    </div>
  );
}