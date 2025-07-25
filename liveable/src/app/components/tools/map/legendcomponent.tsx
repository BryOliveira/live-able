import React from "react";

/**
 * Renders a legend for liveability categories based on the percentage of income spent.
 *
 * @returns The legend component for liveability categories as a ReactElement.
 */
export default function LegendComponent(): React.ReactElement {
  return (
    <span className='legend'>
      <p><strong>Liveability Categories:</strong></p>
      <p><strong id='vl'>Very Liveable:</strong> &lt;15% of income</p>
      <p><strong id='l'>Liveable:</strong> 15-25% of income</p>
      <p><strong id='m'>Manageable:</strong> 25-28% of income</p>
      <p><strong id='t'>Tight:</strong> 28-35% of income</p>
      <p><strong id='c'>Challenging:</strong> &gt;35% of income</p>
    </span>
  );
}