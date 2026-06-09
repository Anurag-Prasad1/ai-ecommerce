import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  FaCheckCircle,
  FaClock,
  FaBox,
  FaMapMarkerAlt,
  FaTruck,
  FaCreditCard,
  FaArrowLeft,
  FaCalendarAlt,
  FaRedo,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

import { CartContext } from "../context/CartContext";

import CheckoutSteps from "../components/CheckoutSteps";

function OrderDetailsPage() {
  const { id } = useParams();

  const { userInfo } =
  useContext(AuthContext);

const navigate =
  useNavigate();

const { addToCart } =
  useContext(CartContext);

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

  const estimatedDate =
    new Date(
      new Date(
        order.createdAt
      ).getTime() +
        5 *
          24 *
          60 *
          60 *
          1000
    ).toLocaleDateString(
      "en-IN"
    );

  const getStatusIndex =
    () => {
      switch (
        order.orderStatus
      ) {
        case "Delivered":
          return 5;

        case "Shipped":
          return 4;

        case "Processing":
        default:
          return 3;
      }
    };

  const currentStep =
    getStatusIndex();

  const buyAgainHandler =
  async () => {
    try {
      for (const item of order.orderItems) {
        await addToCart({
          _id:
            item.product?._id ||
            item.product,
          name: item.name,
        });
      }

      navigate("/cart");
    } catch (error) {
      console.error(error);
    }
  };

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
  <div className="order-title-section">
    <div className="title-row">
      <h1>
        Order Details
      </h1>

      <span
        className={`status-badge ${
          order.orderStatus?.toLowerCase() ||
          "processing"
        }`}
      >
        {order.orderStatus ||
          "Processing"}
      </span>
    </div>

    <p className="order-detail-id">
      Order ID: {order._id}
    </p>
  </div>
</div>

        {/* Dynamic Timeline */}

        <div className="order-timeline">
          <div
            className={`timeline-item ${
              currentStep >= 1
                ? "completed"
                : "pending"
            }`}
          >
            <FaCheckCircle />
            <span>
              Order Placed
            </span>
          </div>

          <div
            className={`timeline-item ${
              currentStep >= 2
                ? "completed"
                : "pending"
            }`}
          >
            <FaCheckCircle />
            <span>
              Payment Received
            </span>
          </div>

          <div
            className={`timeline-item ${
              currentStep >= 3
                ? "completed"
                : "pending"
            }`}
          >
            <FaBox />
            <span>
              Processing
            </span>
          </div>

          <div
            className={`timeline-item ${
              currentStep >= 4
                ? "completed"
                : "pending"
            }`}
          >
            <FaTruck />
            <span>
              Shipped
            </span>
          </div>

          <div
            className={`timeline-item ${
              currentStep >= 5
                ? "completed"
                : "pending"
            }`}
          >
            <FaCheckCircle />
            <span>
              Delivered
            </span>
          </div>
        </div>

        {/* Info Cards */}

        <div className="order-info-grid">
          <div className="order-info-card">
            <FaTruck className="info-icon" />

            <h3>
              Estimated Delivery
            </h3>

            <p>
              {estimatedDate}
            </p>
          </div>

          <div className="order-info-card">
            <FaCreditCard className="info-icon" />

            <h3>
              Payment
            </h3>

            <p>
              Successful
            </p>
          </div>

          <div className="order-info-card">
            <FaBox className="info-icon" />

            <h3>
              Items
            </h3>

            <p>
              {
                order.orderItems
                  ?.length
              }{" "}
              Products
            </p>
          </div>

          <div className="order-info-card">
            <FaCalendarAlt className="info-icon" />

            <h3>
              Order Date
            </h3>

            <p>
              {new Date(
                order.createdAt
              ).toLocaleDateString(
                "en-IN"
              )}
            </p>
          </div>
        </div>

        {/* Shipping */}

        <div className="order-section modern-card">
          <h2>
            <FaMapMarkerAlt />
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

        {/* Ordered Products */}

        <div className="order-section">
          <h2>
            Ordered Items
          </h2>

          <div className="ordered-products-list">
            {order.orderItems.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="ordered-product-card"
                >
                  <div className="order-item-image-box">
                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.name
                      }
                      className="order-item-image"
                    />
                  </div>

                  <div className="ordered-product-content">
                    <h4>
                      {
                        item.name
                      }
                    </h4>

                    <p>
                      Qty:{" "}
                      {
                        item.qty
                      }
                    </p>
                  </div>

                  <div className="ordered-product-price">
                    ₹
                    {item.price.toLocaleString(
                      "en-IN"
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Summary */}

        <div className="order-summary-card">
          <h2>
            Payment Summary
          </h2>

          <div className="summary-row">
            <span>
              Subtotal
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
              Shipping
            </span>

            <strong>
              FREE
            </strong>
          </div>

          <div className="summary-row">
            <span>
              Tax
            </span>

            <strong>
              ₹0
            </strong>
          </div>

          <hr />

          <div className="summary-row total-row">
            <span>
              Total
            </span>

            <strong>
              ₹
              {order.totalPrice?.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
  className="orders-btn"
  onClick={buyAgainHandler}
>
  <FaRedo />
  Buy Again
</button>

          <Link to="/myorders">
            <button className="orders-btn">
              <FaArrowLeft />
              Back To Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;