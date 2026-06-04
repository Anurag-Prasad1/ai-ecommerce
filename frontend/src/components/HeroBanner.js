function HeroBanner() {
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
          Discover trending products, compare brands,
          get AI-powered buying recommendations,
          summarize reviews, and make confident
          purchase decisions instantly.
        </p>

        <div className="hero-buttons">
          <a
            href="#products-section"
            className="hero-btn-primary"
          >
            🛍️ Shop Now
          </a>

          <a
            href="#chatbot-section"
            className="hero-btn-secondary"
          >
            🤖 Try AI Assistant
          </a>
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