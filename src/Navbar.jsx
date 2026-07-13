function Navbar({ isDark, toggleDark }) {
  return (
    <nav className="navbar">
      <a className="nav-logo" href="#home">
        Isabella Atieno
      </a>
      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="dark-toggle" onClick={toggleDark}>
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;