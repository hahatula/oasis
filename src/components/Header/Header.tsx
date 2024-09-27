import './Header.css';
import logo from '../../assets/oasis-logo-pink.svg';
import menuIcon from '../../assets/menu.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { openModal } from '../../redux/modalSlice';
import { useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const [burgerOpened, setBurgerOpened] = useState(false);

  const closeBurger = () => setBurgerOpened(false);

  return (
    <div className="header">
      <img src={logo} alt="Oasis Logo" />
      <div onClick={() => dispatch(openModal('sign-in')) } >Temp button</div>
      <nav className="header__nav">
        <Link to="/" className="header__link">
          Home
        </Link>
        <Link to="/profile" className="header__link">
          My oasis
        </Link>
      </nav>
      <img
        src={menuIcon}
        alt="Menu button"
        className="header__burger-button"
        onClick={() => setBurgerOpened(!burgerOpened)}
      />

      {burgerOpened && (
        <nav className="header__burger-nav">
          <button
            className="header__close-btn"
            type="button"
            onClick={closeBurger}
          />
          <Link to="/" className="header__link" onClick={closeBurger}>
            Home
          </Link>
          <Link to="/profile" className="header__link" onClick={closeBurger}>
            My oasis
          </Link>
          <div className="header__additional-info">
            <p className="header__info">
              Developed by{' '}
              <a
                href="https://www.linkedin.com/in/olgagolubev/"
                target="_blank"
                className="header__info-link"
              >
                Olga&nbsp;Golubev
              </a>
            </p>
            <p className="">2024</p>
          </div>
        </nav>
      )}
    </div>
  );
}
export default Header;
