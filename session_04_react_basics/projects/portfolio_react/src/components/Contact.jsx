function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">YourName</div>
          <p className="footer-tagline">Full-Stack Developer</p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="bi bi-github"></i>
            </a>
            <a href="#" className="social-link">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 YourName. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;