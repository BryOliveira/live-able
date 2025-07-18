import { Job } from '@/lib/prisma';
import { formatSalary } from '@/lib/utils/format';

export default function JobCard({ job, onClick }: { job: Job, onClick?: () => void }): React.ReactNode {
  return (
    <div className='job-card' onClick={onClick}>
      <div id='text'>
        <h2>{job?.job_title}</h2>
        <p className='grayed'>{job?.companies?.company_name}</p>
        <p><span className='greened'>{job?.loc_city}, {job?.loc_state}</span></p>
        <p>Average Salary: {formatSalary(job?.avg_salary, job?.is_hourly)}</p>
      </div>
      {/* <div>
        <button className=''>Calculate Liveability</button>
      </div> */}
    </div>
  );
}