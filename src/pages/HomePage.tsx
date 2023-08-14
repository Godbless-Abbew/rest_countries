
import Search from"../components/Search"
import FilterDropdown from "../components/FilterDropdown";
import '../styles/HomePage.css';
import '../App.css';
import CountryList from "./CountryList";
import { useState } from "react";

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [regionFilter, setRegionFilter] = useState<string>('all')
    return ( 
        <div className="home-element">
        <div className="home-page">
        <Search value={searchTerm} onChange={setSearchTerm}/>
        <FilterDropdown regionFilter={regionFilter} setRegionFilter={setRegionFilter}/>
        </div>
        <CountryList searchTerm={searchTerm} regionFilter={regionFilter}/>
        </div>
    );
}
 
export default HomePage;