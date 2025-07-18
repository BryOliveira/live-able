import { Job } from './prisma';
import { stateAbbreviations } from './states';

/** Class representing a single node in a trie. */
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  suggestions: string[] = [];
}

/** Class representing the trie data structure. */
export class Trie {
  /** Empty root node for the trie. */
  root = new TrieNode();

  /**
   * Inserts a word into the trie, adding each character as a node if it does not already exist.
   * For each character in the word, the method ensures that the current node's suggestions
   * array includes the full word, allowing for efficient prefix-based suggestions.
   *
   * @param word - The word to insert into the trie.
   */
  insert(word: string) {
    let curr = this.root;
    for (const c of word.toLowerCase()) {
      if (!curr.children.has(c)) {
        curr.children.set(c, new TrieNode());
      }
      curr = curr.children.get(c)!;
      if (!curr.suggestions.includes(word)) {
        curr.suggestions.push(word);
      }
    }
  }

  /**
   * Retrieves autocomplete suggestions based on the provided prefix.
   *
   * @param prefix - The prefix string to search for suggestions.
   * @param maxResults - The maximum number of suggestions to return.
   * @returns An array of suggestion strings that start with the given prefix, limited to `maxResults` items.
   *
   * If the prefix is an empty string, returns up to `maxResults` unique suggestions from all root children.
   * If the prefix does not match any entries in the trie, returns an empty array.
   */
  getAutocomplete(prefix: string, maxResults: number): string[] {
    if (prefix.length === 0) {
      const allSuggestions = new Set<string>();
      this.root.children.forEach(node => {
        node.suggestions.forEach(suggestion => allSuggestions.add(suggestion));
      });
      return Array.from(allSuggestions).sort().slice(0, maxResults);
    }
    
    let curr = this.root;
    for (const c of prefix.toLowerCase()) {
      if (!curr.children.has(c)) {
        return [];
      }
      curr = curr.children.get(c)!;
    }

    return curr.suggestions
      .filter(suggestion => suggestion.toLowerCase().startsWith(prefix.toLowerCase()))
      .slice(0, maxResults);
  }
}

/**
 * Instantiates the career suggestions trie.
 * 
 * @param jobs - An array of the Job interface that stores all the job records.
 * @returns A Trie object populated with all the job titles and company sectors in the provided array.
 */
export function buildCareerTrie(jobs: Job[]): Trie {
  const trie = new Trie();
  jobs.forEach(job => {
    trie.insert(job.job_title);
    trie.insert(job.companies.sector);
  })
  return trie;
}

/**
 * Instantiates the location suggestions trie.
 * 
 * @param jobs - An array of the Job interface that stores all the job records.
 * @returns A Trie object populated with all city and state locations
 */
export function buildLocationTrie(jobs: Job[]): Trie {
  const trie = new Trie();
  
  jobs.forEach(job => {
    trie.insert(`${job.loc_city}, ${job.loc_state}`);
    
    // Insert full state name (find full name from abbreviation)
    const fullStateName = (Object.keys(stateAbbreviations)).find(
      state => stateAbbreviations[state] === job.loc_state
    );
    if (fullStateName) {
      trie.insert(fullStateName);
    }
  });
  
  return trie;
}