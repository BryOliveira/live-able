import { Job } from '@/lib/prisma';

/**
 * Helper function that formats a numeric value as a currency string with two decimal places.
 *
 * @param value - The numeric value to format. If `null` or `undefined`, returns an empty string.
 * @returns The formatted currency string, or an empty string if the input is `null` or `undefined`.
 */
export function formatCurrency(value: number | null): string {
  if (value === null || value === undefined) return '';
  return `${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Formats a salary value as a string, displaying either an hourly or annual amount.
 *
 * @param salary - The salary amount to format. Can be `null` to indicate an unspecified salary.
 * @param isHourly - If `true`, formats the salary as an hourly rate; if `false` or `undefined`, formats as an annual salary.
 * @returns A formatted salary string (e.g., "$50,000 annually", "$25 / hour", or "Not Specified" if salary is `null` or `undefined`).
 */
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

/**
 * Formats the salary range for a given job as a human-readable string.
 *
 * - If both `min_salary` and `max_salary` are undefined or null, returns 'Not Specified'.
 * - If `is_hourly` is true, formats the range as hourly wages (e.g., "$15 - $20 / hour").
 * - Otherwise, formats the range as annual salaries in thousands (e.g., "$30,000 - $50,000 annually").
 *
 * @param job - The job object containing salary information.
 * @returns The formatted salary range string.
 */
export function formatSalaryRange(job: Job): string {
  const { min_salary, max_salary, is_hourly } = job;

  if ((min_salary === undefined || min_salary === null) && (max_salary === undefined || max_salary === null)) {
    return 'Not Specified';
  }

  const min = min_salary ?? 0;
  const max = max_salary ?? 0;

  if (is_hourly) {
    return `$${formatCurrency(min)} - $${formatCurrency(max)} / hour`;
  } else {
    const minAnnual = formatCurrency(min * 1000);
    const maxAnnual = formatCurrency(max * 1000);
    return `$${minAnnual} - $${maxAnnual} annually`;
  }
}

/**
 * Serializes a Job object by ensuring that salary-related fields (`min_salary`, `max_salary`, `avg_salary`)
 * are set to `null` if they are `undefined`. Also includes `home_prices` and `companies` properties as-is.
 *
 * @param job - The Job object to serialize.
 * @returns A new Job object with normalized salary fields and included properties.
 */
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