import './Footer.css';
import Toolbar from '../Toolbar/Toolbar';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info">
        Developed by{' '}
        <a
          href="https://www.linkedin.com/in/olgagolubev/"
          target="_blank"
          className="footer__link"
        >
          Olga&nbsp;Golubev
        </a>
      </p>
      <Toolbar />
      <p className="footer__info footer__year">2024</p>
    </footer>
  );
}
export default Footer;
