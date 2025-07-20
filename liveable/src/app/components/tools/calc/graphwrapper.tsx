import React from 'react';
import PieGraph from './piegraph';
import { CalcForm } from '@/lib/utils/forms';
import * as Tool from '@/lib/utils/tools';
import { formatCurrency } from '@/lib/utils/format';
import { CircleIcon } from '@phosphor-icons/react';

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
        <div id='graph-container'>
          <div>
            <PieGraph monthlySalary={minIncome} monthlyCost={monthlyCost} graphLabel={'Minimum Monthly Income'} />
            <PieGraph monthlySalary={maxIncome} monthlyCost={monthlyCost} graphLabel={'Maximum Monthly Income'} />
          </div>
        </div>
        <div id='info'>
          <div>
            <h3>Principal & Interest </h3>
            <p>${formatCurrency(monthlyCost)} / mo</p>
          </div>
          <div id='legend'>
            <h3>Legend</h3>
            <p><CircleIcon id='cost-color' weight='fill' size={32} /> Monthly Cost</p>
            <p><CircleIcon id='income-color' weight='fill' size={32} /> Monthly Adjusted Income</p>
          </div>
        </div>
      </div>
    </div>
  );
}
