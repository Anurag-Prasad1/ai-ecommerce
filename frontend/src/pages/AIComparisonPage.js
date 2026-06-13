import { useState } from "react";

import axios from "axios";

import {
  FaBalanceScale,
  FaExchangeAlt,
} from "react-icons/fa";

import API_URL from "../config";

import AIPageHeader from "../components/ai/AIPageHeader";

import AIResultCard from "../components/ai/AIResultCard";

import AIExampleChips from "../components/ai/AIExampleChips";

import AILoadingSpinner from "../components/ai/AILoadingSpinner";

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

  const comparisonExamples =
    [
      {
        label:
          "iPhone 15 Pro vs Samsung Galaxy S25",
        productA:
          "iPhone 15 Pro",
        productB:
          "Samsung Galaxy S25",
      },
      {
        label:
          "MacBook Air M4 vs Dell XPS 13",
        productA:
          "MacBook Air M4",
        productB:
          "Dell XPS 13",
      },
      {
        label:
          "Sony WH-1000XM5 vs AirPods Max",
        productA:
          "Sony WH-1000XM5",
        productB:
          "AirPods Max",
      },
      {
        label:
          "Apple Watch Series 10 vs Samsung Galaxy Watch 7",
        productA:
          "Apple Watch Series 10",
        productB:
          "Samsung Galaxy Watch 7",
      },
    ];

  const loadComparison =
    (label) => {
      const selected =
        comparisonExamples.find(
          (item) =>
            item.label === label
        );

      if (selected) {
        setProductA(
          selected.productA
        );

        setProductB(
          selected.productB
        );
      }
    };

  const swapProducts =
    () => {
      const temp = productA;

      setProductA(productB);

      setProductB(temp);
    };

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
            `${API_URL}/api/ai/compare-products`,
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
          <FaBalanceScale
            style={{
              marginRight:
                "10px",
            }}
          />
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
          type="button"
          className="ai-chip"
          onClick={
            swapProducts
          }
          style={{
            marginTop: "15px",
            marginBottom:
              "15px",
          }}
        >
          <FaExchangeAlt
            style={{
              marginRight:
                "8px",
            }}
          />
          Swap Products
        </button>

        <AIExampleChips
          examples={comparisonExamples.map(
            (item) =>
              item.label
          )}
          onSelect={
            loadComparison
          }
        />

        <button
          className="ai-generate-btn"
          onClick={
            compareHandler
          }
          disabled={loading}
        >
          ⚖️ Compare Products
        </button>

        {error && (
          <div className="ai-error">
            {error}
          </div>
        )}

        {loading && (
          <AILoadingSpinner
            text="Comparing products..."
          />
        )}
      </div>

      {!result &&
        !loading && (
          <div className="ai-empty-state">
            ⚖️

            <p>
              Compare two
              products side-by-side
              and get AI-powered
              recommendations,
              pros & cons,
              feature analysis,
              and buying advice.
            </p>
          </div>
        )}

      {result &&
        !loading && (
          <AIResultCard
            title="Comparison Result"
            content={result}
          />
        )}
    </div>
  );
}

export default AIComparisonPage;