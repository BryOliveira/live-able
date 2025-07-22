'use client';
import React, { useState } from 'react';
import { CalcForm } from '@/lib/utils/forms';
import { WarningIcon } from '@phosphor-icons/react';

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
  const [errors, setErrors] = useState<Partial<Record<keyof CalcForm, string>>>({});

  
  const validateForm = (data: CalcForm): Partial<Record<keyof CalcForm, string>> => {
    const newErrors: Partial<Record<keyof CalcForm, string>> = {};
    
    if (data.homePrice < 0) {
      newErrors.homePrice = `Home price must be greater than $0.`;
    }
    
    if (data.downPayment < 0) {
      newErrors.downPayment = 'Down payment must be greater than $0.';
    }
    
    if (data.downPayment > data.homePrice) {
      newErrors.downPayment = 'Down payment must be less than the home price.';
      newErrors.homePrice = 'Home price must be greater than the down payment.';
    }
    
    if (data.minSalary < 0 || data.minSalary > data.maxSalary) {
      newErrors.minSalary = 'Invalid minimum salary.';
    }
    
    if (data.maxSalary < 0 || data.maxSalary < data.minSalary) {
      newErrors.maxSalary = 'Invalid maximum salary.';
    }

    if (data.loanTerm <= 0 || data.loanTerm > 100) {
      newErrors.loanTerm = 'Loan term is invalid. Valid range is between 0 and 100 exclusive.';
    }

    if (data.interestRate < 0) {
      newErrors.interestRate = 'Interest rate must be greater than 0%';
    }
    
    return newErrors;
  };

  const warningMessage = (errorKey: keyof CalcForm) => {
    if (!errors[errorKey]) return null;
    
    return (
      <span id={`${getFieldId(errorKey)}-error`} className='error-message' role='alert'>
        <WarningIcon size={18} className='error-icon'/> {errors[errorKey]}
      </span>
    );
  };
  
  const inputChangeHandler = (field: keyof CalcForm, value: string | number) => {
    const newFormData = {
      ...formData,
      [field]: value
    };
    setFormData(newFormData);

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    })

    const relatedValidation = validateForm(newFormData);
    if (Object.keys(relatedValidation).length > 0) {
      setErrors(prev => ({ ...prev, ...relatedValidation }));
    }
  };

  const getFieldId = (field: string): string => {
    const fieldMap: Record<string, string> = {
      homePrice: 'home-price',
      downPayment: 'down-payment',
      salaryType: 'salary-type',
      minSalary: 'min-salary',
      maxSalary: 'max-salary',
      loanTerm: 'loan-term',
      interestRate: 'interest-rate'
    };
    return fieldMap[field] || field;
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    
    const validationErrors = validateForm(formData);
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(getFieldId(firstErrorField));
      element?.focus();
      
      return;
    }
    
    setErrors({});
    onSubmit(formData);
  };

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
              className={errors.homePrice ? 'error' : ''}
            />
          </div>
          {warningMessage('homePrice')}
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
              className={errors.downPayment ? 'error' : ''}
            />
          </div>
          {warningMessage('downPayment')}
        </div>

        <div className='form-group select'>
          <label htmlFor='salary-type'>Salary Type</label>
          <select 
            id='salary-type'
            onChange={(event) => inputChangeHandler('salaryType' , event.target.value)}
          >
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
              className={errors.minSalary ? 'error' : ''}
            />
          </div>
          {warningMessage('minSalary')}
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
              className={errors.maxSalary ? 'error' : ''}
            />
          </div>
          {warningMessage('maxSalary')}
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
              onChange={(event) => inputChangeHandler('loanTerm', event.target.value)}
              step='1' 
            />
            <span className='input-suffix'>years</span>
          </div>
          {warningMessage('loanTerm')}
        </div>
        
        <div className='form-group'>
          <label htmlFor='interest-rate'>Interest Rate</label>
          <div className='input-with-symbol'>
            <input 
              required 
              id='interest-rate' 
              type='number' 
              min='0'
              placeholder='Enter interest rate' 
              defaultValue={defaultValues.interestRate}
              onChange={(event) => inputChangeHandler('interestRate', event.target.value)} 
              step='any' 
            />
            <span className='input-suffix'>%</span>
          </div>
          {warningMessage('interestRate')}
        </div>
        
        <button type='submit' className='tool-submit'>Calculate</button>
      </form>
    </div>
  );
}
