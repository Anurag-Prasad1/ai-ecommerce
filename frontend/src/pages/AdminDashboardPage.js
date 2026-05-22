import {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

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

  const deleteHandler = async (id) => {
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
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {products.map((product) => (
        <div
          key={product._id}
          className="cart-item"
        >
          <h3>{product.name}</h3>

          <p>
            ₹ {product.price}
          </p>

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