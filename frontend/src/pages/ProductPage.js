import {
  useEffect,
  useState,
  useContext,
} from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import { CartContext } from "../context/CartContext";

import { WishlistContext } from "../context/WishlistContext";

import ProductCard from "../components/ProductCard";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [
    recommendedProducts,
    setRecommendedProducts,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    addingToCart,
    setAddingToCart,
  ] = useState(false);

  const { addToCart } =
    useContext(CartContext);

  const {
    toggleWishlist,
    isWishlisted,
  } = useContext(
    WishlistContext
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const { data } =
          await axios.get(
            `http://localhost:5000/api/products/${id}`
          );

        setProduct(data);

        const recommendationData =
          await axios.get(
            `http://localhost:5000/api/products/${id}/recommendations`
          );

        setRecommendedProducts(
          recommendationData.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler =
    async () => {
      try {
        setAddingToCart(true);

        await addToCart(product);
      } catch (error) {
        console.error(error);
      } finally {
        setAddingToCart(false);
      }
    };

  if (loading) {
    return (
      <div className="container">
        <h2>
          Loading Product...
        </h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <h2>
          Product Not Found
        </h2>
      </div>
    );
  }

  const wishlisted =
    isWishlisted(product._id);

  return (
    <div className="container">
      <div className="product-page">
        <img
          src={product.image}
          alt={product.name}
        />

        <div>
          <h2>{product.name}</h2>

          <button
            className="product-wishlist-btn"
            onClick={() =>
              toggleWishlist(product)
            }
          >
            {wishlisted
              ? "❤️ Remove from Wishlist"
              : "🤍 Add to Wishlist"}
          </button>

          <p>
            {product.description}
          </p>

          {product.brand && (
            <p>
              <strong>
                Brand:
              </strong>{" "}
              {product.brand}
            </p>
          )}

          {product.category && (
            <p>
              <strong>
                Category:
              </strong>{" "}
              {product.category}
            </p>
          )}

          <h3>
            ₹{" "}
            {product.price.toLocaleString(
              "en-IN"
            )}
          </h3>

          <button
            onClick={
              addToCartHandler
            }
            disabled={
              addingToCart
            }
          >
            {addingToCart
              ? "Adding..."
              : "Add To Cart"}
          </button>
        </div>
      </div>

      {recommendedProducts.length >
        0 && (
        <>
          <h2>
            Recommended Products
          </h2>

          <div className="product-grid">
            {recommendedProducts.map(
              (product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductPage;