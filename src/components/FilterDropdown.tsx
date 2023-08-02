
import '../styles/filterDropdown.css'


const FilterDropdown = () => {
    return (
        <div className="filter-dropdown">
            <div className="filter-dropdown-menu">
            <select>
            <option value="all">Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
            </select>
            </div>
        </div>
     );
}
 
export default FilterDropdown;