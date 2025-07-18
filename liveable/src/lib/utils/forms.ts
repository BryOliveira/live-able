export interface CalcForm {
  homePrice: number;
  downPayment: number;
  salaryType: string;
  minSalary: number;
  maxSalary: number;
  loanTerm: number;
  interestRate: number;
}

export interface SearchParams {
  career?: string;
  location?: string;
}
