import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(data.products || data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductList;