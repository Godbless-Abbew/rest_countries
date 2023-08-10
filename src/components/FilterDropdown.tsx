import React, { useEffect } from 'react';
import '../styles/filterDropdown.css';

interface FilterDropdownProps {
  regionFilter: string;
  setRegionFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ regionFilter, setRegionFilter }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = e.target.value;
    setRegionFilter(selectedRegion);
    localStorage.setItem('regionFilter', selectedRegion);
  };

  useEffect(() => {
    const savedRegionFilter = localStorage.getItem('regionFilter');
    if (savedRegionFilter) {
      setRegionFilter(savedRegionFilter);
    }
  }, [setRegionFilter]);

  return (
    <div className="filter-dropdown">
      <div className="dropdown-container">
        <select value={regionFilter} onChange={handleFilterChange}>
          <option value="all" className='region'>Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
}

export default FilterDropdown;
