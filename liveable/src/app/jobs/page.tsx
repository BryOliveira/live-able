import Search from '../components/search';
import '@/styles/job-styles.css'

export default function Home() {
  return (
    <div>
      <div>
        <h1>Liveable</h1>
        <Search />
      </div>
      <div id="wrapper">
        <div id="listings">
          <div className='job-card'>
            <h2>YO JOB</h2>
            <p className='grayed'>FOR COMPnynay</p>
            <p>American football</p>
            <p>Never Meant</p>
          </div>
          <div className='job-card'>
            <h2>There were something</h2>
            <p className='grayed'>that were said</p>
            <p>that weren't meant</p>
            <p>Never Meant</p>
          </div>
        </div>
        <div className='job-view'>
        </div>
      </div>
    </div>
  );
}
