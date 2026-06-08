import {
  useContext,
  useState,
} from "react";

import axios from "axios";

import { CartContext } from "../context/CartContext";

import { AuthContext } from "../context/AuthContext";

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

  const paymentHandler =
    async () => {
      try {
        setLoading(true);

        const { data } =
          await axios.post(
            "http://localhost:5000/api/payments/create-order",
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
                    "http://localhost:5000/api/orders",
                    {
                      orderItems:
                        formattedOrderItems,

                      shippingAddress,

                      totalPrice,
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
      <div
        className="container"
        style={{
          maxWidth:
            "700px",
          margin:
            "40px auto",
        }}
      >
        <div
          style={{
            background:
              "#ecfdf5",
            border:
              "1px solid #10b981",
            padding:
              "30px",
            borderRadius:
              "12px",
          }}
        >
          <h1>
            🎉 Order Placed
            Successfully
          </h1>

          <p>
            Thank you
            for shopping
            with
            NovaCart.
          </p>

          <p>
            📧 Order
            confirmation
            email has
            been sent to
            your
            registered
            email
            address.
          </p>

          <p>
            <strong>
              Order ID:
            </strong>{" "}
            {
              orderSuccess
                .order
                ?._id
            }
          </p>

          <p>
            <strong>
              Total:
            </strong>{" "}
            ₹
            {orderSuccess
              .order
              ?.totalPrice
              ?.toLocaleString(
                "en-IN"
              )}
          </p>

          <button
            onClick={() =>
              (
                window.location.href =
                  "/"
              )
            }
            style={{
              marginTop:
                "20px",
            }}
          >
            Continue
            Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>
        Place Order
      </h1>

      <h2>
        Shipping
      </h2>

      <p>
        {
          shippingAddress.address
        }
        ,{" "}
        {
          shippingAddress.city
        }
      </p>

      <h2>
        Order Items
      </h2>

      {cartItems.map(
        (item) => (
          <div
            key={
              item._id
            }
            className="cart-item"
          >
            <h3>
              {
                item.name
              }
            </h3>

            <p>
              ₹{" "}
              {item.price.toLocaleString(
                "en-IN"
              )}{" "}
              ×{" "}
              {item.qty}
            </p>
          </div>
        )
      )}

      <h2>
        Total: ₹{" "}
        {totalPrice.toLocaleString(
          "en-IN"
        )}
      </h2>

      <button
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
          : "Pay Now"}
      </button>
    </div>
  );
}

export default PlaceOrderPage;