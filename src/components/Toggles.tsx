import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/md';
import { useState, useEffect } from 'react';
import '../styles/Toggle.css';

const Toggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if the user has a preference for dark mode in local storage
    const isDarkModePreferred = localStorage.getItem('darkMode');
    setDarkMode(isDarkModePreferred === 'true');
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  return (
    <button className={`toggle-button ${darkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>
      {darkMode ? <MdDarkMode className="icon" /> : <MdOutlineDarkMode className="icon" />}
      <span className="mode-text">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
};

export default Toggle;
