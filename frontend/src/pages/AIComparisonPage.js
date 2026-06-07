import { useState } from "react";

import axios from "axios";

import AIPageHeader from "../components/ai/AIPageHeader";

import AIResultCard from "../components/ai/AIResultCard";

function AIComparisonPage() {
  const [
    productA,
    setProductA,
  ] = useState("");

  const [
    productB,
    setProductB,
  ] = useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const compareHandler =
    async () => {
      if (
        !productA.trim() ||
        !productB.trim()
      ) {
        setError(
          "Please enter both products."
        );

        return;
      }

      try {
        setLoading(true);

        setError("");

        setResult("");

        const { data } =
          await axios.post(
            "http://localhost:5000/api/ai/compare-products",
            {
              productA,
              productB,
            }
          );

        setResult(
          data.result
        );
      } catch (error) {
        console.error(
          error
        );

        setError(
          error.response?.data
            ?.message ||
            "Failed to compare products."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="container ai-page-container">
      <AIPageHeader
        title="AI Product Comparison"
        subtitle="Compare products intelligently and get detailed AI-powered recommendations."
      />

      <div className="ai-form-card">
        <h2>
          Product Comparison
        </h2>

        <div className="ai-form-grid">
          <input
            type="text"
            placeholder="Enter Product A"
            value={productA}
            onChange={(e) =>
              setProductA(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Enter Product B"
            value={productB}
            onChange={(e) =>
              setProductB(
                e.target.value
              )
            }
          />
        </div>

        <button
          className="ai-generate-btn"
          onClick={
            compareHandler
          }
          disabled={loading}
        >
          {loading
            ? "⚖️ Comparing..."
            : "⚖️ Compare Products"}
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
            ⚖️

            <p>
              Compare two
              products and get
              an AI-powered
              recommendation.
            </p>
          </div>
        )}

      {result && (
        <AIResultCard
          title="Comparison Result"
          content={result}
        />
      )}
    </div>
  );
}

export default AIComparisonPage;