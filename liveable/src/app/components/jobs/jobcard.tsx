import { Job } from '@/lib/prisma';
import { formatSalary } from '@/lib/utils/format';

/**
 * Renders a card displaying job information.
 *
 * @param job - The job object containing details such as title, company, location, and salary.
 * @param onClick - Click handler for the card sending information to render the full job details.
 * @returns A ReactNode representing the job card.
 */
export default function JobCard({ job, onClick }: { job: Job, onClick?: () => void }): React.ReactNode {
  return (
    <div className='job-card' onClick={onClick}>
      <div id='text'>
        <h2>{job?.companies?.company_name}</h2>
        <p className='grayed'>{job?.job_title}</p>
        <p><span className='greened'>{job?.loc_city}, {job?.loc_state}</span></p>
        <p>Average Salary: {formatSalary(job?.avg_salary, job?.is_hourly)}</p>
      </div>
    </div>
  );
}