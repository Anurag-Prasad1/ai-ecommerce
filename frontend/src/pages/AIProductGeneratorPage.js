import {
  useState,
} from "react";

import axios from "axios";

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

  const generateHandler =
    async () => {
      try {
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

        setResult(
          "Failed to generate product description."
        );
      }
    };

  return (
    <div className="container">
      <h1>
        AI Product Generator
      </h1>

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
      >
        Generate
      </button>

      <pre>{result}</pre>
    </div>
  );
}

export default AIProductGeneratorPage;