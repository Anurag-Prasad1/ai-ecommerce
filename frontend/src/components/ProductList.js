import { useEffect, useState } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";

import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  const location = useLocation();

  const keyword = new URLSearchParams(location.search).get("keyword");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products?keyword=${keyword || ""}`
      );

      setProducts(data.products || data);
    };

    fetchProducts();
  }, [keyword]);

  if (products.length === 0) {
    return <h2>No Products Found</h2>;
  }

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