import { useState } from "react";

import axios from "axios";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

function AIReviewSummarizerPage() {
  const [reviews, setReviews] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const summarizeHandler =
    async () => {
      if (!reviews.trim()) {
        setError(
          "Please enter some reviews."
        );

        return;
      }

      try {
        setLoading(true);

        setError("");

        setResult("");

        const { data } =
          await axios.post(
            "http://localhost:5000/api/ai/summarize-reviews",
            {
              reviews,
            }
          );

        setResult(data.result);
      } catch (err) {
        if (
          err?.response?.status === 429
        ) {
          setError(
            "⚠️ AI usage limit reached temporarily. Please wait a minute and try again."
          );
        } else if (
          err?.response?.status === 503
        ) {
          setError(
            "⚠️ AI service is currently experiencing heavy traffic. Please try again shortly."
          );
        } else {
          setError(
            err?.response?.data
              ?.message ||
              "Failed to summarize reviews."
          );
        }
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="container">
      <div
        style={{
          maxWidth: "950px",
          margin: "40px auto",
        }}
      >
        <h1>
          🤖 AI Review Summarizer
        </h1>

        <p>
          Paste customer reviews and
          let AI generate an overall
          summary, pros, cons, and
          sentiment analysis.
        </p>

        <textarea
          rows="10"
          placeholder={`Example:

Great battery life.
Excellent display quality.
Camera is average.
Phone gets warm while gaming.
Fast charging is amazing.`}
          value={reviews}
          onChange={(e) =>
            setReviews(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "15px",
            marginBottom:
              "15px",
            boxSizing:
              "border-box",
            borderRadius:
              "8px",
            resize: "vertical",
          }}
        />

        <button
          onClick={
            summarizeHandler
          }
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : "Summarize Reviews"}
        </button>

        {error && (
          <div
            style={{
              marginTop:
                "20px",
              color: "red",
              fontWeight:
                "bold",
            }}
          >
            {error}
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop:
                "5px",
            }}
          >
            <h2>
              AI Analysis
            </h2>

            <div
              className="markdown-content"
              style={{
                background:
                  "#f4f4f4",
                padding:
                  "20px",
                borderRadius:
                  "8px",
              }}
            >
              <ReactMarkdown
                remarkPlugins={[
                  remarkGfm,
                ]}
              >
                {result}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIReviewSummarizerPage;