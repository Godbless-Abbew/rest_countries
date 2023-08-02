
import Search from"../components/Search"
import FilterDropdown from "../components/FilterDropdown";
import '../styles/HomePage.css';

const HomePage = () => {
    return ( 
        <>
        <div className="home-page">
        <Search />
        <FilterDropdown />
        </div>
        </>
    );
}
 
export default HomePage;