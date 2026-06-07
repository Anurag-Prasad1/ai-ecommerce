import { useState } from "react";

import axios from "axios";

import { FaRobot } from "react-icons/fa";

import AIPageHeader from "../components/ai/AIPageHeader";

import AIResultCard from "../components/ai/AIResultCard";

import AIExampleChips from "../components/ai/AIExampleChips";

function AISmartBuyingAssistantPage() {
  const [query, setQuery] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const askHandler =
    async () => {
      if (!query.trim()) {
        setError(
          "Please enter your buying requirement."
        );

        return;
      }

      try {
        setLoading(true);

        setError("");

        setResult("");

        const { data } =
          await axios.post(
            "http://localhost:5000/api/ai/buying-assistant",
            {
              query,
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
              "Failed to get AI recommendation."
          );
        }
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="container ai-page-container">
      <AIPageHeader
        title="Smart Buying Assistant"
        subtitle="Describe your needs and let NovaCart AI recommend the best products based on budget, features, and value."
      />

      <div className="ai-form-card">
        <h2>
          <FaRobot
            style={{
              marginRight:
                "10px",
            }}
          />
          Shopping Requirements
        </h2>

        <textarea
          className="ai-review-textarea"
          rows="6"
          placeholder={`Examples:

Suggest a laptop under ₹70,000

Recommend a gaming phone under ₹30,000

Need earbuds with long battery life

Best smartwatch for fitness tracking`}
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
        />

        <AIExampleChips
          examples={[
            "Suggest a laptop under ₹70,000",
            "Recommend a gaming phone under ₹30,000",
            "Need earbuds with long battery life",
            "Best smartwatch for fitness tracking",
          ]}
          onSelect={setQuery}
        />

        <button
          className="ai-generate-btn"
          onClick={askHandler}
          disabled={loading}
        >
          {loading
            ? "🤖 Analyzing Requirements..."
            : "🤖 Ask NovaCart AI"}
        </button>

        {error && (
          <div className="ai-error">
            {error}
          </div>
        )}
      </div>

      {!result &&
        !loading && (
          <div className="ai-empty-state">
            🛒

            <p>
              Tell NovaCart AI what
              you're looking for and
              receive personalized
              product recommendations,
              budget analysis, and
              buying guidance.
            </p>
          </div>
        )}

      {result && (
        <AIResultCard
          title="AI Recommendation"
          content={result}
        />
      )}
    </div>
  );
}

export default AISmartBuyingAssistantPage;