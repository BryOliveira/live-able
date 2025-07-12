'use client';
import { useState, useEffect, act } from 'react';
import { InputSearch, MapPin } from 'iconoir-react';
import Autocomplete from '../autocomplete';

export default function SearchClient() {
  const [careerQuery, setCareerQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [careerSuggestions, setCareerSuggestions] = useState<string[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<'career' | 'location' | null>(null);

  const fetchSuggestions = async(query: string, type: 'career' | 'location') => {
    try {
      const resp = await fetch(`/api/autocomplete/${type}?q=${encodeURIComponent(query)}`);
      const data = await resp.json();
      type === 'career' ? setCareerSuggestions(data) : setLocationSuggestions(data);
    } catch (err) {
      console.error(`Error fetching ${type} suggestions:`, err);
    }
  };

  const careerBlurHandler = () => {
    setTimeout(() => {
      setActiveInput(prev => prev === 'career' ? null : prev);
    }, 100);
  };

  const locationBlurHandler = () => {
    setTimeout(() => {
      setActiveInput(prev => prev === 'location' ? null : prev);
    }, 100);
  };

  useEffect(() => {
    if (activeInput === 'career') {
      fetchSuggestions(careerQuery, 'career');
    } else if (activeInput === 'location') {
      fetchSuggestions(locationQuery, 'location');
    }
  }, [careerQuery, locationQuery, activeInput]);

  return (
    <div className='search-form'>
      <form id='job-search'>
        <InputSearch id='search-icon' />
        <div className='input-wrapper'>
          <input 
            type='search' 
            id='career'
            value={careerQuery} 
            onChange={(event) => setCareerQuery(event.target.value)} 
            onFocus={() => setActiveInput('career')}
            onBlur={careerBlurHandler}
            placeholder='Job title or sector' 
          />
          {activeInput === 'career' && (
            <div className='autocomplete'>
              <Autocomplete
                suggestions={careerSuggestions}
              />
            </div>
          )}
        </div>
          <MapPin id='pin-icon' />
          <div className='input-wrapper'>
            <input 
              type='search' 
              id='location' 
              value={locationQuery}
              onChange={(event) => setLocationQuery(event.target.value)}
              onFocus={() => setActiveInput('location')}
              onBlur={locationBlurHandler}
              placeholder='City, ST, or ST' 
            />
            {activeInput === 'location' && (
              <div className='autocomplete'>
                <Autocomplete
                  suggestions={locationSuggestions}
                />
              </div>
            )}
        </div>

        <button type='submit'>Search</button>
      </form>
    </div>
  );
}