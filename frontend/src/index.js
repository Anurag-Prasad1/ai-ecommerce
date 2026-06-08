import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import App from "./App";

import CartProvider from "./context/CartContext";
import AuthProvider from "./context/AuthContext";

import WishlistProvider from "./context/WishlistContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#333",
                color: "#fff",
                fontSize: "15px",
                padding: "16px",
                borderRadius: "10px",
              },
            }}
          />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);