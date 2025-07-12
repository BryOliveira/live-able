import { Job } from '@/lib/prisma';

function formatSalary(salary: number | null, isHourly: boolean | undefined): string {
  if (!salary && salary !== 0) return 'Not Specified';

  let formatted = '';
  if (isHourly) {
    formatted = `$${salary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / hour`;
  } else {
    const annual = (salary * 1000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    formatted = `$${annual} annually`;
  }
  return formatted;
}

export default function JobCard({ job, onClick }: { job: Job, onClick?: () => void }): React.ReactNode {
  return (
    <div className='job-card' onClick={onClick}>
      <h2>{job?.job_title}</h2>
      <p className='grayed'>{job?.companies?.company_name}</p>
      <p><span className='greened'>{job?.loc_city}, {job?.loc_state}</span></p>
      <p>Average Salary: {formatSalary(job?.avg_salary, job?.is_hourly)}</p>
    </div>
  );
}