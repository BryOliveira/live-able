'use client';
import { HomeSale, Suitcase } from 'iconoir-react';
import { ChartBarIcon } from '@phosphor-icons/react';

export default function Banner(): React.ReactElement {
  return (
    <div id='banner'>
      <div>
        <Suitcase className='banner-prop'/>
        <h3>Salary Insights</h3>
        <p>See what specific roles or sectors pay across regions.</p>
      </div>
      <div>
        <HomeSale className='banner-prop'/>
        <h3>Home Affordability</h3>
        <p>Compare housing and mortgage costs by state.</p>
      </div>
      <div>
        <ChartBarIcon className='banner-prop'/>
        <h3>Cost of Housing</h3>
        <p>Compare potential pay with renting vs. owning expenses.</p>
      </div>
    </div>
  );
}