import { CalcForm } from './forms';
const MONTHS_PER_YEAR = 12; // Per year 
const HOURS_PER_WEEK = 40; // Per workweek
const WEEKS_PER_YEAR = 52;

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

export function hourlyToAnnual(hourly: number, numHours = HOURS_PER_WEEK, workWeeks = WEEKS_PER_YEAR): number {
  return hourly * numHours * workWeeks;
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

export function hourlyToMonthly(
  hourlyRate: number, 
  hoursPerWeek: number = HOURS_PER_WEEK
): number {
  const weeklyIncome = hourlyRate * hoursPerWeek;
  const weeksPerMonth = WEEKS_PER_YEAR / MONTHS_PER_YEAR;
  return weeklyIncome * weeksPerMonth;
}