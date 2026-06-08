import { useContext } from "react";

import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    addToCart,
    decreaseQuantity,
  } = useContext(CartContext);

  const totalItems =
    cartItems.reduce(
      (acc, item) => acc + item.qty,
      0
    );

  const subtotal =
    cartItems.reduce(
      (acc, item) =>
        acc + item.price * item.qty,
      0
    );

  const shipping =
    subtotal > 1000 ? 0 : 99;

  const total =
    subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <div className="empty-cart-icon">
            🛒
          </div>

          <h1>
            Your Cart Is Empty
          </h1>

          <p>
            Looks like you
            haven't added any
            products yet.
          </p>

          <Link to="/">
            <button className="continue-shopping-btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="cart-title">
        Shopping Cart (
        {totalItems} Items)
      </h1>

      <div className="cart-layout">
        {/* Left Section */}
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="cart-card"
            >
              <img
                src={item.image}
                alt={item.name}
                className="cart-product-image"
              />

              <div className="cart-product-details">
                <h3>
                  {item.name}
                </h3>

                {item.brand && (
                  <p>
                    <strong>
                      Brand:
                    </strong>{" "}
                    {item.brand}
                  </p>
                )}

                {item.category && (
                  <p>
                    <strong>
                      Category:
                    </strong>{" "}
                    {item.category}
                  </p>
                )}

                <h4>
                  ₹
                  {item.price.toLocaleString(
                    "en-IN"
                  )}
                </h4>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      decreaseQuantity(
                        item._id
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.qty}
                  </span>

                  <button
                    onClick={() =>
                      addToCart(item)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(
                      item._id
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="order-summary">
          <h2>
            Order Summary
          </h2>

          <div className="summary-row">
            <span>
              Items
            </span>

            <span>
              {totalItems}
            </span>
          </div>

          <div className="summary-row">
            <span>
              Subtotal
            </span>

            <span>
              ₹
              {subtotal.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>

          <div className="summary-row">
            <span>
              Shipping
            </span>

            <span>
              {shipping === 0
                ? "FREE"
                : `₹${shipping}`}
            </span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <span>
              ₹
              {total.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>

          <Link to="/shipping">
            <button className="checkout-btn">
              Proceed To Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;