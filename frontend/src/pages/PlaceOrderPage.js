import { useContext } from "react";

import axios from "axios";

import { CartContext } from "../context/CartContext";

import { AuthContext } from "../context/AuthContext";

function PlaceOrderPage() {
  const {
    cartItems,
    shippingAddress,
  } = useContext(CartContext);

  const { userInfo } =
    useContext(AuthContext);

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.qty,
    0
  );

  const paymentHandler = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payments/create-order",
        {
          amount: totalPrice,
        }
      );

      const options = {
        key:
          "rzp_test_SraRd60FDhsPEG",

        amount: data.amount,

        currency: data.currency,

        name: "NovaCart",

        description:
          "Thank you for shopping with NovaCart",

        order_id: data.id,

        handler: async function () {
          // 🔥 SAVE ORDER AFTER SUCCESSFUL PAYMENT
          await axios.post(
            "http://localhost:5000/api/orders",
            {
              orderItems: cartItems,

              shippingAddress,

              totalPrice,
            },
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

          alert(
            `Payment Successful 🎉
Order Amount: ₹ ${totalPrice.toLocaleString(
              "en-IN"
            )}`
          );
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razor =
        new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.error(error);

      alert(
        "Payment Failed ❌"
      );
    }
  };

  return (
    <div className="container">
      <h1>Place Order</h1>

      <h2>Shipping</h2>

      <p>
        {shippingAddress.address},{" "}
        {shippingAddress.city}
      </p>

      <h2>Order Items</h2>

      {cartItems.map((item) => (
        <div
          key={item._id}
          className="cart-item"
        >
          <h3>{item.name}</h3>

          <p>
            ₹{" "}
            {item.price.toLocaleString(
              "en-IN"
            )}{" "}
            × {item.qty}
          </p>
        </div>
      ))}

      <h2>
        Total: ₹{" "}
        {totalPrice.toLocaleString(
          "en-IN"
        )}
      </h2>

      <button onClick={paymentHandler}>
        Pay Now
      </button>
    </div>
  );
}

export default PlaceOrderPage;