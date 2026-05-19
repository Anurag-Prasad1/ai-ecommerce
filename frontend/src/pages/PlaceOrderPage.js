import { useContext } from "react";

import { CartContext } from "../context/CartContext";

function PlaceOrderPage() {
  const {
    cartItems,
    shippingAddress,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.qty,
    0
  );

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
    </div>
  );
}

export default PlaceOrderPage;