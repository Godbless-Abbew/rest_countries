import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/CountryList.css';

interface Country {
  flag: string;
  name: string;
  capital: string;
  region: string;
  population: number;
}

interface CountriesProps {
  searchTerm: string;
  regionFilter: string; // Add regionFilter as a prop
}

const CountryList: React.FC<CountriesProps> = ({ searchTerm, regionFilter }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v2/all');
        setCountries(response.data);
        setIsLoading(false);
        console.log(response);
      } catch (error) {
        console.error('Error fetching country data:', error);
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filterCountries = () => {
    let filteredCountries = countries;

    // Apply region filter if it is set to a specific region
    if (regionFilter !== 'all') {
      filteredCountries = countries.filter((country) => country.region === regionFilter);
    }

    // Apply search term filter
    filteredCountries = filteredCountries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredCountries;
  };

  return (
    <div className='country-card'>
      {isLoading ? (
        <div className='loading'>Loading please wait...</div>
      ) : (
        filterCountries().map((country) => (
          <Link className='title-link' key={country.name} to={`/country/${country.name}`}>
            <div className='country-container'>
              <div className='country-flag'>
                <img src={country.flag} alt='flag' />
              </div>
              <div className='country-element'>
                <div className='country-info'>
                  <div className='country-name'>{country.name}</div>
                  <div className='country-details'>
                    <div>
                      <span>Population:</span> {country.population.toLocaleString()}
                    </div>
                    <div>
                      <span>Region:</span> {country.region}
                    </div>
                    <div>
                      <span>Capital:</span> {country.capital}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default CountryList;
