import { useEffect, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import brandLogo from '../assets/brand-logo-transparent.png';
import { useTheme } from '../context/ThemeContext.js';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const reduceMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

      if (current) setActiveSection(`#${current.target.id}`);
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.2, 0.45] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <m.header
      className="navbar"
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
    >
      <Link to="/" className="nav-logo" aria-label="Sanjeev home">
        <img src={brandLogo} alt="ZT IT HUB" width="72" height="64" />
      </Link>

      <nav className={`nav-panel${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
        <ul id="main-menu" className="nav-menu">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={activeSection === link.href ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav-actions">
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-pressed={theme === 'dark'}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>
        <a className="nav-connect" href="#contact">
          Let&apos;s Talk <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
    </m.header>
  );
}

export default Navbar;
