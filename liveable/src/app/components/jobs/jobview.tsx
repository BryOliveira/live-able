import { Job } from '@/lib/prisma';
import { formatCurrency, formatSalaryRange } from '@/lib/utils/format';
import { useRouter } from 'next/navigation';

/**
 * Displays detailed information about a selected job, including title, company, sector, location,
 * salary range, and job description. Provides a button to export job data to the liveability calculator tool.
 *
 * @param job - The job object to display, or `null` if no job is selected.
 * @returns A ReactNode containing the job details view, or a message if no job is selected.
 */
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
      </div>
      <div className='job-subheader'>
        <p><span className='greened'>Company:</span> {job.companies.company_name}</p>
        <p className='mobile'><span className='greened'>Sector:</span> {job.companies.sector}</p>
        <p><span className='greened'>Location:</span> {job.loc_city}, {job.loc_state}</p>
        <p className='mobile'><span className='greened'>State&apos;s Median House Price:</span> ${job.home_prices ? formatCurrency(job.home_prices.median_house_price) : 'N/A'}</p>
        <p className='mobile'><span className='greened'>Salary Range:</span> {formatSalaryRange(job)}</p>
        <button id='export' onClick={handleExport}>Calculate Liveability</button>
        </div>
      <div className='desc'>
        <h2>Job Description:</h2>
        <p>{job.job_description}</p>
      </div>
    </div>
  );
}