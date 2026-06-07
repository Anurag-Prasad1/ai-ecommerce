import { useState } from "react";

import axios from "axios";

import AIPageHeader from "../components/ai/AIPageHeader";

import AIResultCard from "../components/ai/AIResultCard";

import AIExampleChips from "../components/ai/AIExampleChips";

import AILoadingSpinner from "../components/ai/AILoadingSpinner";

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

  const productExamples = [
    {
      name: "iPhone 15 Pro",
      category: "Smartphone",
      price: "129999",
    },
    {
      name: "Samsung Galaxy S25",
      category: "Smartphone",
      price: "89999",
    },
    {
      name: "MacBook Air M4",
      category: "Laptop",
      price: "114999",
    },
    {
      name: "Sony WH-1000XM5",
      category: "Headphones",
      price: "29999",
    },
  ];

  const loadExample =
    (product) => {
      setName(product.name);

      setCategory(
        product.category
      );

      setPrice(
        product.price
      );
    };

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

        <AIExampleChips
          examples={productExamples.map(
            (product) =>
              product.name
          )}
          onSelect={(name) => {
            const selected =
              productExamples.find(
                (product) =>
                  product.name ===
                  name
              );

            if (
              selected
            ) {
              loadExample(
                selected
              );
            }
          }}
        />

        <button
          className="ai-generate-btn"
          onClick={
            generateHandler
          }
          disabled={loading}
        >
          🚀 Generate Description
        </button>

        {error && (
          <div className="ai-error">
            {error}
          </div>
        )}

        {loading && (
          <AILoadingSpinner
            text="Generating product description..."
          />
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

      {result &&
        !loading && (
          <AIResultCard
            title="Generated Description"
            content={result}
          />
        )}
    </div>
  );
}

export default AIProductGeneratorPage;