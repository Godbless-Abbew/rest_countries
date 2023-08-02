
import './App.css';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import CountryList from './components/CountryList';

const App: React.FC = () => {
  return (
    <div className="App">
      <Nav />
       <HomePage />
       <CountryList />
    </div>
  );
}

export default App;
