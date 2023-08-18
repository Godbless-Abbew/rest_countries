import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../styles/Nav.css';
import '../styles/Toggle.css';
import Toggles from './Toggles';

const Nav = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleHeaderClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); 
        navigate('/'); 
        scrollToTop(); 
    };

    return ( 
        <div className="nav">
            <div>
                <a href="/" onClick={(event) => handleHeaderClick(event)}>
                    <h1>Where in the world?</h1>
                </a>
            </div>
            <Toggles />
        </div>
    );
}
 
export default Nav;
