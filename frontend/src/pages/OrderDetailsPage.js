import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import axios from "axios";

import {
  FaCheckCircle,
  FaClock,
  FaBox,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

import CheckoutSteps from "../components/CheckoutSteps";

function OrderDetailsPage() {
  const { id } = useParams();

  const { userInfo } =
    useContext(AuthContext);

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchOrder =
      async () => {
        try {
          const { data } =
            await axios.get(
              `http://localhost:5000/api/orders/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${userInfo.token}`,
                },
              }
            );

          setOrder(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchOrder();
  }, [id, userInfo]);

  if (loading) {
    return (
      <div className="container">
        <h2>
          Loading Order...
        </h2>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container">
        <h2>
          Order Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="container">
      <CheckoutSteps
        step1={true}
        step2={true}
        step3={true}
        step4={true}
      />

      <div className="order-details-page">
        <div className="order-header">
          <h1>
            Order Details
          </h1>

          <p>
            Order ID:
            {" "}
            {order._id}
          </p>
        </div>

        {/* Timeline */}
        <div className="order-timeline">
          <div className="timeline-item completed">
            <FaCheckCircle />
            <span>
              Order Placed
            </span>
          </div>

          <div className="timeline-item completed">
            <FaCheckCircle />
            <span>
              Payment Received
            </span>
          </div>

          <div className="timeline-item completed">
            <FaBox />
            <span>
              Processing
            </span>
          </div>

          <div className="timeline-item pending">
            <FaClock />
            <span>
              Shipped
            </span>
          </div>

          <div className="timeline-item pending">
            <FaClock />
            <span>
              Delivered
            </span>
          </div>
        </div>

        {/* Shipping */}
        <div className="order-section">
          <h2>
            Shipping Address
          </h2>

          <p>
            {
              order
                .shippingAddress
                ?.address
            }
          </p>

          <p>
            {
              order
                .shippingAddress
                ?.city
            }
          </p>

          <p>
            {
              order
                .shippingAddress
                ?.postalCode
            }
          </p>

          <p>
            {
              order
                .shippingAddress
                ?.country
            }
          </p>
        </div>

        {/* Items */}
        <div className="order-section">
          <h2>
            Ordered Items
          </h2>

          {order.orderItems.map(
            (item, index) => (
              <div
                key={index}
                className="order-product-row"
              >
                <div className="order-item-image-box">
  <img
    src={item.image}
    alt={item.name}
    className="order-item-image"
  />
</div>

                <div>
                  <h4>
                    {item.name}
                  </h4>

                  <p>
                    Qty:
                    {" "}
                    {item.qty}
                  </p>
                </div>

                <strong>
                  ₹
                  {item.price.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>
            )
          )}
        </div>

        {/* Summary */}
        <div className="order-summary-card">
          <h2>
            Payment Summary
          </h2>

          <div className="summary-row">
            <span>
              Order Total
            </span>

            <strong>
              ₹
              {order.totalPrice?.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div className="summary-row">
            <span>
              Payment Status
            </span>

            <span
              className="paid-badge"
            >
              Paid
            </span>
          </div>
        </div>

        <Link to="/myorders">
          <button
            className="orders-btn"
            style={{
              marginTop:
                "20px",
            }}
          >
            Back To Orders
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderDetailsPage;