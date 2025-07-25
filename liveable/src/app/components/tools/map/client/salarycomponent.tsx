import React from 'react';
import { MapForm } from '@/lib/utils/forms';
import { parseInputValue } from '@/lib/utils/tools';

// Interface for TypeScript Typing.
export interface MapFormProps {
  formData: MapForm;
  setFormData: React.Dispatch<React.SetStateAction<MapForm>>;
}

/**
 * Renders a form for entering salary, down payment, loan term, and interest rate.
 *
 * @param formData - The current form data containing salary, down payment, loan term, and interest rate.
 * @param setFormData - Function to update the form data state.
 * @returns The rendered salary component form as a ReactNode.
 */
export default function SalaryComponent({ formData, setFormData }: MapFormProps): React.ReactNode {
  const inputChangeHandler = (field: keyof MapForm, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className='form-wrapper'>
      <form className='map-form'>
        <div className='form-group'>
          <label htmlFor='salary'>Salary</label>
          <div className='input-with-symbol'>
            <span className='input-symbol'>$</span>
            <input
              required
              id='salary'
              type='text'
              min='0'
              placeholder='Enter a salary'
              defaultValue={formData.salary}
              onChange={event => inputChangeHandler('salary', parseInputValue(event.target.value))}
              autoComplete="off"
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
              defaultValue={formData.downPayment}
              onChange={event => inputChangeHandler('downPayment', parseInputValue(event.target.value))}
              autoComplete="off"
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='loan-term'>Loan Term</label>
          <div className='input-with-symbol'>
            <input
              required
              id='loan-term'
              type='number'
              min='1'
              max='100'
              placeholder='Loan term'
              defaultValue={formData.loanTerm}
              onChange={event => inputChangeHandler('loanTerm', event.target.value)}
              step='1'
              autoComplete="off"
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
              type='number'
              min='0'
              step='any'
              placeholder='Interest rate'
              defaultValue={formData.interestRate}
              onChange={event => inputChangeHandler('interestRate', event.target.value)}
              autoComplete="off"
            />
            <span className='input-suffix'>%</span>
          </div>
        </div>
      </form>
      <p>NOTE: Home price is the median home price for each state.</p>
    </div>
  );
}