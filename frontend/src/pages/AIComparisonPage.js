import {
  useState,
} from "react";

import axios from "axios";

import ReactMarkdown from "react-markdown";

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
          "Failed to compare products."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="container">
      <h1>
        AI Product Comparison
      </h1>

      <div
        style={{
          maxWidth: "700px",
        }}
      >
        <input
          type="text"
          placeholder="Product A"
          value={productA}
          onChange={(e) =>
            setProductA(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Product B"
          value={productB}
          onChange={(e) =>
            setProductB(
              e.target.value
            )
          }
        />

        <button
          onClick={
            compareHandler
          }
          disabled={loading}
        >
          {loading
            ? "Comparing..."
            : "Compare Products"}
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
            Comparison Result
          </h2>

          <ReactMarkdown>
            {result}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default AIComparisonPage;