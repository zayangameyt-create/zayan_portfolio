import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import brandLogo from '../assets/brand-logo-transparent.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <Link to="/" className="footer-logo" aria-label="ZT IT HUB home">
            <img className="footer-brand" src={brandLogo} alt="ZT IT HUB" width="72" height="64" loading="lazy" />
          </Link>
          <nav aria-label="Footer navigation">
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <div className="footer-socials">
            <a href="mailto:smiliesanjay@gmail.com">Email <ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href="https://github.com/zayanithub" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sanjeev. All rights reserved.</p>
          <p>Designed and built with care.</p>
          <a className="back-to-top" href="#home">Back to top <ArrowUp size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
