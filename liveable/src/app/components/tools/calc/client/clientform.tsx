'use client';
import React, { useState } from 'react';
import { CalcForm } from '@/lib/utils/forms';

interface CalcFormProps {
  onSubmit: (data: CalcForm) => void;
} 

export const defaultValues = {
    homePrice: 427000, // median us house cost
    downPayment: 75000, // 18% of homePrice, median down payment in the US
    salaryType: 'Annual',
    minSalary: 36500, // 25th percentile of us income 
    maxSalary: 208000, // 75th percent of us income
    loanTerm: 30, // most common mortgage length
    interestRate: 6.8 // median us interest rate
  };

export default function CalcFormWrapper({ onSubmit }: CalcFormProps): React.ReactNode {
  const [formData, setFormData] = useState<CalcForm>(defaultValues);

  const inputChangeHandler = (field: keyof CalcForm, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  } 

  const parseInputValue = (value: string): number => {
    const cleaned = value.replace(/,/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  return (
    <div className='form-wrapper'>
      <form className='calc-form' onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='home-price'>Home Price</label>
          <div className='input-with-symbol'>
            <span className='input-symbol'>$</span>
            <input 
              required 
              id='home-price' 
              type='text' 
              min='0'
              placeholder='Enter home price'
              defaultValue={defaultValues.homePrice}
              onChange={(event) => inputChangeHandler('homePrice', parseInputValue(event.target.value))}
            />
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='down-payment'>Down Payment</label>
          <div className='input-with-symbol'>
            <span className='input-symbol'>$</span>
            <input 
              required 
              id='down-payment' 
              type='text' 
              min='0' 
              placeholder='Enter down payment' 
              defaultValue={defaultValues.downPayment}
              onChange={(event) => inputChangeHandler('downPayment', parseInputValue(event.target.value))}
            />
          </div>
        </div>

        <div className='form-group select'>
           <label htmlFor='salary-type'>Salary Type</label>
           <select id='salary-type'>
             <option value='annual'>Annual</option>
             <option value='hourly'>Hourly</option>
           </select>
        </div>
         
        <div className='form-group'>
          <label htmlFor='min-salary'>Minimum Job Salary</label>
          <div className='input-with-symbol'>
            <span className='input-symbol'>$</span>
            <input 
              required 
              id='min-salary' 
              type='text' 
              min='0' 
              placeholder='Enter minimum salary' 
              defaultValue={defaultValues.minSalary}
              onChange={(event) => inputChangeHandler('minSalary', parseInputValue(event.target.value))}
            />
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='max-salary'>Maximum Job Salary</label>
          <div className='input-with-symbol'>
            <span className='input-symbol'>$</span>
            <input 
              required 
              id='max-salary' 
              type='text' 
              min='0' 
              placeholder='Enter maximum salary' 
              defaultValue={defaultValues.maxSalary}
              onChange={(event) => inputChangeHandler('maxSalary', parseInputValue(event.target.value))}
            />
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor='loan-term'>Length of Loan Term</label>
          <div className='input-with-symbol'>
            <input 
              required 
              id='loan-term' 
              type='number' 
              min='0' 
              max='100'
              placeholder='Enter length of term' 
              defaultValue={defaultValues.loanTerm}
              onChange={(event) => inputChangeHandler('loanTerm', parseInputValue(event.target.value))}
              step='1' 
            />
            <span className='input-suffix'>years</span>
          </div>
        </div>
        
        <div className='form-group'>
          <label htmlFor='interest-rate'>Interest Rate</label>
          <div className='input-with-symbol'>
            <input 
              required 
              id='interest-rate' 
              type='text' 
              min='0 ' 
              placeholder='Enter interest rate' 
              defaultValue={defaultValues.interestRate}
              onChange={(event) => inputChangeHandler('interestRate', parseInputValue(event.target.value))}  
            />
            <span className='input-suffix'>%</span>
          </div>
        </div>
        
        <button type='submit' className='tool-submit'>Calculate</button>
      </form>
    </div>
  );
}
