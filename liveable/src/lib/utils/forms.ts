/**
 * Represents the structure of a calculation form used for financial computations.
 *
 * @property homePrice - The total price of the home.
 * @property downPayment - The amount of money paid upfront as a down payment.
 * @property salaryType - The type of salary (e.g., annual, monthly).
 * @property minSalary - The minimum salary considered for the calculation.
 * @property maxSalary - The maximum salary considered for the calculation.
 * @property loanTerm - The duration of the loan in years.
 * @property interestRate - The interest rate applied to the loan.
 */
export interface CalcForm {
  homePrice: number;
  downPayment: number;
  salaryType: string;
  minSalary: number;
  maxSalary: number;
  loanTerm: number;
  interestRate: number;
}

/**
 * Represents the structure of a form used for mapping financial information.
 *
 * @property downPayment - The amount of money paid upfront as a down payment.
 * @property salary - The user's salary or income.
 * @property loanTerm - The duration of the loan in years.
 * @property interestRate - The annual interest rate applied to the loan.
 */
export interface MapForm {
  downPayment: number;
  salary: number;
  loanTerm: number;
  interestRate: number;
}

/**
 * Represents the parameters used for searching.
 *
 * @property career - (Optional) The career or job title to search for.
 * @property location - (Optional) The location to filter search results by.
 */
export interface SearchParams {
  career?: string;
  location?: string;
}