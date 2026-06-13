import { useEffect, useState } from "react";
import axios from "axios";

import {
  useLocation,
  Link,
} from "react-router-dom";

import ProductCard from "./ProductCard";

import API_URL from "../config";

function ProductList() {
  const [products, setProducts] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [pages, setPages] =
    useState(1);

  const location =
    useLocation();

  const keyword =
    new URLSearchParams(
      location.search
    ).get("keyword");

  const category =
    new URLSearchParams(
      location.search
    ).get("category");

  const minPrice =
    new URLSearchParams(
      location.search
    ).get("minPrice");

  const maxPrice =
    new URLSearchParams(
      location.search
    ).get("maxPrice");

  const pageNumber =
    new URLSearchParams(
      location.search
    ).get("pageNumber") || 1;

  useEffect(() => {
    const fetchProducts =
      async () => {
        const { data } =
          await axios.get(
            `${API_URL}/api/products?keyword=${
              keyword || ""
            }&category=${
              category || ""
            }&minPrice=${
              minPrice || ""
            }&maxPrice=${
              maxPrice || ""
            }&pageNumber=${pageNumber}`
          );

        setProducts(
          data.products || data
        );

        setPage(data.page);

        setPages(data.pages);
      };

    fetchProducts();
  }, [
    keyword,
    category,
    minPrice,
    maxPrice,
    pageNumber,
  ]);

  if (products.length === 0) {
    return <h2>No Products Found</h2>;
  }

  return (
    <>
      {keyword && (
        <div className="search-results-header">
          <h2>
            Search Results for "
            {keyword}
            "
          </h2>
        </div>
      )}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

      <div className="pagination">
        {page > 1 && (
          <Link
            to={`/?keyword=${
              keyword || ""
            }&category=${
              category || ""
            }&minPrice=${
              minPrice || ""
            }&maxPrice=${
              maxPrice || ""
            }&pageNumber=${
              page - 1
            }`}
          >
            <button>
              Prev
            </button>
          </Link>
        )}

        {[...Array(pages).keys()].map(
          (x) => (
            <Link
              key={x + 1}
              to={`/?keyword=${
                keyword || ""
              }&category=${
                category || ""
              }&minPrice=${
                minPrice || ""
              }&maxPrice=${
                maxPrice || ""
              }&pageNumber=${
                x + 1
              }`}
            >
              <button
                className={
                  x + 1 ===
                  Number(page)
                    ? "active-page"
                    : ""
                }
              >
                {x + 1}
              </button>
            </Link>
          )
        )}

        {page < pages && (
          <Link
            to={`/?keyword=${
              keyword || ""
            }&category=${
              category || ""
            }&minPrice=${
              minPrice || ""
            }&maxPrice=${
              maxPrice || ""
            }&pageNumber=${
              page + 1
            }`}
          >
            <button>
              Next
            </button>
          </Link>
        )}
      </div>
    </>
  );
}

export default ProductList;