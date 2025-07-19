import React from 'react';
import { formResultsProps } from './graphwrapper'; 
import { CalcForm } from '@/lib/utils/forms';
import * as Tool from '@/lib/utils/tools';

export default function CalcInfo({ formResults }: formResultsProps): React.ReactNode {
  // const monthlyCost = Tool.calculateMortgage(formResults);
  return (
    <div>
      {/* {monthlyCost.toLocaleString('en-US')} */}
      <p>Some here</p>
      <p>and here</p>
      <p>and lowkey here too</p>
    </div>
  );
}

// {
//   (Object.keys(formResults) as Array<keyof CalcForm>).map(key => (
//     <p>{key}: {formResults[key]}</p>
//   ))
// }