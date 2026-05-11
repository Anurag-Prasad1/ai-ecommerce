import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="product-page">
      <div className="product-page-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-page-details">
        <h1>{product.name}</h1>

        <h2>
          ₹ {product.price.toLocaleString("en-IN")}
        </h2>

        <p className="product-description">
          {product.description}
        </p>

        <p className="product-stock">
          Stock: {product.countInStock}
        </p>

        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductPage;