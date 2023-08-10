
import '../styles/Nav.css'
import '../styles/Toggle.css';
import Toggles from './Toggles';

const Nav = () => {
    return ( 
        <div className="nav">
            <div>
            <h1>Where in the world?</h1>
            </div>
          <Toggles />
        </div>
    );
}
 
export default Nav;