import { useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import brandLogo from '../assets/brand-logo-transparent.png';
import { useTheme } from '../context/ThemeContext.js';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About Me', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();

  return (
    <m.header
      className="navbar"
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Link to="/" className="nav-logo" aria-label="Sanjeev home">
        <img src={brandLogo} alt="Zayan IT Hub" width="84" height="80" />
      </Link>

      <nav aria-label="Main navigation">
        <ul id="main-menu" className={`nav-menu${menuOpen ? ' open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="theme-toggle"
        type="button"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        aria-pressed={theme === 'light'}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
      </button>

      <a className="nav-connect" href="#contact">Connect With Me</a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="main-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
      </button>
    </m.header>
  );
}

export default Navbar;
