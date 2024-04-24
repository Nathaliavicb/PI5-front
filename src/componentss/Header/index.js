import './header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <Link className='logo' to="/">PI V</Link>
            <Link className='favoritos' to="/favoritos">Carteira</Link>
        </header>
    )
}

export default Header;