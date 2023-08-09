import React, { useState, useEffect } from 'react';
import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/md';
import '../styles/Toggle.css';

const Toggles: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkModePreferred = localStorage.getItem('darkMode');
    setDarkMode(isDarkModePreferred === 'true');
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-background', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  const Icon = darkMode ? MdDarkMode : MdOutlineDarkMode;
  const modeText = darkMode ? 'Dark Mode' : 'Light Mode';

  return (
    <div className='dark-mode'>
      <button className={`toggle-button ${darkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>
        <Icon className="icon" />
        <span className="mode-text">{modeText}</span>
      </button>
    </div>
  );
};

export default Toggles;
