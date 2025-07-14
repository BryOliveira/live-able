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