import JobCard from './jobcard';
import { Job } from '@/lib/prisma';

export default function Listings({ jobs, onSelectJob }: { jobs: Job[], onSelectJob: (job: Job) => void }): React.ReactNode {
  return (
    <div id='listings'>
      {jobs.map(job => (
        <JobCard 
        key={job.id} 
        job={job} 
        onClick={() => {
          onSelectJob(job);
          const jobViewElement = document.getElementById('job-view');
          if (jobViewElement) {
            jobViewElement.scrollTop = 0;
          }
        }}
        />
      ))}
    </div>
  );
}