'use client';
import { useState } from 'react';
import CalcFormWrapper, { defaultValues } from './clientform';
import GraphWrapper from '../graphwrapper';
import FlowerWrapper from '../flowerwrapper';
import { CalcForm } from '@/lib/utils/forms';

export default function CalcClient(): React.ReactNode {
  const [formData, setFormData] = useState<CalcForm>(defaultValues);

  const submitHandler = (data: CalcForm) => {
    setFormData(data);
  };

  return (
    <div className='calc-client-wrapper'>
      <CalcFormWrapper onSubmit={submitHandler} />
      <GraphWrapper formResults={formData} />
      <FlowerWrapper formResults={formData} />
    </div>
  );
}
