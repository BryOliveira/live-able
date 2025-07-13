import JobCard from './jobcard';
import { Job } from '@/lib/prisma';

export default function Listings({ jobs, onSelectJob }: { jobs: Job[], onSelectJob: (job: Job) => void }): React.ReactNode {
  if (jobs.length === 0) {
    return (
      <div id='listings'>
        <div className='no-results'>
          <h2>No results found.</h2>
        </div>
      </div>
    );
  }
  
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