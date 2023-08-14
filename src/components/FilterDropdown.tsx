import React, { useState } from "react";
import { FaAngleUp,  FaAngleDown } from "react-icons/fa";
import "../styles/filterDropdown.css";

interface FilterDropdownProps {
  regionFilter: string;
  setRegionFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  regionFilter,
  setRegionFilter,
}) => {
  const options = [
    { value: "all", label: "Filter by Region" },
    { value: "Africa", label: "Africa" },
    { value: "Americas", label: "Americas" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilterChange = (selectedRegion: string) => {
    setRegionFilter(selectedRegion);
    localStorage.setItem("regionFilter", selectedRegion);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="filter-dropdown">
      <div
        className={`filter-header ${isDropdownOpen ? "open" : "close"}`}
        onClick={toggleDropdown}
      >
        <span>{regionFilter === "all" ? "Filter by Region" : regionFilter}</span>
        <span className="dropdown-icon">
          {isDropdownOpen ? <FaAngleDown /> : <FaAngleUp/>}
        </span>
      </div>
      {isDropdownOpen && (
        <div className="options">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleFilterChange(option.value)}
              className="option"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;