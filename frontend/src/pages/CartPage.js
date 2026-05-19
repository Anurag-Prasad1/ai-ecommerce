import { useContext } from "react";

import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";

function CartPage() {
  const {
    cartItems,
    removeFromCart,
  } = useContext(CartContext);

  return (
    <div className="container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        <>
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
                )}
              </p>

              <p>
                Quantity: {item.qty}
              </p>

              <button
                onClick={() =>
                  removeFromCart(item._id)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <Link to="/shipping">
            <button>
              Proceed To Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default CartPage;