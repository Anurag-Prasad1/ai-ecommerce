import {
  useState,
} from "react";

import axios from "axios";

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

  const compareHandler =
    async () => {
      try {
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

        setResult(
          "Failed to compare products."
        );
      }
    };

  return (
    <div className="container">
      <h1>
        AI Product Comparison
      </h1>

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
      >
        Compare
      </button>

      <pre>{result}</pre>
    </div>
  );
}

export default AIComparisonPage;