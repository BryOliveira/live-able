'use client';
import React from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const chartData = {
  datasets: [{
    data: [10, 20, 30],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  }],
  labels: ['Red', 'Blue', 'Yellow'],
};

const options = {
  responsive: true
}

export default function CalcGraph(): React.ReactElement {
  return (
    <div className='calc-graph'>
      <Doughnut data={chartData} options={options}/>
    </div>
  );
}