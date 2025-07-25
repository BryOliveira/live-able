import React from 'react';
import SearchBar from './components/global/search';
import Banner from './components/home/banner';

/**
 * Home page component.
 *
 * Renders the main landing page with a hero section, welcome message,
 * a search bar for finding work, and a banner.
 *
 * @returns The rendered home page component as a ReactNode.
 */
export default function Home(): React.ReactNode {
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