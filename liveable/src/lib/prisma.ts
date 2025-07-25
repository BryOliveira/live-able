import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

/**
 * Represents a company entity with its basic information.
 *
 * @property id - Unique identifier for the company.
 * @property company_name - The name of the company.
 * @property sector - The sector or industry the company operates in.
 */
export interface Company {
  id: number;
  company_name: string;
  sector: string;
}

/**
 * Represents the median house price information for a specific location.
 *
 * @property loc_state - The location's state code or abbreviation.
 * @property state - The full name of the state.
 * @property median_house_price - The median price of houses in the specified location.
 */
export interface HomePrice {
  loc_state: string;
  state: string;
  median_house_price: number;
}


/**
 * Represents a job listing with associated company and home price information.
 *
 * @property id - Unique identifier for the job.
 * @property job_title - Title of the job position.
 * @property job_description (optional) - Detailed description of the job, or null if not provided.
 * @property loc_city - City where the job is located.
 * @property string loc_state - State where the job is located.
 * @property avg_salary (optional) - Average salary for the job, or null if not available.
 * @property max_salary (optional) - Maximum salary for the job, or null if not available.
 * @property min_salary (optional) - Minimum salary for the job, or null if not available.
 * @property is_hourly - Indicates if the salary is hourly (true) or not (false).
 * @property companies - The company offering the job.
 * @property home_prices (optional) - Home price information relevant to the job location, or null if not available.
 */
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


/**
 * Represents optional filters that can be applied when querying for jobs.
 *
 * @property career - (Optional) The career field to filter jobs by.
 * @property location - (Optional) The location to filter jobs by.
 */
interface JobFilters {
  career?: string;
  location?: string;
}

/**
 * Represents the result of a job query from Prisma, including job details,
 * associated company information, and optional home price data.
 *
 * @property {number} job_id - Unique identifier for the job.
 * @property {string} job_title - Title of the job position.
 * @property {string | null} job_description - Description of the job, or null if not available.
 * @property {string | null} loc_city - City where the job is located, or null if not specified.
 * @property {string} loc_state - State where the job is located.
 * @property {Decimal | null} avg_salary - Average salary for the job, or null if not available.
 * @property {Decimal | null} max_salary - Maximum salary for the job, or null if not available.
 * @property {Decimal | null} min_salary - Minimum salary for the job, or null if not available.
 * @property {boolean} is_hourly - Indicates if the salary is hourly.
 * @property {Object} companies - Information about the company offering the job.
 * @property {number} companies.company_id - Unique identifier for the company.
 * @property {string} companies.company_name - Name of the company.
 * @property {string} companies.sector - Sector in which the company operates.
 * @property {string} [companies.loc_state] - Optional state where the company is located.
 * @property {Object | null} home_prices - Optional home price data for the job's state.
 * @property {string} home_prices.loc_state - State for which the home price is provided.
 * @property {Decimal} home_prices.median_house_price - Median house price in the state.
 */
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

/**
 * Parses a location string and extracts the city and/or state information.
 *
 * The function expects the location string to be in one of the following formats:
 * - "City, State": Returns an object with both `city` and `state` properties.
 * - "ST": If the string is exactly two letters, it is treated as a state abbreviation and returned as the `state` property.
 * - Otherwise, treats the input as a city and also returns the uppercase version as the `state` property.
 *
 * @param location - The location string to parse.
 * @returns An object containing the parsed `city` and/or `state` properties.
 */
function parseLocation(location: string): { city?: string; state?: string} {
  const trimmed = location.trim();
  if (trimmed.includes(',')) {
    const args = trimmed.split(',').map(arg => arg.trim());
    if (args.length >= 2) {
      return {
        city: args[0],
        state: args[1].toUpperCase() 
      }
    }
  }

  if (trimmed.length === 2 && /^[A-Za-z]{2}$/.test(trimmed)) {
    return { state: trimmed.toUpperCase() };
  }

  return { city: trimmed, state: trimmed.toUpperCase() };
}

/**
 * Retrieves a list of jobs from the database based on optional filter criteria.
 *
 * @param filters - An optional object containing filter criteria for jobs.
 * @param filters.career - A string to filter jobs by job title or company sector.
 * @param filters.location - A string representing the location to filter jobs by city and/or state.
 * @returns A promise that resolves to an array of jobs matching the provided filters.
 *
 * The returned jobs include associated company and home price information.
 */
export default async function getJobs(filters: JobFilters = {}): Promise<Job[]> {
  const { career, location } = filters;

  const whereClause: Prisma.jobsWhereInput = {};

  if (career) {
    whereClause.OR = [
      { job_title: { contains: career } },
      { companies: { sector: { contains: career } } }
    ];
  }

  if (location) {
    const { city, state } = parseLocation(location);
    const locationConditions = [];
    
    if (city && state && city !== state) {
      locationConditions.push({
        AND: [
          { loc_city: { contains: city } },
          { loc_state: { contains: state } }
        ]
      });
    } else if (state && !city) {
      locationConditions.push({ loc_state: { contains: state } });
    } else if (city) {
      locationConditions.push(
        { loc_city: { contains: city } },
        { loc_state: { contains: city } }
      );
    }
    
    if (locationConditions.length > 0) {
      if (whereClause.OR) {
        whereClause.AND = [
          { OR: whereClause.OR },
          { OR: locationConditions }
        ];
        delete whereClause.OR;
      } else {
        whereClause.OR = locationConditions;
      }
    }
  }

  const jobs = await prisma.jobs.findMany({
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
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