import {
  useEffect,
  useState,
  useContext,
} from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import { CartContext } from "../context/CartContext";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="product-page">
      <img
        src={product.image}
        alt={product.name}
      />

      <div>
        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <h3>
          ₹{" "}
          {product.price.toLocaleString("en-IN")}
        </h3>

        <button
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductPage;