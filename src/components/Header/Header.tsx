import './Header.css';
import logo from '../../assets/oasis-logo-pink.svg';

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Oasis Logo" />
      <p>Menu?</p>
    </div>
  );
}
export default Header;
