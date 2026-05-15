import { useEffect, useState } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";

import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  const location = useLocation();

  const keyword =
    new URLSearchParams(location.search).get(
      "keyword"
    );

  const category =
    new URLSearchParams(location.search).get(
      "category"
    );

  const minPrice =
    new URLSearchParams(location.search).get(
      "minPrice"
    );

  const maxPrice =
    new URLSearchParams(location.search).get(
      "maxPrice"
    );

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products?keyword=${
          keyword || ""
        }&category=${category || ""}&minPrice=${
          minPrice || ""
        }&maxPrice=${maxPrice || ""}`
      );

      setProducts(data.products || data);
    };

    fetchProducts();
  }, [keyword, category, minPrice, maxPrice]);

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