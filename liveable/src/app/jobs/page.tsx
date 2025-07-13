import type { Metadata } from 'next';
import SearchBar from '../components/global/search';
import Wrapper from '../components/jobs/wrapper';
import '@/styles/job-styles.css';

export const metadata: Metadata = { title: 'Jobs' };

interface SearchParams {
  career?: string;
  location?: string;
}

export default async function JobsPage({ 
  searchParams 
}: { 
  searchParams: Promise<SearchParams> 
}) {
  const resolvedSearchParams = await searchParams;
  
  return (
    <div>
      <div id='bar-wrapper'>
        <SearchBar />
      </div>
      <Wrapper searchParams={resolvedSearchParams} />
    </div>
  );
}