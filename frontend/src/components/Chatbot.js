import {
  useState,
} from "react";

import axios from "axios";
import API_URL from "../config";
import ReactMarkdown
  from "react-markdown";

import ProductCard
  from "./ProductCard";

function Chatbot() {
  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState("");

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const sendMessage = async () => {
    try {

      if (!message.trim()) {
        setReply(
          "👋 Please enter a product keyword like mobiles, laptops, shoes, Samsung, Nike, etc."
        );

        setProducts([]);

        return;
      }

      setLoading(true);

      const { data } =
        await axios.post(
          `${API_URL}/api/chatbot`,
          {
            message,
          }
        );

      setReply(data.reply);

      setProducts(
        data.products
      );

      setMessage("");

      setLoading(false);
    }

    catch (error) {

      setLoading(false);

      setReply(
        "Chatbot server error."
      );

      setProducts([]);
    }
  };

  const handleKeyPress = (
    e
  ) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">

      <h2 className="section-title">
        🤖 NovaCart AI Shopping Assistant
      </h2>

      <p
        style={{
          marginBottom:
            "18px",
          color: "#555",
          fontSize: "16px",
        }}
      >
        Get AI-powered shopping
        recommendations,
        comparisons and buying
        advice instantly.
      </p>

      {/* Suggested Prompts */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() =>
            setMessage(
              "Best phone under 30000"
            )
          }
        >
          📱 Best Phone
        </button>

        <button
          onClick={() =>
            setMessage(
              "Best laptop for coding"
            )
          }
        >
          💻 Laptop
        </button>

        <button
          onClick={() =>
            setMessage(
              "Best shoes under 5000"
            )
          }
        >
          👟 Shoes
        </button>

        <button
          onClick={() =>
            setMessage(
              "Compare iPhone and Samsung"
            )
          }
        >
          ⚖️ Compare
        </button>
      </div>

      <input
        type="text"
        placeholder="Ask AI anything about products..."
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }
        onKeyDown={
          handleKeyPress
        }
      />

      <button
        onClick={sendMessage}
        disabled={loading}
      >
        {loading
          ? "Thinking..."
          : "Ask AI"}
      </button>

      {loading && (
        <p className="chatbot-loading">
          🤖 AI is thinking...
        </p>
      )}

      {reply && (
        <div className="chatbot-reply">
          <div className="chatbot-reply-header">
            🤖 NovaCart AI
          </div>

          <ReactMarkdown>
            {reply}
          </ReactMarkdown>
        </div>
      )}

      {products.length > 0 && (
        <>
          <h3
            style={{
              marginTop:
                "30px",
            }}
          >
            Recommended Products
          </h3>

          <div className="product-grid">
            {products.map(
              (
                product
              ) => (
                <ProductCard
                  key={
                    product._id
                  }
                  product={
                    product
                  }
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Chatbot;