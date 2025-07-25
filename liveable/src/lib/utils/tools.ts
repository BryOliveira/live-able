import { CalcForm, MapForm } from './forms';
const MONTHS_PER_YEAR = 12; // Per year 
const HOURS_PER_WEEK = 40; // Per workweek
const WEEKS_PER_MONTH = 4;

/**
 * Calculates the fixed monthly mortgage payment required to fully amortize a loan over a specified period.
 *
 * @param principal - The initial amount of the loan (the principal).
 * @param monthlyRate - The monthly interest rate as a decimal (e.g., 0.005 for 0.5% per month).
 * @param totalPayments - The total number of monthly payments (e.g., 360 for a 30-year mortgage).
 * @returns The calculated monthly payment amount.
 *
 * @remarks
 * If the monthly interest rate is zero, the function returns a simple division of the principal by the number of payments.
 * Otherwise, it uses the standard amortization formula for fixed-rate mortgages.
 */
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

/**
 * Converts an hourly rate to a monthly rate.
 *
 * @param hourly - The hourly rate to convert.
 * @param numHours - The number of hours worked per week. Defaults to `HOURS_PER_WEEK`.
 * @returns The equivalent monthly rate, calculated as `hourly * numHours * WEEKS_PER_MONTH`.
 */
export function hourlyToMonthly(hourly: number, numHours = HOURS_PER_WEEK): number {
  return hourly * numHours * WEEKS_PER_MONTH;
}

/**
 * Calculates the monthly mortgage payment based on the provided form values.
 *
 * @param formValues - An object containing the mortgage calculation parameters:
 *   - homePrice: The total price of the home.
 *   - downPayment: The initial payment made towards the home.
 *   - interestRate: The annual interest rate (as a percentage).
 *   - loanTerm: The duration of the loan in years.
 * @returns The calculated monthly mortgage payment amount.
 */
export function calculateMortgage(formValues: CalcForm): number {
  const principal = formValues.homePrice - formValues.downPayment;
  const monthlyInterestRate = (formValues.interestRate / 100) / MONTHS_PER_YEAR;
  const totalPayments = formValues.loanTerm * MONTHS_PER_YEAR;
  
  return calculateMonthlyMortgagePayment(principal, monthlyInterestRate, totalPayments);
}

/**
 * Converts an annual salary to its equivalent monthly amount.
 *
 * @param annualSalary - The total salary amount per year.
 * @returns The calculated monthly salary.
 */
export function annualToMonthly(annualSalary: number): number {
  return annualSalary / MONTHS_PER_YEAR;
}

/**
 * Parses a string input value into a number, removing any commas.
 *
 * @param value - The string value to parse, which may contain commas as thousand separators.
 * @returns The parsed number, or 0 if the input is not a valid number.
 */
export function parseInputValue(value: string): number {
  const cleaned = value.replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Calculates the monthly mortgage payment based on the provided form values and home price.
 * Used for the Map component as that tool does not allow the user to input house prices.
 *
 * @param formValues - The form values containing down payment, interest rate, and loan term.
 * @param homePrice - The total price of the home.
 * @returns The calculated monthly mortgage payment amount.
 */
export function calculateMapMortgage(formValues: MapForm, homePrice: number): number {
  const principal = homePrice - formValues.downPayment;
  const monthlyInterestRate = (formValues.interestRate / 100) / MONTHS_PER_YEAR;
  const totalPayments = formValues.loanTerm * MONTHS_PER_YEAR;

  return calculateMonthlyMortgagePayment(principal, monthlyInterestRate, totalPayments);
}