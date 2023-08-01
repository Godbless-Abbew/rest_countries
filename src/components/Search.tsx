import { FiSearch } from "react-icons/fi";
import '../styles/Search.css'
const search = () => {
    return (
        <div className="searchInput" >
            <div className ="search">
            <FiSearch />
            <input type="text"  placeholder="Search for a country…" />
            </div>

        </div>
    );
}
 
export default search;