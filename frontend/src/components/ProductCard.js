import { Link } from "react-router-dom";

import { useContext } from "react";

import { WishlistContext } from "../context/WishlistContext";

function ProductCard({ product }) {
  const {
    toggleWishlist,
    isWishlisted,
  } = useContext(
    WishlistContext
  );

  const wishlisted =
    isWishlisted(
      product._id
    );

  return (
    <div className="product-card">
      <div className="product-badge">
        🔥 Trending
      </div>

      <button
        className="wishlist-btn"
        onClick={() =>
          toggleWishlist(
            product
          )
        }
      >
        {wishlisted
          ? "❤️"
          : "🤍"}
      </button>

      <img
        src={product.image}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <div className="product-rating">
        ⭐⭐⭐⭐⭐
      </div>

      <p>
        ₹{" "}
        {product.price.toLocaleString(
          "en-IN"
        )}
      </p>

      <div className="delivery-tag">
        🚚 Fast Delivery
      </div>

      <Link
        to={`/product/${product._id}`}
      >
        <button>
          View Details
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;