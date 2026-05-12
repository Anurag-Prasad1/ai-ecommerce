import { useContext } from "react";

import { CartContext } from "../context/CartContext";

function CartPage() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        cartItems.map((item) => (
          <div key={item._id}>
            <h3>{item.name}</h3>

            <p>
              ₹{" "}
              {item.price.toLocaleString(
                "en-IN"
              )}
            </p>

            <p>Quantity: {item.qty}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CartPage;