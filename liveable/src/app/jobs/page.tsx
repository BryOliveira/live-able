import type { Metadata } from 'next';
import SearchBar from '../components/global/search';
import Wrapper from '../components/jobs/wrapper';
import '@/styles/job-styles.css';

export const metadata: Metadata = { title: 'Jobs' };

export default function Home() {
  return (
    <div>
      <div id='bar-wrapper'>
        <SearchBar />
      </div>
      <Wrapper />
    </div>
  );
}