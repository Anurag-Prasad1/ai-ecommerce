import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ShippingPage from "./pages/ShippingPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";

import ProtectedRoute from "./components/ProtectedRoute";

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
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <ShippingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/placeorder"
          element={
            <ProtectedRoute>
              <PlaceOrderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />
      </Routes>
    </div>
  );
}

export default App;