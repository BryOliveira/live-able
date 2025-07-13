import getJobs from '@/lib/prisma';
import WrapperClient from './client/wrapperclient';
import { Job } from '@/lib/prisma';

function serializeJob(job: Job): Job {
  return {
    ...job,
    min_salary: job.min_salary ?? null,
    max_salary: job.max_salary ?? null,
    avg_salary: job.avg_salary ?? null,
    home_prices: job.home_prices,
    companies: job.companies,
  };
}

interface WrapperProps {
  searchParams: {
    career?: string;
    location?: string;
  };
}

export default async function Wrapper({ searchParams }: WrapperProps): Promise<React.ReactElement> {
  const jobs = await getJobs(searchParams);
  const serializedJobs = jobs.map(serializeJob);

  return <WrapperClient jobs={serializedJobs} />;
} 