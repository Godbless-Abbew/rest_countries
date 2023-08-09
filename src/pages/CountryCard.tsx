import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/CountryCard.css';

export interface Country {
  flag: string;
  name: string;
  capital: string;
  region: string;
  population: number;
  nativeName: string;
  subregion: string;
  topLevelDomain: string;
  currencies: { code: string }[];
  languages: { name: string }[];
  borders: string[];
}


const CountryCard: React.FC = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { countryName } = useParams<{ countryName: string }>();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v2/all');
        const countriesData = response.data;
        const selectedCountry = countriesData.find(c => c.name === countryName);
    
        if (selectedCountry) {
          setCountry(selectedCountry);
          setIsLoading(false);
    
          // Fetch border countries' data
          const borderCountriesData = selectedCountry.borders
            .map(border => countriesData.find(c => c.name === border))
            .filter((borderCountry): borderCountry is Country => borderCountry !== undefined);
    
          setBorderCountries(borderCountriesData);
        } else {
          setIsLoading(false);
          console.error('Country not found.');
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
        setIsLoading(false);
      }
    };
    

    fetchCountryData();
  }, [countryName]);

  return (
    <div className='country-card-link'>
      {isLoading ? (
        <div className='card-loading'>Loading...</div>
      ) : country && (
        <div className='country-container-element'>
          <Link to="/" className="back-button">
            <FiArrowLeft className='arrow-left' />
            <h1>Back</h1>
          </Link>
          <div className='main-container'>
            <div className='country-flags'>
              <img src={country.flag} alt='flag' />
            </div>
            <div className='country-card-element'>
              <div className='country-info-container'>
                <div className='country-card-name'>{country.name}</div>
                <div className='card-details-info'>
                  <div className='country-card-details'>
                    <div>
                      <span>Native Name:</span> {country.nativeName}
                    </div>
                    <div>
                      <span>Population:</span> {country.population.toLocaleString()}
                    </div>
                    <div>
                      <span>Region:</span> {country.region}
                    </div>
                    <div>
                      <span>Sub Region:</span> {country.subregion}
                    </div>
                    <div>
                      <span>Capital:</span> {country.capital}
                    </div>
                  </div>
                  <div className='top-level-domain'>
                    <div>
                      <span>Top Level Domain:</span> {country.topLevelDomain}
                    </div>
                    <div>
                      <span>Currencies:</span>{" "}
                      {country.currencies.map(currency => currency.code).join(", ")}
                    </div>
                    <div>
                      <span>Languages:</span> {" "}
                      {country.languages.map(language => language.name).join(", ")}
                    </div>
                  </div>
                </div>
                <div className='border-countries'>
                  <div>
                    <strong>Border Countries:</strong>{" "}
                    {borderCountries.length > 0 ? (
                      borderCountries.map((borderCountry) => (
                        <Link
                          key={borderCountry.name}
                          to={`/country/${borderCountry.name}`}
                          className='border-country-link'>
                          {borderCountry.name}
                        </Link>
                      ))
                    ) : (
                      "None"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCard;
