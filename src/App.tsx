import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/Toggle.css'
import './styles/Nav.css'
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import CountryCard from './pages/CountryCard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:countryName" element={<CountryCard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
