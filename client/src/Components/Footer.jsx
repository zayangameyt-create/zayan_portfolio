import { Link } from 'react-router-dom';
import brandLogo from '../assets/brand-logo-transparent.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link to="/" aria-label="Back to home">
          <img className="footer-brand" src={brandLogo} alt="Zayan IT Hub" width="74" height="74" loading="lazy" />
        </Link>

        <ul className="footer-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="footer-socials">
          <a href="mailto:smiliesanjay@gmail.com">Email</a>
          <a href="https://github.com/zayanithub" target="_blank" rel="noreferrer">GitHub</a>
        </div>

        <p className="footer-copy">&copy; {new Date().getFullYear()} Sanjeev. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
