import {MdOutlineDarkMode, MdDarkMode} from 'react-icons/md';
import { useState } from 'react';
import '../styles/Toggle.css';



const Toggle = () => {
    const [darkMode, setDarkMode] = useState(false)
    const toggleDarkMode = () => {
        setDarkMode(prevDarkMode => !prevDarkMode);
      };
    return (
        <button className="toggle-button" onClick={toggleDarkMode}>
          {darkMode ? <MdOutlineDarkMode className="icon" /> : <MdDarkMode className="icon" />}
          <span className="mode-text">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      );
}




 
export default Toggle;


