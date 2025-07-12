'use client';
import { useState } from 'react';
import Listings from '../listings';
import JobView from '../jobview';

export default function WrapperClient({ jobs }: { jobs: any[] }) {
  const [selectedJob, setSelectedJob] = useState(jobs[0] ?? null);

  return (
    <div id='wrapper'>
      <Listings jobs={jobs} onSelectJob={setSelectedJob} />
      <JobView job={selectedJob} />
    </div>
  );
}