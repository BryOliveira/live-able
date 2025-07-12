import prisma from '@/lib/db';

export default async function getJobs() {
  return await prisma.jobs.findMany({
    include: {
      companies: true,
      home_prices: true
    }
  });
}