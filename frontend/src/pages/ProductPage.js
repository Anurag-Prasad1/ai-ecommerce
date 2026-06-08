import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { CartContext } from "../context/CartContext";

import { WishlistContext } from "../context/WishlistContext";

import { AuthContext } from "../context/AuthContext";

import ProductCard from "../components/ProductCard";

function ProductPage() {
  const { id } = useParams();

  const navigate =
    useNavigate();

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

  const { userInfo } =
    useContext(AuthContext);

  const {
    toggleWishlist,
    isWishlisted,
  } = useContext(
    WishlistContext
  );

  useEffect(() => {
    const fetchProduct =
      async () => {
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
      if (!userInfo) {
        toast.error(
          "Please login to add products to cart"
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);

        return;
      }

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
        <div
          className="product-page"
          style={{
            gap: "40px",
          }}
        >
          <Skeleton
            height={420}
            width={420}
          />

          <div
            style={{
              flex: 1,
            }}
          >
            <Skeleton
              height={40}
              width="70%"
            />

            <br />

            <Skeleton
              count={4}
            />

            <br />

            <Skeleton
              height={30}
              width="30%"
            />

            <br />

            <Skeleton
              height={50}
              width={180}
            />
          </div>
        </div>
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
        <div className="product-image-container">
  <img
    src={product.image}
    alt={product.name}
    className="product-main-image"
  />
</div>

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

          <div
            style={{
              margin:
                "15px 0",
              fontWeight:
                "600",
              fontSize:
                "16px",
            }}
          >
            {product.countInStock >
            0 ? (
              <span
                style={{
                  color:
                    "#16a34a",
                }}
              >
                ✅ In Stock
              </span>
            ) : (
              <span
                style={{
                  color:
                    "#dc2626",
                }}
              >
                ❌ Out Of Stock
              </span>
            )}
          </div>

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
              addingToCart ||
              product.countInStock ===
                0
            }
          >
            {product.countInStock ===
            0
              ? "Out Of Stock"
              : addingToCart
              ? "Adding..."
              : "Add To Cart"}
          </button>
        </div>
      </div>

      {recommendedProducts.length >
        0 && (
        <>
          <h2
            style={{
              marginTop:
                "50px",
            }}
          >
            Recommended Products
          </h2>

          <div className="product-grid">
            {recommendedProducts.map(
              (product) => (
                <ProductCard
                  key={
                    product._id
                  }
                  product={
                    product
                  }
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