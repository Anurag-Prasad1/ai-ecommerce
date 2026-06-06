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
        // Fetch current product
        const { data } =
          await axios.get(
            `http://localhost:5000/api/products/${id}`
          );

        setProduct(data);

        // Fetch recommended products
        const recommendationData =
          await axios.get(
            `http://localhost:5000/api/products/${id}/recommendations`
          );

        setRecommendedProducts(
          recommendationData.data
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
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

          <h3>
            ₹{" "}
            {product.price.toLocaleString(
              "en-IN"
            )}
          </h3>

          <button
            onClick={() =>
              addToCart(product)
            }
          >
            Add to Cart
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