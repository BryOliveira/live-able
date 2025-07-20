import React from 'react';
import PieGraph from './piegraph';
import CalcInfo from './calcinfo';
import { CalcForm } from '@/lib/utils/forms';
import CustomLegend from './legend';
import * as Tool from '@/lib/utils/tools';

export interface formResultsProps {
  formResults: CalcForm;
}
 
export default function GraphWrapper({ formResults }: formResultsProps): React.ReactNode {
  const monthlyCost = Tool.calculateMortgage(formResults);
  const maxIncome = Tool.annualToMonthly(formResults.maxSalary);
  const minIncome = Tool.annualToMonthly(formResults.minSalary);
  
  return (
    <div className='graph-wrapper'>
      <h2>AYO CHILLL</h2>
      <div>
        <PieGraph monthlySalary={minIncome} monthlyCost={monthlyCost} graphLabel={'Minimum Salary'} />
        <PieGraph monthlySalary={maxIncome} monthlyCost={monthlyCost} graphLabel={'Maximum Salary'} />
        <CustomLegend minSalary={minIncome} maxSalary={maxIncome} monthlyCost={monthlyCost} />
      </div>
      {/* <CalcInfo formResults={formResults}/> */}
    </div>
  );
}
