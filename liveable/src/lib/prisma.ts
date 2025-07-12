import prisma from '@/lib/db';
import { Decimal } from '@prisma/client/runtime/library';

export interface Company {
  id: number;
  company_name: string;
  sector: string;
}

export interface HomePrice {
  loc_state: string;
  state: string;
  median_house_price: number;
}

export interface Job {
  id: number;
  job_title: string;
  job_description: string | null;
  loc_city: string;
  loc_state: string;
  avg_salary: number | null;
  max_salary: number | null;
  min_salary: number | null;
  is_hourly: boolean;
  companies: Company;
  home_prices: HomePrice | null;
}

// Raw Prisma result interface
interface PrismaJobResult {
  job_id: number;
  job_title: string;
  job_description: string | null;
  loc_city: string | null;
  loc_state: string;
  avg_salary: Decimal | null;
  max_salary: Decimal | null;
  min_salary: Decimal | null;
  is_hourly: boolean;
  companies: {
    company_id: number;
    company_name: string;
    sector: string;
    loc_state?: string;
  };
  home_prices: {
    loc_state: string;
    median_house_price: Decimal;
  } | null;
}

export default async function getJobs(): Promise<Job[]> {
  const jobs = await prisma.jobs.findMany({
    include: {
      companies: true,
      home_prices: true
    }
  });

  return jobs.map((job: PrismaJobResult) => ({
    id: job.job_id, 
    job_title: job.job_title,
    job_description: job.job_description,
    loc_city: job.loc_city ?? '',
    loc_state: job.loc_state,
    avg_salary: job.avg_salary ? Number(job.avg_salary) : null,
    max_salary: job.max_salary ? Number(job.max_salary) : null,
    min_salary: job.min_salary ? Number(job.min_salary) : null,
    is_hourly: job.is_hourly,
    companies: {
      id: job.companies.company_id,
      company_name: job.companies.company_name,
      sector: job.companies.sector
    },
    home_prices: job.home_prices
      ? {
          loc_state: job.home_prices.loc_state,
          state: job.home_prices.loc_state,
          median_house_price: Number(job.home_prices.median_house_price)
        }
      : null
  }));
}