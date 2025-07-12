'use client';
import React, { useState } from 'react';
import Listings from '../listings';
import JobView from '../jobview';
import { Job } from '@/lib/prisma';

export default function WrapperClient({ jobs }: { jobs: Job[] }): React.ReactNode {
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] ?? null);

  return (
    <div id='wrapper'>
      <Listings jobs={jobs} onSelectJob={setSelectedJob} />
      <JobView job={selectedJob} />
    </div>
  );
}