import {
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import {
  FaCheckCircle,
  FaClock,
  FaCopy,
  FaBoxOpen,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

function MyOrdersPage() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { userInfo } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchOrders =
      async () => {
        try {
          const { data } =
            await axios.get(
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
        } finally {
          setLoading(false);
        }
      };

    fetchOrders();
  }, [userInfo]);

  const copyOrderId =
    async (id) => {
      try {
        await navigator.clipboard.writeText(
          id
        );

        alert(
          "Order ID copied"
        );
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <div className="container">
        <h1>My Orders</h1>

        <p>
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="orders-header">
        <h1>
          My Orders
        </h1>

        <p>
          Track and manage
          your purchases
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <FaBoxOpen
            size={80}
          />

          <h2>
            No Orders Yet
          </h2>

          <p>
            Looks like you
            haven't placed
            any orders yet.
          </p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(
            (order) => (
              <div
                key={
                  order._id
                }
                className="order-card"
              >
                <div className="order-top">
                  <div>
                    <h3>
                      Order
                    </h3>

                    <p className="order-id">
                      {order._id}
                    </p>
                  </div>

                  <button
                    className="copy-btn"
                    onClick={() =>
                      copyOrderId(
                        order._id
                      )
                    }
                  >
                    <FaCopy />
                  </button>
                </div>

                <div className="order-status-row">
                  <span
                    className={
                      order.isPaid
                        ? "paid-badge"
                        : "pending-badge"
                    }
                  >
                    {order.isPaid ? (
                      <>
                        <FaCheckCircle />
                        Paid
                      </>
                    ) : (
                      <>
                        <FaClock />
                        Pending
                      </>
                    )}
                  </span>
                </div>

                <div className="order-details">
                  <p>
                    <strong>
                      Ordered:
                    </strong>{" "}
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString(
                      "en-IN"
                    )}
                  </p>

                  <p>
                    <strong>
                      Total:
                    </strong>{" "}
                    ₹
                    {order.totalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p>
                    <strong>
                      Items:
                    </strong>{" "}
                    {order.orderItems
                      ?.length ||
                      0}
                  </p>
                </div>

                {order.orderItems
                  ?.length >
                  0 && (
                  <div className="order-products">
                    {order.orderItems
                      .slice(
                        0,
                        4
                      )
                      .map(
                        (
                          item,
                          index
                        ) => (
                          <img
                            key={
                              index
                            }
                            src={
                              item.image
                            }
                            alt={
                              item.name
                            }
                            title={
                              item.name
                            }
                          />
                        )
                      )}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;