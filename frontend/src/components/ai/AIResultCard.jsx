import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

function AIResultCard({
  title,
  content,
}) {
  const copyHandler =
    async () => {
      try {
        await navigator.clipboard.writeText(
          content
        );

        alert(
          "Copied successfully!"
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="ai-result-card">
      <div className="ai-result-header">
        <h2>{title}</h2>

        <button
          className="ai-copy-btn"
          onClick={copyHandler}
        >
          📋 Copy
        </button>
      </div>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default AIResultCard;