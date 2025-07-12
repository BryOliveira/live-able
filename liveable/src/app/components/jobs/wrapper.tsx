import getJobs from '@/lib/prisma';
import WrapperClient from './client/wrapperclient';

function serializeHomePrices(home_prices: any) {
  if (!home_prices) return null;
  return {
    ...home_prices,
    median_house_price: home_prices.median_house_price?.toNumber?.() ?? null,
  };
}

function serializeJob(job: any) {
  return {
    ...job,
    min_salary: job.min_salary?.toNumber?.() ?? null,
    max_salary: job.max_salary?.toNumber?.() ?? null,
    avg_salary: job.avg_salary?.toNumber?.() ?? null,
    home_prices: serializeHomePrices(job.home_prices),
    companies: job.companies,
  };
}

export default async function Wrapper() {
  const jobs = await getJobs();

  // Convert all Decimal fields to numbers
  const serializedJobs = jobs.map(serializeJob);

  return <WrapperClient jobs={serializedJobs} />;
}