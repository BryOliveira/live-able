'use client';
import React, { useState } from 'react';
import Listings from '../listings';
import JobView from '../jobview';
import { Job } from '@/lib/prisma';

/**
 * WrapperClient is a client-side React component that manages the state of the currently selected job
 * from a list of jobs and renders both the job listings and the details of the selected job.
 *
 * @param jobs - An array of Job objects to be displayed and selected from.
 * @returns The rendered component containing the job listings and the selected job view as a ReactNode.
 */
export default function WrapperClient({ jobs }: { jobs: Job[] }): React.ReactNode {
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] ?? null);

  return (
    <div id='wrapper'>
      <Listings jobs={jobs} onSelectJob={setSelectedJob} />
      <JobView job={selectedJob} />
    </div>
  );
}