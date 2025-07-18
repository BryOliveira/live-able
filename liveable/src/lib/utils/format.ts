import { Job } from '@/lib/prisma';

export function formatCurrency(value: number | null): string {
  if (value === null || value === undefined) return '';
  return `${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatSalary(salary: number | null, isHourly: boolean | undefined): string {
  if (!salary && salary !== 0) return 'Not Specified';

  let formatted = '';
  if (isHourly) {
    formatted = `$${formatCurrency(salary)} / hour`;
  } else {
    const annual = formatCurrency(salary * 1000);
    formatted = `$${annual} annually`;
  }
  return formatted;
}

export function formatSalaryRange(job: Job): string {
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

export function serializeJob(job: Job): Job {
  return {
    ...job,
    min_salary: job.min_salary ?? null,
    max_salary: job.max_salary ?? null,
    avg_salary: job.avg_salary ?? null,
    home_prices: job.home_prices,
    companies: job.companies,
  };
}