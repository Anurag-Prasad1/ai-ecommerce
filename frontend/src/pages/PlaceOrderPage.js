import {
  useContext,
  useState,
} from "react";

import axios from "axios";

import API_URL from "../config";

import {
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";

import { CartContext } from "../context/CartContext";

import { AuthContext } from "../context/AuthContext";

import CheckoutSteps from "../components/CheckoutSteps";

function PlaceOrderPage() {
  const {
    cartItems,
    shippingAddress,
    fetchCart,
  } = useContext(CartContext);

  const { userInfo } =
    useContext(AuthContext);

  const [loading, setLoading] =
    useState(false);

  const [orderSuccess, setOrderSuccess] =
    useState(null);

  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price * item.qty,
      0
    );

  const shippingPrice =
    totalPrice > 1000
      ? 0
      : 99;

  const taxPrice = 0;

  const finalTotal =
    totalPrice +
    shippingPrice +
    taxPrice;

  const paymentHandler =
    async () => {
      try {
        setLoading(true);

        const { data } =
          await axios.post(
            `${API_URL}/api/payments/create-order`,
            {
              amount:
                totalPrice,
            }
          );

        const options = {
          key:
            "rzp_test_SraRd60FDhsPEG",

          amount:
            data.amount,

          currency:
            data.currency,

          name:
            "NovaCart",

          description:
            "Thank you for shopping with NovaCart",

          order_id:
            data.id,

          handler:
            async function () {
              try {
                const formattedOrderItems =
                  cartItems.map(
                    (
                      item
                    ) => ({
                      name:
                        item.name,

                      qty:
                        item.qty,

                      image:
                        item.image,

                      price:
                        item.price,

                      product:
                        item.productId,
                    })
                  );

                const {
                  data:
                    orderData,
                } =
                  await axios.post(
                    `${API_URL}/api/orders`,
                    {
                      orderItems:
                        formattedOrderItems,

                      shippingAddress,

                      totalPrice:
                        finalTotal,
                    },
                    {
                      headers:
                        {
                          Authorization: `Bearer ${userInfo.token}`,
                        },
                    }
                  );

                await fetchCart();

                setOrderSuccess(
                  orderData
                );
              } catch (
                error
              ) {
                console.error(
                  error
                );

                alert(
                  "Order creation failed."
                );
              }
            },

          theme: {
            color:
              "#3399cc",
          },
        };

        const razor =
          new window.Razorpay(
            options
          );

        razor.open();
      } catch (error) {
        console.error(
          error
        );

        alert(
          "Payment Failed ❌"
        );
      } finally {
        setLoading(false);
      }
    };

  if (orderSuccess) {
    return (
      <div className="container">
        <CheckoutSteps
          step1={true}
          step2={true}
          step3={true}
          step4={true}
        />

        <div className="success-card">
          <div className="success-icon">
            🎉
          </div>

          <h1 className="success-title">
            Order Placed Successfully
          </h1>

          <p className="success-message">
            Thank you for shopping with
            NovaCart.
          </p>

          <div className="success-order-box">
            <p>
              <strong>
                Order ID:
              </strong>{" "}
              {
                orderSuccess.order
                  ?._id
              }
            </p>

            <p>
              <strong>
                Total Paid:
              </strong>{" "}
              ₹
              {orderSuccess.order?.totalPrice?.toLocaleString(
                "en-IN"
              )}
            </p>
          </div>

          <div className="success-checklist">
            <p>
              ✓ Confirmation Email Sent
            </p>

            <p>
              ✓ Payment Received
            </p>

            <p>
              ✓ Order Processing Started
            </p>
          </div>

          <div className="success-actions">
            <button
              className="orders-btn"
              onClick={() =>
                (window.location.href =
                  "/myorders")
              }
            >
              View My Orders
            </button>

            <button
              className="continue-btn"
              onClick={() =>
                (window.location.href =
                  "/")
              }
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <CheckoutSteps
        step1={true}
        step2={true}
        step3={true}
      />

      <h1
        style={{
          marginBottom:
            "30px",
        }}
      >
        Review Your Order
      </h1>

      <div className="placeorder-layout">
        <div className="placeorder-left">
          <div className="placeorder-card">
            <h2>
              <FaMapMarkerAlt />{" "}
              Shipping Address
            </h2>

            <p>
              {
                shippingAddress.address
              }
            </p>

            <p>
              {
                shippingAddress.city
              }
              ,{" "}
              {
                shippingAddress.postalCode
              }
            </p>

            <p>
              {
                shippingAddress.country
              }
            </p>
          </div>

          <div className="placeorder-card">
            <h2>
              Order Items
            </h2>

            {cartItems.map(
              (item) => (
                <div
                  key={
                    item._id
                  }
                  className="placeorder-item"
                >
                  <img
                    src={
                      item.image
                    }
                    alt={
                      item.name
                    }
                  />

                  <div>
                    <h4>
                      {
                        item.name
                      }
                    </h4>

                    <p>
                      ₹
                      {item.price.toLocaleString(
                        "en-IN"
                      )}{" "}
                      ×{" "}
                      {item.qty}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="placeorder-summary">
          <div className="placeorder-card">
            <h2>
              <FaCreditCard />{" "}
              Order Summary
            </h2>

            <div className="summary-row">
              <span>
                Subtotal
              </span>

              <span>
                ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Shipping
              </span>

              <span>
                {shippingPrice ===
                0
                  ? "FREE"
                  : `₹${shippingPrice}`}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Tax
              </span>

              <span>
                ₹0
              </span>
            </div>

            <hr />

            <div className="summary-total">
              <span>
                Total
              </span>

              <span>
                ₹
                {finalTotal.toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            <button
              className="checkout-btn"
              onClick={
                paymentHandler
              }
              disabled={
                loading ||
                cartItems.length ===
                  0
              }
            >
              {loading
                ? "Processing..."
                : "Pay Securely"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;