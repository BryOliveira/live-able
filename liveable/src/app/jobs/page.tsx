import type { Metadata } from 'next';
import SearchBar from '../components/global/search';
import Wrapper from '../components/jobs/wrapper';
import '@/styles/job-styles.css';
import { SearchParams } from '@/lib/utils/forms';
import React from 'react';

export const metadata: Metadata = { title: 'Jobs' };

/**
 * Renders the Jobs page asynchronously, including a search bar and a wrapper component for job listings.
 * Renders asynchronously to retrieve ALL job data to make the on-page experience quick and responsive.
 *
 * @param searchParams - A promise that resolves to the search parameters used for filtering jobs.
 * @returns A ReactNode containing the search bar and the job listings wrapper.
 */
export default async function JobsPage({ 
  searchParams 
}: { 
  searchParams: Promise<SearchParams> 
}): Promise<React.ReactNode> {
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