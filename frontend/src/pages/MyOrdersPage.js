import {
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";

import axios from "axios";

import {
  FaCheckCircle,
  FaClock,
  FaCopy,
  FaBoxOpen,
  FaSearch,
  FaEye,
  FaShoppingBag,
  FaRupeeSign,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function MyOrdersPage() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filter, setFilter] =
    useState("all");

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

    if (userInfo?.token) {
      fetchOrders();
    }
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

  const filteredOrders =
    useMemo(() => {
      return orders.filter(
        (order) => {
          const matchesSearch =
            order._id
              .toLowerCase()
              .includes(
                searchTerm.toLowerCase()
              );

          const matchesFilter =
            filter === "all"
              ? true
              : filter === "paid"
              ? order.isPaid
              : !order.isPaid;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      orders,
      searchTerm,
      filter,
    ]);

  const totalOrders =
    orders.length;

  const totalSpend =
    orders.reduce(
      (acc, order) =>
        acc + order.totalPrice,
      0
    );

  const paidOrders =
    orders.filter(
      (order) => order.isPaid
    ).length;

  const averageOrderValue =
    totalOrders > 0
      ? Math.round(
          totalSpend /
            totalOrders
        )
      : 0;

  if (loading) {
    return (
      <div className="container">
        <h1>
          My Orders
        </h1>

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

      {/* Stats */}
      <div className="orders-stats">
        <div className="stat-card">
          <FaShoppingBag />

          <h3>
            {totalOrders}
          </h3>

          <p>
            Total Orders
          </p>
        </div>

        <div className="stat-card">
          <FaRupeeSign />

          <h3>
            ₹
            {totalSpend.toLocaleString(
              "en-IN"
            )}
          </h3>

          <p>
            Total Spend
          </p>
        </div>

        <div className="stat-card">
          <FaCheckCircle />

          <h3>
            {paidOrders}
          </h3>

          <p>
            Paid Orders
          </p>
        </div>

        <div className="stat-card">
          <FaBoxOpen />

          <h3>
            ₹
            {averageOrderValue.toLocaleString(
              "en-IN"
            )}
          </h3>

          <p>
            Avg Order Value
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="orders-toolbar">
        <div className="orders-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search Order ID..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />
        </div>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }
        >
          <option value="all">
            All Orders
          </option>

          <option value="paid">
            Paid Orders
          </option>

          <option value="pending">
            Pending Orders
          </option>
        </select>
      </div>

      {filteredOrders.length ===
      0 ? (
        <div className="empty-orders">
          <FaBoxOpen
            size={80}
          />

          <h2>
            No Orders Found
          </h2>

          <p>
            Try changing your
            search or filter.
          </p>
        </div>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map(
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

                <div
                  style={{
                    marginTop:
                      "20px",
                  }}
                >
                  <Link
                    to={`/order/${order._id}`}
                  >
                    <button className="view-order-btn">
                      <FaEye />
                      &nbsp;
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;