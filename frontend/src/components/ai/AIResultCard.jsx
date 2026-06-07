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
          "Content copied successfully!"
        );
      } catch (error) {
        console.error(error);
      }
    };

  const downloadHandler =
    () => {
      const blob =
        new Blob(
          [content],
          {
            type: "text/plain;charset=utf-8",
          }
        );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download = `${title
        .toLowerCase()
        .replaceAll(
          " ",
          "-"
        )}.txt`;

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      window.URL.revokeObjectURL(
        url
      );
    };

  return (
    <div className="ai-result-card">
      <div className="ai-result-header">
        <h2>{title}</h2>

        <div className="ai-result-actions">
          <button
            className="ai-copy-btn"
            onClick={
              copyHandler
            }
          >
            📋 Copy
          </button>

          <button
            className="ai-download-btn"
            onClick={
              downloadHandler
            }
          >
            ⬇️ Download TXT
          </button>
        </div>
      </div>

      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
        ]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default AIResultCard;