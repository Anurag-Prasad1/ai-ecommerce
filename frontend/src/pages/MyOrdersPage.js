import {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import { AuthContext } from "../context/AuthContext";

function MyOrdersPage() {
  const [orders, setOrders] =
    useState([]);

  const { userInfo } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setOrders(data);
      } catch (error) {
        console.error(error);

        alert(
          "Failed to fetch orders ❌"
        );
      }
    };

    fetchOrders();
  }, [userInfo]);

  return (
    <div className="container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No orders found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="cart-item"
          >
            <h3>
              Order ID: {order._id}
            </h3>

            <p>
              Total: ₹{" "}
              {order.totalPrice.toLocaleString(
                "en-IN"
              )}
            </p>

            <p>
              Paid:{" "}
              {order.isPaid
                ? "Yes"
                : "No"}
            </p>

            <p>
              Ordered On:{" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString(
                "en-IN"
              )}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrdersPage;