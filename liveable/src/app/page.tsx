import SearchBar from './components/global/search';
import Banner from './components/home/banner';

export default function Home() {
  return (
    <div>
      <div id='hero'>
        <div>
          <h1>Welcome</h1>
          <p>Find work where you can live, not just where you can afford.</p>
          <SearchBar />
        </div >
      </div>
      <Banner />
    </div>
  );
}