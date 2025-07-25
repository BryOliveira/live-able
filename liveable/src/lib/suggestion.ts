import getJobs from './prisma';
import { buildCareerTrie, buildLocationTrie } from './trie';

const jobs = await getJobs();

/**
 * Retrieves a list of career suggestions based on the provided prefix.
 *
 * @param prefix - The prefix string to match career suggestions against.
 * @param maxResults - The maximum number of suggestions to return. Defaults to 40.
 * @returns A promise that resolves to an array of suggested career strings.
 */
export async function getCareerSuggestions(prefix: string, maxResults: number = 40): Promise<string[]> {
  const careerTrie = buildCareerTrie(jobs);
  return careerTrie.getAutocomplete(prefix, maxResults);
}

/**
 * Retrieves a list of location suggestions based on the provided prefix.
 *
 * @param prefix - The prefix string to search for matching location suggestions.
 * @param maxResults - The maximum number of suggestions to return. Defaults to 40.
 * @returns A promise that resolves to an array of suggested location strings.
 */
export async function getLocationSuggestions(prefix: string, maxResults: number = 40): Promise<string[]> {
  const locationsTrie = buildLocationTrie(jobs);
  return locationsTrie.getAutocomplete(prefix, maxResults);
}