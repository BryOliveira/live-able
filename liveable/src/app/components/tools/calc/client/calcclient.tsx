'use client';

export default function CalcClient(): React.ReactNode {
  return (
    <div className='calc-client-wrapper'>
      <CalcFormWrapper />
      <GraphWrapper />
    </div>
  );
}

  // useEffect(() => {
  //   const wheelHandler = (event: WheelEvent) => {
  //     if (event.target instanceof HTMLInputElement && event.target.type === 'number') {
  //       event.preventDefault();
  //     }
  //   };
  //   window.addEventListener('wheel', wheelHandler, { passive: false });
  //   return () => {
  //     window.removeEventListener('wheel', wheelHandler);
  //   };
  // }, []);

  // const submitHandler = (formData: CalcForm) => {
  //   setCalcValues(formData);
  // } 
  
  // return (
  //   <form className='tool-form'>
  //     <div className='form-group'>
  //       <label htmlFor='home-price'>Home Price</label>
  //       <div className='input-with-symbol'>
  //         <span className='input-symbol'>$</span>
  //         <input required id='home-price' type='number' min='0' placeholder='Enter home price' />
  //       </div>
  //     </div>

  //     <div className='form-group'>
  //       <label htmlFor='down-payment'>Down Payment</label>
  //       <div className='input-with-symbol'>
  //         <span className='input-symbol'>$</span>
  //         <input required id='down-payment' type='number' min='0' max={calcValues.homePrice} placeholder='Enter down payment' />
  //       </div>
  //     </div>
      
  //     <div className='form-group select'>
  //       <label htmlFor='salary-type'>Salary Type: </label>
  //       <select id='salary-type'>
  //         <option value='annual'>Annual</option>
  //         <option value='hourly'>Hourly</option>
  //       </select>
  //     </div>
      
  //     <div className='form-group'>
  //       <label htmlFor='min-salary'>Minimum Job Salary</label>
  //       <div className='input-with-symbol'>
  //         <span className='input-symbol'>$</span>
  //         <input required id='min-salary' type='number' min='0' placeholder='Enter minimum salary' />
  //       </div>
  //     </div>
      
  //     <div className='form-group'>
  //       <label htmlFor='max-salary'>Maximum Job Salary</label>
  //       <div className='input-with-symbol'>
  //         <span className='input-symbol'>$</span>
  //         <input required id='max-salary' type='number' min='0' placeholder='Enter maximum salary' />
  //       </div>
  //     </div>

  //     <div className='form-group select'>
  //       <label htmlFor='loan-term'>Loan Term Length: </label>
  //       <select id='loan-term'>
  //         <option value='30'>30 years</option>
  //         <option value='25'>25 years</option>
  //         <option value='20'>20 years</option>
  //         <option value='15'>15 years</option>
  //         <option value='15'>10 years</option>
  //       </select>
  //     </div>

  //     <div className='form-group'>
  //       <label htmlFor='interest-rate'>Interest Rate: </label>
  //       <div className='input-with-symbol'>
  //         <input required id='interest-rate' type='number' min='0' placeholder='Enter interest rate' />
  //         <span className='input-symbol'>%</span>
  //       </div>
  //     </div>
      
  //     <button type='submit' className='tool-submit'>Calculate</button>
  //   </form>