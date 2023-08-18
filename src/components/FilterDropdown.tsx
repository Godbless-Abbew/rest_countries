import React, { useState, useEffect } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import "../styles/filterDropdown.css";

interface Region {
  value: string;
  label: string;
}

interface FilterHeaderProps {
  regionLabel: string;
  isDropdownOpen: boolean;
  onClick: () => void;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({ regionLabel, isDropdownOpen, onClick }) => (
  <div
    className={`filter-header ${isDropdownOpen ? "open" : "close"}`}
    onClick={onClick}
  >
    <span>{regionLabel}</span>
    <span className="dropdown-icon">
      {isDropdownOpen ? <FaAngleDown /> : <FaAngleUp />}
    </span>
  </div>
);

interface FilterOptionProps {
  region: Region;
  isActive: boolean;
  onClick: () => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({ region, isActive, onClick }) => (
  <div
    className={`option ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    {region.label}
  </div>
);

interface FilterDropdownProps {
  regionFilter: string;
  setRegionFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  regionFilter,
  setRegionFilter,
}) => {
  const regions: Region[] = [
    { value: "all", label: "Filter by Region" },
    { value: "Africa", label: "Africa" },
    { value: "Americas", label: "America" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const savedRegionFilter = localStorage.getItem("regionFilter");
    if (savedRegionFilter) {
      setRegionFilter(savedRegionFilter);
    }
  }, [setRegionFilter]);

  const handleOptionClick = (selectedRegion: string) => {
    setRegionFilter(selectedRegion);
    localStorage.setItem("regionFilter", selectedRegion);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="filter-dropdown">
      <FilterHeader
        regionLabel={regions.find((region) => region.value === regionFilter)?.label || ""}
        isDropdownOpen={isDropdownOpen}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="options visible">
          {regions.map((region) => (
            <FilterOption
              key={region.value}
              region={region}
              isActive={region.value === regionFilter}
              onClick={() => handleOptionClick(region.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
