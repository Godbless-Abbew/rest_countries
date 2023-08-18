import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import '../styles/CountryCard.css';

interface Currency {
  code: string;
}

interface Language {
  name: string;
}

interface Country {
  flag: string;
  name: string;
  capital: string;
  region: string;
  population: number;
  nativeName: string;
  subregion: string;
  topLevelDomain: string;
  currencies: Currency[];
  languages: Language[];
  borders: string[];
}

const CountryCard: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v2/all');
        const countriesData = response.data;
        const selectedCountry = countriesData.find(c => c.name === countryName);

        if (selectedCountry) {
          setCountry(selectedCountry);
          setIsLoading(false);

          const borderCountryData = await fetchBorderCountries(selectedCountry.borders);
          setBorderCountries(borderCountryData);
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

  const fetchBorderCountries = async (borderNames: string[]) => {
    try {
      const borderResponse = await axios.get<Country[]>(
        `https://restcountries.com/v2/alpha?codes=${borderNames.join(',')}&fields=name`
      );
      return borderResponse.data;
    } catch (error) {
      console.error('Error fetching border countries:', error);
      return [];
    }
  };

  const renderBorderCountries = () => {
    if (borderCountries.length === 0) {
      return <div className="border-list">No border country found</div>;
    }

    return (
      <div className="border-list">
        {borderCountries.map(borderCountry => (
          <Link
            key={borderCountry.name}
            to={`/country/${borderCountry.name}`}
            className="border-country-link"
          >
            {borderCountry.name}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="country-card-link">
      {isLoading && country === null ? (
        <div className="card-loading">Loading...</div>
      ) : (
        country && (
          <div className="country-container-element">
            <div className="back-button" onClick={() => navigate(-1)}>
              <FiArrowLeft className="arrow-left" />
              <h1>Back</h1>
            </div>
            <div className="main-container">
              <div className="country-flags">
                <img src={country.flag} alt="flag" />
              </div>
              <div className="country-card-element">
                <div className="country-info-container">
                  <div className="country-card-name">{country.name}</div>
                  <div className="card-details-info">
                    <div className="country-card-details">
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
                    <div className="top-level-domain">
                      <div>
                        <span>Top Level Domain:</span> {country.topLevelDomain}
                      </div>
                      <div>
                        <span>Currencies:</span> {country.currencies.map(currency => currency.code).join(', ')}
                      </div>
                      <div>
                        <span>Languages:</span> {country.languages.map(language => language.name).join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="border-countries">
                    <div className="country-card-border">
                      <strong>Border Countries:</strong>
                      {renderBorderCountries()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CountryCard;
