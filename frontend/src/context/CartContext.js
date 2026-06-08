import {
  createContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] =
    useState(() => {
      const savedCart =
        localStorage.getItem("cartItems");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    });

  const [
    shippingAddress,
    setShippingAddress,
  ] = useState(() => {
    const savedShipping =
      localStorage.getItem(
        "shippingAddress"
      );

    return savedShipping
      ? JSON.parse(savedShipping)
      : {};
  });

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(shippingAddress)
    );
  }, [shippingAddress]);

  const addToCart = (product) => {
    const exist = cartItems.find(
      (item) => item._id === product._id
    );

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item._id === id
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item
        )
        .filter(
          (item) => item.qty > 0
        )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter(
        (item) => item._id !== id
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,
        decreaseQuantity,
        removeFromCart,

        shippingAddress,
        setShippingAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;