import getJobs from '@/lib/prisma';
import WrapperClient from './client/wrapperclient';
import { SearchParams } from '@/lib/utils/forms';
import { serializeJob } from '@/lib/utils/format';

/**
 * Asynchronous server component that fetches job data based on the provided search parameters,
 * serializes the job objects, and renders the `WrapperClient` component with the serialized jobs.
 *
 * @param searchParams - The parameters used to filter or search for jobs.
 * @returns A Promise that resolves to a React element rendering the `WrapperClient` with job data.
 */
export default async function Wrapper({ searchParams }: { searchParams: SearchParams }): Promise<React.ReactElement> {
  const jobs = await getJobs(searchParams);
  const serializedJobs = jobs.map(serializeJob);

  return <WrapperClient jobs={serializedJobs} />;
} 