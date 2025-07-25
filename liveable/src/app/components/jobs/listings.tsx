import JobCard from './jobcard';
import { Job } from '@/lib/prisma';


/**
 * Renders a list of job listings or a "No results found" message if the list is empty.
 *
 * @param jobs - An array of `Job` objects to display.
 * @param onSelectJob - Callback function invoked when a job is selected.
 * @returns A React node containing the job listings or a message if no jobs are available.
 */
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