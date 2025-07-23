import { Job } from '@/lib/prisma';
import { formatCurrency, formatSalaryRange } from '@/lib/utils/format';
import { useRouter } from 'next/navigation';

export default function JobView({ job }: { job: Job | null }): React.ReactNode {
  const router = useRouter();
  const handleExport = () => {
    const params = new URLSearchParams({
      minSalary: (job?.min_salary ? (job.min_salary * 1000).toString() : ''),
      maxSalary: (job?.max_salary ? (job.max_salary * 1000).toString() : ''),
      salaryType: job?.is_hourly ? 'hourly' : 'annual',
      homePrice: job?.home_prices?.median_house_price?.toString() ?? ''
    });
    router.push(`/tools/calc?${params.toString()}`);
  };

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
        <div id='tright'>
          <button id='export' onClick={handleExport}>Calculate Liveability</button>
          <p className='mobile'>{formatSalaryRange(job)}</p>
        </div>
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