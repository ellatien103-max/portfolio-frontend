import { useState } from 'react';

function Navbar({ isDark, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick(e, id) {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 320);
  }

  return (
    <nav className="navbar">
      <a className="nav-logo" href="#home" onClick={(e) => handleNavClick(e, 'home')}>
        Isabella Atieno
      </a>

      <div className="nav-right">
        <ul className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
          <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
          <li><a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a></li>
          <li><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
        </ul>

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
    </nav>
  );
}

export default Navbar;