'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InputSearch, MapPin } from 'iconoir-react';
import Autocomplete from '../autocomplete';
import { stateAbbreviations } from '@/lib/states';

export default function SearchClient(): React.ReactNode {
  const router = useRouter();
  const [careerQuery, setCareerQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [careerSuggestions, setCareerSuggestions] = useState<string[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<'career' | 'location' | null>(null);

  const fetchSuggestions = async(query: string, type: 'career' | 'location') => {
    try {
      const resp = await fetch(`/api/autocomplete/${type}?q=${encodeURIComponent(query)}`);
      const data = await resp.json();
      if (type === 'career') {
        setCareerSuggestions(data);
      } else {
        setLocationSuggestions(data);
      }
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

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (careerQuery.trim()) {
      params.append('career', careerQuery.trim());
    }

    if (locationQuery.trim()) {
      const trimmedQuery = locationQuery.trim();
      
      const stateEntry = Object.entries(stateAbbreviations).find(
        ([fullName]) => fullName.toLowerCase() === trimmedQuery.toLowerCase()
      );

      if (stateEntry) {
        params.append('location', stateEntry[1]);
      }
      else {
        params.append('location', trimmedQuery);
      }
    }

    const queryString = params.toString();
    const url = queryString ? `/jobs?${queryString}` : '/jobs';

    router.push(url);
  }

  useEffect(() => {
    if (activeInput === 'career') {
      fetchSuggestions(careerQuery, 'career');
    } else if (activeInput === 'location') {
      fetchSuggestions(locationQuery, 'location');
    }
  }, [careerQuery, locationQuery, activeInput]);

  return (
    <div className='search-form'>
      <form onSubmit={submitHandler}>
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
                onSelect={(value: string) => {
                  setCareerQuery(value);
                  setActiveInput(null);
                }}
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
                onSelect={(value: string) => {
                  setLocationQuery(value);
                  setActiveInput(null);
                }}
              />
            </div>
          )}
        </div>
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}