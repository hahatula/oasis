import './Header.css';
import logo from '../../assets/oasis-logo-pink.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Oasis Logo" />
      <nav>
        <Link to="/" className="header__link">
          Home
        </Link>
        <Link to="/profile" className="header__link">
          My oasis
        </Link>
      </nav>
    </div>
  );
}
export default Header;
