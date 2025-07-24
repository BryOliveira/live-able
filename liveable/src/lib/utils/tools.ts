import { CalcForm, MapForm } from './forms';
const MONTHS_PER_YEAR = 12; // Per year 
const HOURS_PER_WEEK = 40; // Per workweek
const WEEKS_PER_MONTH = 4;

function calculateMonthlyMortgagePayment(
  principal: number, 
  monthlyRate: number, 
  totalPayments: number
): number {
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }
  const num = monthlyRate * ((1 + monthlyRate) ** totalPayments);
  const den = ((1 + monthlyRate) ** totalPayments) - 1;
  return principal * (num / den);
}

export function hourlyToMonthly(hourly: number, numHours = HOURS_PER_WEEK): number {
  return hourly * numHours * WEEKS_PER_MONTH;
}

export function calculateMortgage(formValues: CalcForm): number {
  const principal = formValues.homePrice - formValues.downPayment;
  const monthlyInterestRate = (formValues.interestRate / 100) / MONTHS_PER_YEAR;
  const totalPayments = formValues.loanTerm * MONTHS_PER_YEAR;
  
  return calculateMonthlyMortgagePayment(principal, monthlyInterestRate, totalPayments);
}

export function annualToMonthly(annualSalary: number): number {
  return annualSalary / MONTHS_PER_YEAR;
}

export function parseInputValue(value: string): number {
  const cleaned = value.replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export function calculateMapMortgage(formValues: MapForm, homePrice: number): number {
  const principal = homePrice - formValues.downPayment;
  const monthlyInterestRate = (formValues.interestRate / 100) / MONTHS_PER_YEAR;
  const totalPayments = formValues.loanTerm * MONTHS_PER_YEAR;

  return calculateMonthlyMortgagePayment(principal, monthlyInterestRate, totalPayments);
}