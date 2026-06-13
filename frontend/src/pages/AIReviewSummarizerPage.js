import { useState } from "react";

import axios from "axios";

import API_URL from "../config";

import { FaRobot } from "react-icons/fa";

import AIPageHeader from "../components/ai/AIPageHeader";

import AIResultCard from "../components/ai/AIResultCard";

import AILoadingSpinner from "../components/ai/AILoadingSpinner";

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
            `${API_URL}/api/ai/summarize-reviews`,
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
    <div className="container ai-page-container">
      <AIPageHeader
        title="AI Review Summarizer"
        subtitle="Analyze customer reviews instantly and discover overall sentiment, strengths, weaknesses, and buying signals."
      />

      <div className="ai-form-card">
        <h2>
          <FaRobot
            style={{
              marginRight:
                "10px",
            }}
          />
          Customer Reviews
        </h2>

        <textarea
          className="ai-review-textarea"
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
        />

        <button
          className="ai-generate-btn"
          onClick={
            summarizeHandler
          }
          disabled={loading}
        >
          📊 Summarize Reviews
        </button>

        {error && (
          <div className="ai-error">
            {error}
          </div>
        )}

        {loading && (
          <AILoadingSpinner
            text="Analyzing customer reviews..."
          />
        )}
      </div>

      {!result &&
        !loading && (
          <div className="ai-empty-state">
            📊

            <p>
              Paste customer
              reviews to receive
              AI-powered sentiment
              analysis, pros,
              cons, and summary.
            </p>
          </div>
        )}

      {result &&
        !loading && (
          <AIResultCard
            title="AI Review Analysis"
            content={result}
          />
        )}
    </div>
  );
}

export default AIReviewSummarizerPage;