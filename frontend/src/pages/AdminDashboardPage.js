import {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function AdminDashboardPage() {
  const [products, setProducts] =
    useState([]);

  const { userInfo } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  const createProductHandler =
    async () => {
      const { data } = await axios.post(
        "http://localhost:5000/api/products",
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setProducts([
        ...products,
        data,
      ]);
    };

  const deleteHandler = async (id) => {

    if (
      window.confirm(
        "Are you sure?"
      )
    ) {

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setProducts(
        products.filter(
          (product) =>
            product._id !== id
        )
      );
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <button
        onClick={createProductHandler}
      >
        Create Product
      </button>

      {products.map((product) => (
        <div
          key={product._id}
          className="cart-item"
        >
          <h3>{product.name}</h3>

          <p>
            ₹ {product.price}
          </p>

          <Link
            to={`/admin/product/${product._id}/edit`}
          >
            <button>Edit</button>
          </Link>

          <button
            onClick={() =>
              deleteHandler(product._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboardPage;