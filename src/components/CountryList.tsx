// src/CountryList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CountryList.css';

interface Country {
  flag: string;
  name: string;
  capital: string;
  region: string;
  population: number;
  
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v2/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className='country-card'>
      
        {countries.map((country) => (
          <div key={country.name} className='country-container'>
            <div className='country-flag'>
            <img src={country.flag} alt="flag"/>
            </div>
            <div className='country-element'>
            <div className='country-info'>
            {country.name}
            <div className='country-details'>
             <div> <span>Population:</span> {country.population.toLocaleString()} </div >
             <div> <span>Region:</span> {country.region}</div>
              <div> <span>Capital:</span> {country.capital}</div>
             </div>
             </div>
             </div>
             </div>
        ))}
    </div>
  );
};

export default CountryList;
