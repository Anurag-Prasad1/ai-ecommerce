function HeroBanner() {
  const scrollToSection = (
    sectionId
  ) => {
    const section =
      document.getElementById(
        sectionId
      );

    if (!section) {
      return;
    }

    const navbar =
      document.querySelector(
        ".navbar"
      );

    const navbarHeight =
      navbar?.offsetHeight || 0;

    const sectionTop =
      section.getBoundingClientRect()
        .top +
      window.pageYOffset;

    window.scrollTo({
      top:
        sectionTop -
        navbarHeight -
        20,
      behavior: "smooth",
    });
  };

  return (
    <div className="hero-banner">
      <div className="hero-content">
        <span className="hero-badge">
          🚀 India's Smart AI Shopping Platform
        </span>

        <h1>
          Shop Smarter with
          <br />
          NovaCart AI
        </h1>

        <p>
          Discover trending products,
          compare brands, get AI-powered
          buying recommendations,
          summarize reviews, and make
          confident purchase decisions
          instantly.
        </p>

        <div className="hero-buttons">
          <button
            type="button"
            className="hero-btn-primary"
            onClick={() =>
              scrollToSection(
                "products-section"
              )
            }
          >
            🛍️ Shop Now
          </button>

          <button
            type="button"
            className="hero-btn-secondary"
            onClick={() =>
              scrollToSection(
                "chatbot-section"
              )
            }
          >
            🤖 Try AI Assistant
          </button>
        </div>
      </div>

      <div className="hero-stats">
        <div className="hero-stat-card">
          <h3>1000+</h3>
          <p>Products</p>
        </div>

        <div className="hero-stat-card">
          <h3>AI Powered</h3>
          <p>Recommendations</p>
        </div>

        <div className="hero-stat-card">
          <h3>24×7</h3>
          <p>Shopping Assistant</p>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;