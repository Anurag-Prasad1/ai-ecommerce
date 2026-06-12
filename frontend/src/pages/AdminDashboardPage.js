import {
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBoxOpen,
  FaBoxes,
  FaLayerGroup,
  FaChartLine,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

import Swal from "sweetalert2";

function AdminDashboardPage() {
  const [products, setProducts] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortOption, setSortOption] =
  useState("newest");

  const [pageNumber, setPageNumber] =
  useState(1);

  const [pages, setPages] =
  useState(1);

  const { userInfo } =
    useContext(AuthContext);

  useEffect(() => {
  const fetchProducts = async () => {
    let sortQuery = "-createdAt";

    switch (sortOption) {
      case "price-low":
        sortQuery = "price";
        break;

      case "price-high":
        sortQuery = "-price";
        break;

      case "name-asc":
        sortQuery = "name";
        break;

      case "name-desc":
        sortQuery = "-name";
        break;

      case "oldest":
        sortQuery = "createdAt";
        break;

      default:
        sortQuery = "-createdAt";
    }

    const { data } =
      await axios.get(
        `http://localhost:5000/api/products?pageNumber=${pageNumber}&limit=10&keyword=${searchTerm}&category=${
          selectedCategory === "All"
            ? ""
            : selectedCategory
        }&sort=${sortQuery}`
      );

    setProducts(data.products);

    setPages(data.pages);
  };

  fetchProducts();
}, [
  pageNumber,
  searchTerm,
  selectedCategory,
  sortOption,
]);

  const createProductHandler =
  async () => {
    try {
      const { data } =
        await axios.post(
          "http://localhost:5000/api/products",
          {},
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

      setProducts((prev) => [
        ...prev,
        data,
      ]);

      Swal.fire({
        title: "Success!",
        text: "Product created successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to create product.",
        icon: "error",
      });
    }
  };

  const deleteHandler = async (id) => {
  const result = await Swal.fire({
    title: "Delete Product?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#ef4444",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    await axios.delete(
      `http://localhost:5000/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setProducts((prev) =>
      prev.filter(
        (product) =>
          product._id !== id
      )
    );

    Swal.fire({
      title: "Deleted!",
      text: "Product removed successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to delete product.",
      icon: "error",
    });
  }
};

  const categories = useMemo(() => {
    const uniqueCategories =
      products
        .map(
          (product) =>
            product.category
        )
        .filter(Boolean);

    return [
      "All",
      ...new Set(uniqueCategories),
    ];
  }, [products]);

  const filteredProducts =
  products;

  const totalInventory =
    products.reduce(
      (total, product) =>
        total +
        (product.countInStock ||
          0),
      0
    );

  const averagePopularity =
    products.length
      ? (
          products.reduce(
            (
              total,
              product
            ) =>
              total +
              (product.popularityScore ||
                0),
            0
          ) /
          products.length
        ).toFixed(1)
      : 0;

  const getStockStatus = (
    stock
  ) => {
    if (stock === 0) {
      return {
        label:
          "Out of Stock",
        className:
          "admin-stock-out",
      };
    }

    if (stock <= 10) {
      return {
        label: "Low Stock",
        className:
          "admin-stock-low",
      };
    }

    return {
      label: "In Stock",
      className:
        "admin-stock-good",
    };
  };

  return (
    <div className="container admin-dashboard">
      {/* Header */}

      <div className="admin-dashboard-header">
        <div>
          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage products,
            inventory and
            catalog.
          </p>
        </div>

        <button
          className="admin-create-btn"
          onClick={
            createProductHandler
          }
        >
          <FaPlus />
          Create Product
        </button>
      </div>

      {/* KPI Cards */}

      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <FaBoxes className="admin-kpi-icon" />

          <h3>
            {products.length}
          </h3>

          <p>
            Total Products
          </p>
        </div>

        <div className="admin-kpi-card">
          <FaLayerGroup className="admin-kpi-icon" />

          <h3>
            {
              categories.filter(
                (c) =>
                  c !== "All"
              ).length
            }
          </h3>

          <p>
            Categories
          </p>
        </div>

        <div className="admin-kpi-card">
          <FaBoxOpen className="admin-kpi-icon" />

          <h3>
            {totalInventory}
          </h3>

          <p>
            Inventory Units
          </p>
        </div>

        <div className="admin-kpi-card">
          <FaChartLine className="admin-kpi-icon" />

          <h3>
            {
              averagePopularity
            }
          </h3>

          <p>
            Avg Popularity
          </p>
        </div>
      </div>

      {/* Filters */}

      <div className="admin-toolbar">
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => {
  setSearchTerm(
    e.target.value
  );

  setPageNumber(1);
}}
    className="admin-search-input"
  />

  <select
    value={selectedCategory}
    onChange={(e) => {
  setSelectedCategory(
    e.target.value
  );

  setPageNumber(1);
}}
    className="admin-category-filter"
  >
    {categories.map(
      (category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      )
    )}
  </select>

  {/* NEW SORT DROPDOWN */}

  <select
    value={sortOption}
    onChange={(e) => {
  setSortOption(
    e.target.value
  );

  setPageNumber(1);
}}
    className="admin-category-filter"
  >
    <option value="newest">
      Newest First
    </option>

    <option value="oldest">
      Oldest First
    </option>

    <option value="price-low">
      Price: Low → High
    </option>

    <option value="price-high">
      Price: High → Low
    </option>

    <option value="name-asc">
      Name: A → Z
    </option>

    <option value="name-desc">
      Name: Z → A
    </option>
  </select>
</div>

      {/* Products Table */}

      <div className="admin-table-wrapper">
        <table className="admin-product-table">
          <thead>
            <tr>
              <th>
                Product
              </th>

              <th>
                Category
              </th>

              <th>
                Price
              </th>

              <th>
                Stock
              </th>

              <th>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length >
            0 ? (
              filteredProducts.map(
                (
                  product
                ) => {
                  const stockInfo =
                    getStockStatus(
                      product.countInStock
                    );

                  return (
                    <tr
                      key={
                        product._id
                      }
                    >
                      <td>
                        <div className="admin-product-info">
                          <div className="admin-product-image-wrapper">
  <img
    src={product.image}
    alt={product.name}
    className="admin-product-image"
  />
</div>

                          <div>
                            <h4>
                              {
                                product.name
                              }
                            </h4>

                            <span>
                              {
                                product.brand
                              }
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="admin-category-badge">
                          {product.category ||
                            "N/A"}
                        </span>
                      </td>

                      <td>
                        ₹
                        {product.price?.toLocaleString()}
                      </td>

                      <td>
                        <span
                          className={`admin-stock-badge ${stockInfo.className}`}
                        >
                          {
                            stockInfo.label
                          }
                        </span>
                      </td>

                      <td>
                        <div className="admin-actions">
                          <Link
                            to={`/admin/product/${product._id}/edit`}
                          >
                            <button className="admin-edit-btn">
                              <FaEdit />
                            </button>
                          </Link>

                          <button
                            className="admin-delete-btn"
                            onClick={() =>
                              deleteHandler(
                                product._id
                              )
                            }
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="admin-empty-state"
                >
                  <FaBoxOpen
                    size={50}
                  />

                  <h3>
                    No products
                    found
                  </h3>

                  <p>
                    Try adjusting
                    your search or
                    category filter.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="admin-pagination">
  {[...Array(pages).keys()].map(
    (page) => (
      <button
        key={page + 1}
        className={
          pageNumber === page + 1
            ? "admin-page-btn active"
            : "admin-page-btn"
        }
        onClick={() =>
          setPageNumber(page + 1)
        }
      >
        {page + 1}
      </button>
    )
  )}
</div>
    </div>
  );
}

export default AdminDashboardPage;