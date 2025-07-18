import { CalcForm } from './forms';
const MONTHS = 12; // Per year 
const AVG_HOURS = 40; // Per workweek
const WEEKS_PER_YEAR = 52;

function mortgagePayment(p: number, i: number, n: number): number {
  const num = i * ((1 + i) ** n);
  const den = ((1 + i) ** n) - 1;
  return p * (num / den);
}

function hourlyToAnnual(hourly: number, numHours = AVG_HOURS, workWeeks = WEEKS_PER_YEAR): number {
  return hourly * numHours * workWeeks;
}

export async function calcMortgage(formValues: CalcForm): Promise<number> {
  const principal = formValues.homePrice - formValues.downPayment;
  return mortgagePayment(principal, ((formValues.interestRate / 100) / MONTHS), formValues.loanTerm);
}