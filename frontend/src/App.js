import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

import "./styles.css";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <ProductList />
            </div>
          }
        />

        <Route
          path="/product/:id"
          element={<ProductPage />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />
      </Routes>
    </div>
  );
}

export default App;