import { useState } from "react";

import axios from "axios";

import AIPageHeader from "../components/ai/AIPageHeader";

import AIResultCard from "../components/ai/AIResultCard";

function AIProductGeneratorPage() {
  const [name, setName] =
    useState("");

  const [
    category,
    setCategory,
  ] = useState("");

  const [price, setPrice] =
    useState("");

  const [result, setResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const generateHandler =
    async () => {
      if (
        !name.trim() ||
        !category.trim() ||
        !price
      ) {
        setError(
          "Please fill all fields."
        );

        return;
      }

      try {
        setLoading(true);

        setError("");

        setResult("");

        const { data } =
          await axios.post(
            "http://localhost:5000/api/ai/generate-description",
            {
              name,
              category,
              price,
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
            "Failed to generate product description."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="container ai-page-container">
      <AIPageHeader
        title="AI Product Generator"
        subtitle="Generate high-converting product descriptions instantly using NovaCart AI."
      />

      <div className="ai-form-card">
        <h2>
          Product Information
        </h2>

        <div className="ai-form-grid">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
          />
        </div>

        <button
          className="ai-generate-btn"
          onClick={
            generateHandler
          }
          disabled={loading}
        >
          {loading
            ? "✨ Generating..."
            : "🚀 Generate Description"}
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
            🤖

            <p>
              Generate your
              first AI product
              description.
            </p>
          </div>
        )}

      {result && (
        <AIResultCard
          title="Generated Description"
          content={result}
        />
      )}
    </div>
  );
}

export default AIProductGeneratorPage;