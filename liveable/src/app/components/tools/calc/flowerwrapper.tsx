import Flower from './svg/flower';
import WiltingFlower from './svg/wiltingflower';
import { QuestionIcon } from '@phosphor-icons/react';
import { formResultsProps } from './graphwrapper';
import * as Tool from '@/lib/utils/tools';
import React from 'react';

const colorStops = [
  { pct: .15, color: 'rgba(26, 150, 65, 1)' },
  { pct: .25, color: 'rgba(141, 185, 90, 1)'},
  { pct: .28, color: 'rgba(173, 173, 131, 1)'},
  { pct: .33, color: 'rgba(218, 151, 84, 1)'},
  { pct: .50, color: 'rgba(215, 25, 28, 1)'}
]

/**
 * FlowerWrapper component visualizes the liveability of a given salary range by displaying
 * a flower graphic that scales and changes based on the percentage of income spent on housing costs.
 * It compares both minimum and maximum salary scenarios, showing a healthy or wilting flower
 * depending on whether the housing cost is within a "liveable" threshold.
 *
 * @param formResults - The input data containing salary information and calculation parameters.
 * @returns A ReactNode displaying two flower graphics (for min and max salary) and a tooltip
 *          explaining liveability categories.
 *
 *
 * The component uses color interpolation and scaling to visually represent the liveability status.
 */
export default function FlowerWrapper({ formResults }: formResultsProps): React.ReactNode {
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

  /**
   * Renders a flower visualization and status text based on the given income percentage.
   *
   * The flower's appearance and scale are determined by the `percentIncome` value,
   * indicating how "liveable" the user's financial situation is. The flower is healthy
   * if `percentIncome` is below 0.28, otherwise a wilting flower is shown. The status
   * text and its color are interpolated based on the percentage, using defined color stops.
   *
   * @param percentIncome - The percentage of income used, used to determine flower state, scale, and status.
   * @returns A JSX element containing the flower visualization and a status text.
   */
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

    function parseRgba(rgba: string) {
      // Example: "rgba(26, 150, 65, 1)"
      const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)/);
      if (!match) throw new Error('Invalid RGBA color: ' + rgba);
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
        a: match[4] !== undefined ? parseFloat(match[4]) : 1,
      };
    }

    const interpolateColor = (color1: string, color2: string, t: number) => {
      const c1 = parseRgba(color1);
      const c2 = parseRgba(color2);
      return `rgb(${
        Math.round(c1.r + (c2.r - c1.r) * t)
      }, ${
        Math.round(c1.g + (c2.g - c1.g) * t)
      }, ${
        Math.round(c1.b + (c2.b - c1.b) * t)
      }, ${
        (c1.a + (c2.a - c1.a) * t).toFixed(2)
      })`;
    };

    const getTextColor = (percent: number) => {
      const p = Math.max(.15, Math.min(.5, percent));
      for (let i = 1; i < colorStops.length; i++) {
        if (p <= colorStops[i].pct) {
          const lower = colorStops[i - 1];
          const upper = colorStops[i];
          const range = upper.pct - lower.pct;
          const t = (p - lower.pct) / range;
          return interpolateColor(lower.color, upper.color, t);
        }
      }
      return colorStops[colorStops.length - 1].color;
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