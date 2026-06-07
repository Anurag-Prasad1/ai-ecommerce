function AIPageHeader({
  title,
  subtitle,
}) {
  return (
    <div className="ai-page-header">
      <div className="ai-badge">
        🤖 NovaCart AI
      </div>

      <h1>{title}</h1>

      <p>{subtitle}</p>

      <div className="ai-stats-row">
        <div className="ai-stat">
          ⚡ AI Powered
        </div>

        <div className="ai-stat">
          🔥 Fast Results
        </div>

        <div className="ai-stat">
          🎯 Smart Insights
        </div>
      </div>
    </div>
  );
}

export default AIPageHeader;