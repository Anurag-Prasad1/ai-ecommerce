function AILoadingSpinner({
  text = "AI is thinking...",
}) {
  return (
    <div className="ai-loading">
      <div className="ai-loading-spinner"></div>

      <p>{text}</p>
    </div>
  );
}

export default AILoadingSpinner;