function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <a href="#home" className="navbar-brand">
            <span>Your</span>
            <span className="brand-highlight">Name</span>
          </a>
          <div className="navbar-collapse">
            <ul className="navbar-nav">
              <li>
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="nav-link">
                  Skills
                </a>
              </li>
              <li>
                <a href="#portfolio" className="nav-link">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;