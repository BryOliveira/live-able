'use client';
import { useState } from 'react';
import CalcFormWrapper from './clientform';
import GraphWrapper from '../graphwrapper';
import FlowerWrapper from '../flowerwrapper';
import { CalcForm } from '@/lib/utils/forms';
import { useSearchParams } from 'next/navigation'

const defaultValues = {
    homePrice: 427000, // median us house cost
    downPayment: 75000, // 18% of homePrice, median down payment in the US
    salaryType: 'Annual',
    minSalary: 36500, // 25th percentile of us income 
    maxSalary: 208000, // 75th percent of us income
    loanTerm: 30, // most common mortgage length
    interestRate: 6.8 // median us interest rate
  };

export default function CalcClient(): React.ReactNode {
  const searchParams = useSearchParams();
  let initialFormData: CalcForm = { ...defaultValues };
  Object.keys(defaultValues).forEach((key) => {
    const value = searchParams.get(key);
    if (value !== null) {
      const isNumber = typeof defaultValues[key as keyof CalcForm] === 'number';

      if (isNumber) {
        (initialFormData as any)[key] = Number(value) as CalcForm[keyof CalcForm];
      } else {
        (initialFormData as any)[key] = value as CalcForm[keyof CalcForm];
      }
    }
    console.log(key, value);
  });
  const homePrice = Number(initialFormData.homePrice) || defaultValues.homePrice;
  initialFormData.downPayment = +(0.2 * homePrice).toFixed(2);

  const [formData, setFormData] = useState<CalcForm>(initialFormData);

  const submitHandler = (data: CalcForm) => {
    setFormData(data);
  };

  return (
    <div className='calc-client-wrapper'>
      <CalcFormWrapper onSubmit={submitHandler} initalValues={initialFormData} />
      <GraphWrapper formResults={formData} />
      <FlowerWrapper formResults={formData} />
    </div>
  );
}
