import React from 'react';
import { Chart as ChartJS, ArcElement, Title, Legend, ChartOptions, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatCurrency } from '@/lib/utils/format';

interface graphProps {
  monthlySalary: number, 
  monthlyCost: number, 
  graphLabel: string
}

ChartJS.register(ArcElement, Title, Legend, Tooltip);

/**
 * Renders a doughnut pie graph representing the breakdown of monthly salary and monthly cost.
 *
 * @param {graphProps} props - The properties for the PieGraph component.
 * @param {number} props.monthlySalary - The user's total monthly salary.
 * @param {number} props.monthlyCost - The user's total monthly cost (e.g., principal & interest).
 * @param {string} props.graphLabel - The label to display as the graph's title.
 * @returns {React.ReactNode} The rendered PieGraph component.
 *
 * @remarks
 * - Uses Chart.js Doughnut chart to visualize the data.
 * - Displays the Adjusted Gross Income (AGI) in the center of the chart using a custom plugin.
 * - Customizes tooltip and legend appearance for better UX.
 */
export default function PieGraph({ monthlySalary, monthlyCost, graphLabel }: graphProps): React.ReactNode {
  const data = {
    labels: ['AGI', 'Principal & Interest'],
    datasets: [{
      data: [monthlySalary - monthlyCost, monthlyCost],
      backgroundColor: ['#0A8754', '#5AA9E6']
    }]
  };

  /**
   * Chart.js plugin to render custom center text on a pie or doughnut chart.
   *
   * This plugin draws two lines of text at the center of the chart:
   * - The label "Adjusted Gross Income:"
   * - The calculated adjusted gross income per month, formatted as currency.
   *
   * @remarks
   * The plugin uses the chart's first dataset to determine the center coordinates.
   * It customizes the font, color, and alignment for the center text.
   *
   * @property {string} id - The unique identifier for the plugin.
   * @method afterDatasetsDraw - Chart.js lifecycle hook that draws the center text after datasets are rendered.
   * @param chart - The Chart.js instance, used to access context and dataset metadata.
   */
  const centerTextPlugin = {
    id: 'centerText',
    afterDatasetsDraw(chart: ChartJS) {
      const { ctx } = chart;

      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.font = '700 24px Afacad Flux, Arial, sans-serif';
      ctx.fillStyle = '#0A8754';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerText = `$${formatCurrency(monthlySalary - monthlyCost)} / mo`;
      ctx.fillText('Adjusted Gross Income:', centerX, centerY - 12);
      ctx.fillText(centerText, centerX, centerY + 12);
      ctx.restore();
    }
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      title: {
        font: {
          family: 'Afacad Flux, Arial, sans-serif',
          size: 24
        },
        display: true,
        text: graphLabel
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#f5fafa',
        displayColors: false,
        titleColor: 'black',
        bodyColor: 'black',
        borderWidth: 1,
        borderColor: (context) => {
          const dataIndex = context.tooltip.dataPoints[0].dataIndex;
          const colors = context.tooltip.dataPoints[0].dataset.backgroundColor as string[];
          return colors[dataIndex];
        },
        callbacks: {
          label: (context) => {
            return `$${formatCurrency(context.parsed)}`;
          }
        },
        titleFont: {
          family: 'Afacad Flux, Arial, sans-serif',
          size: 20
        },
        bodyFont: {
          family: 'Afacad Flux, Arial, sans-serif',
          size: 16
        },
      }
    },
    cutout: '80%'
  };
  
  return (
    <div className='graph'>
      <Doughnut 
        data={data} 
        options={options} 
        plugins={[centerTextPlugin]}
        key={`${monthlySalary}-${monthlyCost}`}
      />
    </div>
  );
}