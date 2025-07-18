import getJobs from '@/lib/prisma';
import WrapperClient from './client/wrapperclient';
import { SearchParams } from '@/lib/utils/forms';
import { serializeJob } from '@/lib/utils/format';

export default async function Wrapper({ searchParams }: { searchParams: SearchParams }): Promise<React.ReactElement> {
  const jobs = await getJobs(searchParams);
  const serializedJobs = jobs.map(serializeJob);

  return <WrapperClient jobs={serializedJobs} />;
} 