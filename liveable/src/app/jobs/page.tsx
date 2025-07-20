import type { Metadata } from 'next';
import SearchBar from '../components/global/search';
import Wrapper from '../components/jobs/wrapper';
import '@/styles/job-styles.css';
import { SearchParams } from '@/lib/utils/forms';

export const metadata: Metadata = { title: 'Jobs' };

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