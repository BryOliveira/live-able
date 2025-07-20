import React from 'react';
import PieGraph from './piegraph';
import { CalcForm } from '@/lib/utils/forms';
import * as Tool from '@/lib/utils/tools';
import { formatCurrency } from '@/lib/utils/format';
import { CircleIcon, QuestionIcon } from '@phosphor-icons/react';

export interface formResultsProps {
  formResults: CalcForm;
}
 
export default function GraphWrapper({ formResults }: formResultsProps): React.ReactNode {
  const monthlyCost = Tool.calculateMortgage(formResults);
  const minIncome = formResults.salaryType === 'hourly' ? Tool.hourlyToMonthly(formResults.minSalary) : Tool.annualToMonthly(formResults.minSalary);
  const maxIncome = formResults.salaryType === 'hourly' ? Tool.hourlyToMonthly(formResults.maxSalary) : Tool.annualToMonthly(formResults.maxSalary);
  
  return (
    <div className='graph-wrapper'>
      <h2>Monthly Breakdown</h2>
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
            <p><CircleIcon id='cost-color' weight='fill' size={32} /> Monthly Mortgage Cost</p>
            <p><CircleIcon id='income-color' weight='fill' size={32} /> Monthly Adjusted Income</p>
          </div>
          <div className='tip-container'>
            <QuestionIcon size={24} id='question' />
            <span className='tooltip'>
              <p>Adjusted Gross Income (AGI) = <br /> 
                (Monthly Gross Income - Monthly Mortgage Cost)
              </p>
              <p>
                Note: Calculator only takes into account mortgage cost, does not include income tax,
                property tax, mortgage insurance, homeowner&apos;s insurance, etc.
              </p>
              <p>
                Hourly Salary assumes 40 workhours per week, 4 workweeks per month.
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
