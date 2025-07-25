import SearchClient from './client/searchclient';

/**
 * A server-side function that simply renders the searchbar.
 * 
 * @returns The client-side search bar rendered.
 */
export default function SearchBar(): React.ReactNode {
  return <SearchClient />;
}