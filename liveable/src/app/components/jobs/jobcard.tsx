function formatSalary(salary: any, isHourly: boolean | undefined): string {
  if (!salary && salary !== 0) return 'Not Specified';

  let value = 0;
  if (typeof salary === 'number') {
    value = salary;
  } else if (salary?.toNumber) {
    value = salary.toNumber();
  }

  let formatted = '';
  if (isHourly) {
    formatted = `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / hour`;
  } else {
    const annual = (value * 1000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    formatted = `$${annual} annually`;
  }
  return formatted;
}

export default function JobCard({ job, onClick }: { job: any, onClick?: () => void }) {
  return (
    <div className='job-card' onClick={onClick}>
      <h2>{job?.job_title}</h2>
      <p className='grayed'>{job?.companies?.company_name}</p>
      <p><span className='greened'>{job?.loc_city}, {job?.loc_state}</span></p>
      <p>Average Salary: {formatSalary(job?.avg_salary, job?.is_hourly)}</p>
    </div>
  );
}