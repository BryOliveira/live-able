import SearchBar from '../components/search';
import Wrapper from '../components/wrapper';
import '@/styles/job-styles.css';

export default function Home() {
  return (
    <div>
      <div id='bar-wrapper'>
        <SearchBar />
      </div>
      <Wrapper />
    </div>
  );
}
