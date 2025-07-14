import CalcClient from '@/app/components/tools/client/calcclient';
import CalcGraph from '@/app/components/tools/client/calcgraph';

export default function CalcPage() {
  return (
    <main className='tool-content'>
      <h1>Liveability Calculator</h1>
      <div className='tool-wrapper'>
        <CalcClient />
        <div className='calc-graph-wrapper'>
          <CalcGraph />
          <CalcGraph />
        </div>
      </div>
    </main>
  );
}