function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">An</span>
            </h1>
            <p className="hero-subtitle">Full-Stack Developer | UI Designer | Problem Solver</p>
            <div className="hero-buttons">
              <a href="#portfolio" className="btn btn-primary btn-lg">
                View My Work
              </a>
              <a href="#contact" className="btn btn-outline btn-lg">
                Contact Me
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/src/assets/hero.png" alt="Hero" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;