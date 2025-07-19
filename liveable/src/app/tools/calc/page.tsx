// Adjust the import path and extension if needed
import CalcClient from '@/app/components/tools/calc/client/calcclient';

export default function CalcPage() {
  return (
    <div className='calc-wrapper'>
      <h1>Liveability Mortgage Calculator</h1>
      <CalcClient />
    </div>
  );
}