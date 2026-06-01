function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <img src="/src/assets/hero.png" alt="About" />
          </div>
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="about-description">I'm a passionate Full-Stack Developer with experience building modern web applications.</p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Exp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;