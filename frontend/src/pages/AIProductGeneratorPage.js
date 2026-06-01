import {
  useState,
} from "react";

import axios from "axios";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

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
    <div className="container">
      <h1>
        AI Product Generator
      </h1>

      <div
        style={{
          maxWidth: "700px",
        }}
      >
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

        <button
          onClick={
            generateHandler
          }
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Description"}
        </button>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "10px",
            }}
          >
            {error}
          </p>
        )}
      </div>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background:
              "#ffffff",
            borderRadius: "10px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>
            Generated Result
          </h2>

          <ReactMarkdown
            remarkPlugins={[
              remarkGfm,
            ]}
          >
            {result}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default AIProductGeneratorPage;