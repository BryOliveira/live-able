import { Job } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils/format';

function formatSalaryRange(job: Job): string {
  const { min_salary, max_salary, is_hourly } = job;

  if ((min_salary === undefined || min_salary === null) && (max_salary === undefined || max_salary === null)) {
    return 'Not Specified';
  }

  const min = min_salary ?? 0;
  const max = max_salary ?? 0;

  if (is_hourly) {
    return `$${formatCurrency(min)} - $${formatCurrency(max)})} / hour`;
  } else {
    const minAnnual = formatCurrency(min * 1000);
    const maxAnnual = formatCurrency(max * 1000);
    return `$${minAnnual} - $${maxAnnual} annually`;
  }
}

export default function JobView({ job }: { job: Job | null }): React.ReactNode {
  if (!job) {
    return (
      <div id='no-job'>
        <h2>No job selected.</h2>
      </div>
    );
  }
  return (
    <div id='job-view'>
      <div className='job-header'>
        <h1>{job.job_title}</h1>
         <p className='mobile'>{formatSalaryRange(job)}</p>
      </div>
      <div className='job-subheader'>
        <p><span className='greened'>Company:</span> {job.companies.company_name}</p>
        <p className='mobile'><span className='greened'>Sector:</span> {job.companies.sector}</p>
      </div>
      <div className='job-subheader'>
        <p><span className='greened'>Location:</span> {job.loc_city}, {job.loc_state}</p>
        <p className='mobile'><span className='greened'>State&apos;s Median House Price:</span> ${job.home_prices ? formatCurrency(job.home_prices.median_house_price) : 'N/A'}</p>
      </div>
      <div className='desc'>
        <h2>Job Description:</h2>
        <p>{job.job_description}</p>
      </div>
    </div>
  );
}