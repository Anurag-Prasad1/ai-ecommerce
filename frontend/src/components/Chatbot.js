import {
  useState,
} from "react";

import axios from "axios";

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

      // 🔥 Empty Input Handling
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
          "http://localhost:5000/api/chatbot",
          {
            message,
          }
        );

      setReply(data.reply);

      setProducts(data.products);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <h2>
        🤖 Shopping Assistant
      </h2>

      <input
        type="text"
        placeholder="Ask something..."
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
          : "Send"}
      </button>

      {loading && (
        <p>
          🤖 AI is thinking...
        </p>
      )}

      {reply && (
        <div className="chatbot-reply">
          <ReactMarkdown>
            {reply}
          </ReactMarkdown>
        </div>
      )}

      {products.length > 0 && (
        <div className="product-grid">
          {products.map(
            (product) => (
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
      )}
    </div>
  );
}

export default Chatbot;