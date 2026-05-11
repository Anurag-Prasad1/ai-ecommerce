import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

import ProductPage from "./pages/ProductPage";

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
      </Routes>
    </div>
  );
}

export default App;