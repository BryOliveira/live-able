/**
 * State lifting:
 * Create a parent
 * accept props in client
 * accept data in graphs
 */

// const dummyValues = {
//     homePrice: 427000, // median us house cost
//     downPayment: 75000, // 18% of homePrice, median down payment in the US
//     salaryType: 'Annual',
//     minSalary: 36500, // 25th percentile of us income 
//     maxSalary: 208000, // 75th percent of us income
//     loanTerm: 30, // most common mortgage length
//     interestRate: 6.8 // median us interest rate
//   };

export default function CalcFormWrapper() {
  return ();
}
// const [calcData, setCalcData] = useState<CalcForm>(dummyValues);

// const submitHandler = (formData: CalcForm) => {
//   setCalcData(formData);
// };

// return (
//   <div className='tool-wrapper'>
//     <CalcClient 
//       initialValues={calcData}
//       onSubmit={submitHandler}  
//     />
//     <div className='calc-graph-wrapper'>
//       <div className='calc-graph'>
//         <CalcGraph id='min' calcData={calcData}/>
//       </div>
//       <div className='calc-graph'>
//         <CalcGraph id='max' calcData={calcData}/>
//       </div>
//     </div>
//   </div>
// );