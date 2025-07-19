// import React from 'react';
// import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
// import { CalcForm } from '@/lib/utils/forms';

// interface CalcGraphProps {
//   id: string;
//   calcData: CalcForm;
// }

import CalcGraph from '../piegraph';
import CalcInfo from '../calcinfo';

export default function GraphWrapper() {
  return (
    <div>
      <h2>AYO CHILLL</h2>
      <CalcGraph />
      <CalcInfo />
    </div>
  );
}

// const chartData = {
//   labels: [
//     'Remaining Gross Income',
//     'Mortgage'
//   ],
//   datasets: [{
//     data: []
//   }]
// };
// if (id === 'min') {

// }
// if (id === 'max') {

// }