import getJobs from './prisma';
import { buildCareerTrie, buildLocationTrie } from './trie';

const jobs = await getJobs();

export async function getCareerSuggestions(prefix: string, maxResults: number = 40): Promise<string[]> {
  const careerTrie = buildCareerTrie(jobs);
  return careerTrie.getAutocomplete(prefix, maxResults);
}

export async function getLocationSuggestions(prefix: string, maxResults: number = 40): Promise<string[]> {
  const locationsTrie = buildLocationTrie(jobs);
  return locationsTrie.getAutocomplete(prefix, maxResults);
}