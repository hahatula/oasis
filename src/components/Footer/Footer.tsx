import './Footer.css';
import Toolbar from '../Toolbar/Toolbar';

function Footer() {
  return (
    <div className="footer">
      <p className='footer__info'>Developed by Olga Golubev</p>
      <Toolbar />
      <p className='footer__info footer__year'>2024</p>
    </div>
  );
}
export default Footer;
