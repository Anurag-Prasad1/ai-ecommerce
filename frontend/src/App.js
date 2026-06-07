import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import HeroBanner from "./components/HeroBanner";

import ProductList from "./components/ProductList";

import TrendingProducts from "./components/TrendingProducts";

import Chatbot from "./components/Chatbot";

import ProductPage from "./pages/ProductPage";

import CartPage from "./pages/CartPage";

import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import ShippingPage from "./pages/ShippingPage";

import PlaceOrderPage from "./pages/PlaceOrderPage";

import MyOrdersPage from "./pages/MyOrdersPage";

import AdminDashboardPage from "./pages/AdminDashboardPage";

import ProductEditPage from "./pages/ProductEditPage";

import AIProductGeneratorPage from "./pages/AIProductGeneratorPage";

import AIComparisonPage from "./pages/AIComparisonPage";

import AIReviewSummarizerPage from "./pages/AIReviewSummarizerPage";

import AISmartBuyingAssistantPage from "./pages/AISmartBuyingAssistantPage";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminRoute from "./components/AdminRoute";

import "./styles.css";

function App() {
  const location =
    useLocation();

  const keyword =
    new URLSearchParams(
      location.search
    ).get("keyword");

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              {!keyword && (
                <>
                  <HeroBanner />

                  <TrendingProducts />
                </>
              )}

              <div id="products-section">
                <ProductList />
              </div>

              {!keyword && (
                <div id="chatbot-section">
                  <Chatbot />
                </div>
              )}
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
          path="/myorders"
          element={
            <ProtectedRoute>
              <MyOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/product/:id/edit"
          element={
            <AdminRoute>
              <ProductEditPage />
            </AdminRoute>
          }
        />

        <Route
          path="/ai-generator"
          element={
            <AIProductGeneratorPage />
          }
        />

        <Route
          path="/ai-comparison"
          element={
            <AIComparisonPage />
          }
        />

        <Route
          path="/ai-review-summary"
          element={
            <AIReviewSummarizerPage />
          }
        />

        <Route
          path="/ai-buying-assistant"
          element={
            <AISmartBuyingAssistantPage />
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