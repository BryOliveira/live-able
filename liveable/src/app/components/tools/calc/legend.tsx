import React from 'react';
import { formatCurrency } from '@/lib/utils/format';

interface LegendProps {
  minSalary: number,
  maxSalary: number,
  monthlyCost: number
}

export default function CustomLegend({ minSalary, maxSalary, monthlyCost }: LegendProps): React.ReactNode {
  return (
    <div className='legend'>
      
    </div>
  );
}