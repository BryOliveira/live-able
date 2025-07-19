'use client';
import { useState } from 'react';
import CalcFormWrapper from './clientform';
import GraphWrapper from './calcgraph';
import { CalcForm } from '@/lib/utils/forms';

export default function CalcClient(): React.ReactNode {
  const [formData, setFormData] = useState<CalcForm>();

  const submitHandler = (data: CalcForm) => {
    setFormData(data);
  };

  return (
    <div className='calc-client-wrapper'>
      <CalcFormWrapper onSubmit={submitHandler} />
      <GraphWrapper />
    </div>
  );
}
