import React from "react";

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