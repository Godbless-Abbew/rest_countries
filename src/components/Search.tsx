import { FiSearch } from "react-icons/fi";
import '../styles/Search.css'

interface InputProps {
    value: string;
    onChange: (value: string) => void;
}


const Search: React.FC<InputProps> = ({value, onChange}) => {
    
    return (
        <div className="searchInput" >
            <div className="search">
            <FiSearch className="search-icon" />
            <input 
                type="text" 
                placeholder="Search for a country…"
                value={value}    
                onChange={({target}) =>onChange(target.value)}
             />

            </div>

        </div>
    );
}
 
export default Search;