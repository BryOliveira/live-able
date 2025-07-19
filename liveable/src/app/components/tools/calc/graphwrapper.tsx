import React from 'react';
import PieGraph from './piegraph';
import CalcInfo from './calcinfo';
import { CalcForm } from '@/lib/utils/forms';

export interface formResultsProps {
  formResults: CalcForm;
}
 
export default function GraphWrapper({ formResults }: formResultsProps): React.ReactNode {

  
  return (
    <div>
      <h2>AYO CHILLL</h2>
      <PieGraph monthlySalary={4} monthlyCost={1} graphLabel={'Example1'}/>
      <PieGraph monthlySalary={5} monthlyCost={1} graphLabel={'Example2'}/>
      <CalcInfo formResults={formResults}/>
    </div>
  );
}
