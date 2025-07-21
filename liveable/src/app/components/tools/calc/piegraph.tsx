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

export default function PieGraph({ monthlySalary, monthlyCost, graphLabel }: graphProps): React.ReactNode {
  const data = {
    labels: ['AGI', 'Principal & Interest'],
    datasets: [{
      data: [monthlySalary - monthlyCost, monthlyCost],
      backgroundColor: ['#0A8754', '#5AA9E6']
    }]
  };

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