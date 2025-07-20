import React from 'react';
import { Chart as ChartJS, ArcElement, Title, Legend, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatCurrency } from '@/lib/utils/format';

interface graphProps {
  monthlySalary: number, 
  monthlyCost: number, 
  graphLabel: string,
}

ChartJS.register(ArcElement, Title, Legend );

export default function PieGraph({monthlySalary, monthlyCost, graphLabel}: graphProps): React.ReactNode {
  const data = {
    labels: ['Net Income', 'Principal & Interest'],
    datasets: [
      {
        label: '$',
        data: [monthlySalary - monthlyCost, monthlyCost],
        backgroundColor: [
          '#0A8754',
          '#5AA9E6'
        ]
      }
    ]
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      title: {
        font: {
          family: 'Afacad Flux',
          size: 24
        },
        display: true,
        text: graphLabel
      },
      legend: {
        display: false
      }
    },
    cutout: '80%'
  };

  return (
    <div className='captioned-graph'>
      <div className='graph'>
        <Doughnut data={data} options={options}/>
      </div>
      <p>${formatCurrency(monthlySalary - monthlyCost)}</p>
    </div>
  );
}
/*
const DATA_COUNT = 5;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

const data = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: Object.values(Utils.CHART_COLORS),
    }
  ]
};
 */