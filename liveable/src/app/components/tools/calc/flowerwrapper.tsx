import Flower from './svg/flower';
import WiltingFlower from './svg/wiltingflower';
import { formResultsProps } from './graphwrapper';
import * as Tool from '@/lib/utils/tools';

export default function FlowerWrapper({ formResults }: formResultsProps) {
  const minIncome = formResults.salaryType === 'hourly' ? Tool.hourlyToMonthly(formResults.minSalary) : Tool.annualToMonthly(formResults.minSalary);
  const maxIncome = formResults.salaryType === 'hourly' ? Tool.hourlyToMonthly(formResults.maxSalary) : Tool.annualToMonthly(formResults.maxSalary);
  const monthlyCost = Tool.calculateMortgage(formResults);

  const minPercent = monthlyCost / minIncome;
  const maxPercent = monthlyCost / maxIncome;


  const flowerText = (percentIncome: number) => {
    if (percentIncome < .25) {
      return <p>gutten</p>
    }
    else {
      return <p>baden</p>
    }
  };

  return (
    <div className='flower-wrapper'>
      <div id='min-flower'>
        <h3>Minimum Salary Liveability</h3>
        <WiltingFlower />
        {flowerText(minPercent)}
      </div>
      <div id='max-flower'>
        <h3>Maximum Salary Liveability</h3>
        <Flower />
        {flowerText(maxPercent)}
      </div>
    </div>
  );
}