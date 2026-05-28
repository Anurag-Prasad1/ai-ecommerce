import {
  useState,
} from "react";

import axios from "axios";

import ProductCard from "./ProductCard";

function Chatbot() {
  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState("");

  const [products, setProducts] =
    useState([]);

  const sendMessage = async () => {
    try {
      if (!message.trim()) return;

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
    }

    catch (error) {
      setReply(
        "Chatbot server error."
      );
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
          setMessage(e.target.value)
        }
        onKeyDown={handleKeyPress}
      />

      <button onClick={sendMessage}>
        Send
      </button>

      {reply && <h3>{reply}</h3>}

      {products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Chatbot;