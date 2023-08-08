import Toggles from "./Toggles";
import '../styles/Nav.css'
import '../styles/Toggle.css';

const Nav = () => {
    return ( 
        <div className="nav">
            <h1>Where in the world?</h1>
            <Toggles />
        </div>
    );
}
 
export default Nav;