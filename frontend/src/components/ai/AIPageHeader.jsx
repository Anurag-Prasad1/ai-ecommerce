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
    </div>
  );
}

export default AIPageHeader;