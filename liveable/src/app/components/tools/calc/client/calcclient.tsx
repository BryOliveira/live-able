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

/**
 * React component for the client-side calculator tool.
 *
 * This component initializes form data from URL search parameters, applies default values,
 * and manages form state for the calculator. 
 * It renders the calculator form, a graph, and a flower visualization based on the current form data.
 *
 * @returns The rendered calculator client UI as a ReactNode.
 */
export default function CalcClient(): React.ReactNode {
  const searchParams = useSearchParams();
  const initialFormData: CalcForm = { ...defaultValues } as CalcForm;
  (Object.keys(defaultValues) as (keyof CalcForm)[]).forEach((key) => {
    const value = searchParams.get(key);
    if (value !== null) {
      if (typeof defaultValues[key] === 'number') {
        ((initialFormData as unknown) as Record<string, unknown>)[key] = Number(value);
      } else {
        ((initialFormData as unknown) as Record<string, unknown>)[key] = value;
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
      <CalcFormWrapper onSubmit={submitHandler} initialValues={initialFormData} />
      <GraphWrapper formResults={formData} />
      <FlowerWrapper formResults={formData} />
    </div>
  );
}
