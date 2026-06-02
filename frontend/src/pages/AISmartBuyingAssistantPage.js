import { useState } from "react";

import axios from "axios";

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
    <div className="container">
      <h1>
        🤖 Smart Buying Assistant
      </h1>

      <p>
        Describe your requirements and
        let AI recommend the best
        products available in NovaCart.
      </p>

      <textarea
        rows="6"
        placeholder={`Examples:

Suggest a laptop for machine learning under ₹70,000

Recommend a gaming phone under ₹30,000

Need wireless earbuds with good battery life`}
        value={query}
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      />

      <button
        onClick={askHandler}
        disabled={loading}
      >
        {loading
          ? "Analyzing..."
          : "Ask AI"}
      </button>

      {error && (
        <div
          style={{
            marginTop: "20px",
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
            marginTop: "25px",
          }}
        >
          <h2>
            AI Recommendation
          </h2>

          <pre
            style={{
              whiteSpace:
                "pre-wrap",
              background:
                "#f4f4f4",
              padding: "15px",
              borderRadius:
                "8px",
              overflowX:
                "auto",
            }}
          >
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AISmartBuyingAssistantPage;