import { InputSearch, MapPin } from 'iconoir-react';

export default function SearchBar() {
  return (
    <div className='search-form'>
      <form id='job-search'>
        <InputSearch id='search-icon' />
        <input type='search' placeholder='Job title or sector' />
        <MapPin id='pin-icon' />
        <input type='search' placeholder='City, state, or both (City, ST)'/>
        <button>Search</button>
      </form>
    </div>
  );
}