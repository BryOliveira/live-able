'use client';
import React, { useEffect } from 'react';
// import { formatCurrency } from '@/lib/utils/format';

const DisableNumberScroll = () => {
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.target instanceof HTMLInputElement && event.target.type === 'number') {
        event.preventDefault();
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
};

export default function CalcClient(): React.ReactNode {
  DisableNumberScroll();
  return (
    <form className='tool-form'>
      <div className='form-group'>
        <label htmlFor='home-price'>Home Price</label>
        <div className='input-with-prefix'>
          <span className='input-prefix'>$</span>
          <input id='home-price' type='number' placeholder='Enter home price' />
        </div>
      </div>
      
      <div className='form-group select'>
        <label htmlFor='salary-type'>Salary Type: </label>
        <select id='salary-type'>
          <option value='hourly'>Hourly</option>
          <option value='annual'>Annual</option>
        </select>
      </div>
      
      <div className='form-group'>
        <label htmlFor='min-salary'>Minimum Job Salary</label>
        <div className='input-with-prefix'>
          <span className='input-prefix'>$</span>
          <input id='min-salary' type='number' placeholder='Enter minimum salary' />
        </div>
      </div>
      
      <div className='form-group'>
        <label htmlFor='max-salary'>Maximum Job Salary</label>
        <div className='input-with-prefix'>
          <span className='input-prefix'>$</span>
          <input id='max-salary' type='number' placeholder='Enter maximum salary' />
        </div>
      </div>

      <div className='form-group select'>
        <label htmlFor='loan-term'>Loan Term Length: </label>
        <select id='loan-term'>
          <option value='30'>30 years</option>
          <option value='25'>25 years</option>
          <option value='20'>20 years</option>
          <option value='15'>15 years</option>
          <option value='15'>10 years</option>
        </select>
      </div>
      
      <button type='submit' className='tool-submit'>Calculate</button>
    </form>
  );
}