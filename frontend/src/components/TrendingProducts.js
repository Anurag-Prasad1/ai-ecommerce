import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import API_URL from "../config";

import ProductCard from "./ProductCard";

function TrendingProducts() {

  const [products, setProducts] =
    useState([]);

  useEffect(() => {

    const fetchTrending =
      async () => {

        const { data } =
          await axios.get(
            `${API_URL}/api/products/trending/products`
          );

        setProducts(data);
      };

    fetchTrending();

  }, []);

  return (
    <div>

      {products.length > 0 && (

        <>

          <h2 className="section-title">
  🔥 Trending Products
</h2>

          <div className="trending-grid">

            {products.map((product) => (

              <ProductCard
                key={product._id}
                product={product}
              />

            ))}

          </div>

        </>

      )}

    </div>
  );
}

export default TrendingProducts;