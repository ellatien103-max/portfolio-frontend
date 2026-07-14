import { useState } from 'react';

function Navbar({ isDark, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <a className="nav-logo" href="#home" onClick={closeMenu}>
        Isabella Atieno
      </a>

      <div className="navbar-controls">
        <button className="dark-toggle" onClick={toggleDark}>
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      <ul className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
        <li><a href="#home" onClick={closeMenu}>Home</a></li>
        <li><a href="#about" onClick={closeMenu}>About</a></li>
        <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
        <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;