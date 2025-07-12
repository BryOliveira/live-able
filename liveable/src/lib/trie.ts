class TrieNode {
  children: Map<string, TrieNode> = new Map();
  suggestions: string[] = [];
}

export class Trie {
  root = new TrieNode();
  
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

export function buildCareerTrie(jobs: any[]): Trie {
  const trie = new Trie();
  jobs.forEach(job => {
    trie.insert(job.job_title);
    trie.insert(job.companies.sector);
  })
  return trie;
}

export function buildLocationTrie(jobs: any[]): Trie {
  const trie = new Trie();
  jobs.forEach(job => {
    trie.insert(`${job.loc_city}, ${job.loc_state}`);
    trie.insert(`${job.loc_state}`);
  })
  return trie;
}