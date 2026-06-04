import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <div className="product-badge">
        🔥 Trending
      </div>

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