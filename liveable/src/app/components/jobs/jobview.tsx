import { Job } from '@/lib/prisma';

function formatSalaryRange(job: Job): string {
  const { min_salary, max_salary, is_hourly } = job;

  if ((min_salary === undefined || min_salary === null) && (max_salary === undefined || max_salary === null)) {
    return 'Not Specified';
  }

  const min = min_salary ?? 0;
  const max = max_salary ?? 0;

  if (is_hourly) {
    return `$${min.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - $${max.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / hour`;
  } else {
    const minAnnual = (min * 1000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const maxAnnual = (max * 1000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `$${minAnnual} - $${maxAnnual} annually`;
  }
}

function formatPrice(price: number): string {
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function JobView({ job }: { job: Job | null }): React.ReactNode {
  if (!job) {
    return (
      <div id='job-view'>
        <p>Select a job to see details.</p>
      </div>
    );
  }
  return (
    <div id='job-view'>
      <div className='job-header'><h1>{job.job_title}</h1> <p>{formatSalaryRange(job)}</p></div>
      <div className='job-subheader'><p><span className='greened'>Company:</span> {job.companies.company_name}</p><p><span className='greened'>Sector:</span> {job.companies.sector}</p></div>
      <div className='job-subheader'><p><span className='greened'>Location:</span> {job.loc_city}, {job.loc_state}</p><p><span className='greened'>State&apos;s Median House Price:</span> ${job.home_prices ? formatPrice(job.home_prices.median_house_price) : 'N/A'}</p></div>
      <div className='desc'>
        <h2>Job Description:</h2>
        <p>{job.job_description}</p>
      </div>
    </div>
  );
}