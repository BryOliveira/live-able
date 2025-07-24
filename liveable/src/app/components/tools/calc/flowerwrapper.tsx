import Flower from './svg/flower';
import WiltingFlower from './svg/wiltingflower';
import { QuestionIcon } from '@phosphor-icons/react';
import { formResultsProps } from './graphwrapper';
import * as Tool from '@/lib/utils/tools';

export default function FlowerWrapper({ formResults }: formResultsProps) {
  const minIncome = formResults.salaryType === 'hourly' ? Tool.hourlyToMonthly(formResults.minSalary) : Tool.annualToMonthly(formResults.minSalary);
  const maxIncome = formResults.salaryType === 'hourly' ? Tool.hourlyToMonthly(formResults.maxSalary) : Tool.annualToMonthly(formResults.maxSalary);
  const monthlyCost = Tool.calculateMortgage(formResults);

  const minPercent = monthlyCost / minIncome;
  const maxPercent = monthlyCost / maxIncome;


  const getFlowerScale = (percentIncome: number, isHealthy: boolean) => {
    if (isHealthy) {
      return Math.min(1.2, Math.max(0.8, 1.2 - (percentIncome)));
    } else {
      const baseScale = 1;
      const shrinkRate = Math.max(0, (percentIncome - 0.28) * 0.6); 
      return Math.max(0.1, baseScale - shrinkRate);
    }
  };

  const flowerDiv = (percentIncome: number) => {
    const isHealthy = percentIncome < 0.28;
    const scale = getFlowerScale(percentIncome, isHealthy);

    const getStatusText = (percent: number) => {
      return percent < .15 ? 'Very Liveable' :
             percent < .25 ? 'Liveable'      :
             percent < .28 ? 'Manageable'    :
             percent < .35 ? 'Tight'         :
                             'Challenging';
    };

    const getTextColor = (percent: number) => {
      if (percent < 0.15) {
        return '#086942';
      }
      const clampedPercent = Math.min(0.5, Math.max(0.15, percent));
      const greenColor = { r: 8, g: 105, b: 66 };
      const redColor = { r: 255, g: 0, b: 0 };
      const ratio = (clampedPercent - 0.15) / (0.5 - 0.15);
      const r = Math.round(greenColor.r + (redColor.r - greenColor.r) * ratio);
      const g = Math.round(greenColor.g + (redColor.g - greenColor.g) * ratio);
      const b = Math.round(greenColor.b + (redColor.b - greenColor.b) * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    };

    return (
      <div className="flower-container">
        <div 
          className="flower-svg"
          style={{ 
            transform: `scale(${scale})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto'
          }}
        >
          {isHealthy ? <Flower /> : <WiltingFlower />}
        </div>
        <p 
          className="flower-status"
          style={{ color: getTextColor(percentIncome) }}
        >
          {getStatusText(percentIncome)}
        </p>
      </div>
    );
  };

  return (
    <div className='flower-wrapper'>
      <div id='min-flower' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h3>Minimum Salary Liveability</h3>
        {flowerDiv(minPercent)}
      </div>
      <div id='max-flower' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h3>Maximum Salary Liveability</h3>
        {flowerDiv(maxPercent)}
      </div>
      <div className='flower-tip-container'>
        <QuestionIcon size={24} id='question' />
        <span className='tooltip'>
          <p><strong>Liveability Categories:</strong></p>
          <p><strong id='vl'>Very Liveable:</strong> &lt;15% of income</p>
          <p><strong id='l'>Liveable:</strong> 15-25% of income</p>
          <p><strong id='m'>Manageable:</strong> 25-28% of income</p>
          <p><strong id='t'>Tight:</strong> 28-35% of income</p>
          <p><strong id='c'>Challenging:</strong> &gt;35% of income</p>
        </span>
      </div>
    </div>
  );
}