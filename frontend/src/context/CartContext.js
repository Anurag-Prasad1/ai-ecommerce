import {
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { AuthContext } from "./AuthContext";

export const CartContext =
  createContext();

function CartProvider({
  children,
}) {
  const { userInfo } =
    useContext(AuthContext);

  const [cartItems, setCartItems] =
    useState([]);

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

  // ===================================
  // Load Cart From MongoDB
  // ===================================
  const fetchCart =
    async () => {
      if (!userInfo?.token) {
        setCartItems([]);
        return;
      }

      try {
        const { data } =
          await axios.get(
            "http://localhost:5000/api/cart",
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

        const formattedCart =
          data.map((item) => ({
            _id: item._id,
            productId:
              item.product._id,
            name:
              item.product.name,
            image:
              item.product.image,
            price:
              item.product.price,
            brand:
              item.product.brand,
            category:
              item.product.category,
            qty:
              item.quantity,
          }));

        setCartItems(
          formattedCart
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
  fetchCart();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [userInfo]);

  // ===================================
  // Shipping Address
  // ===================================
  useEffect(() => {
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(
        shippingAddress
      )
    );
  }, [shippingAddress]);

  // ===================================
  // Add To Cart
  // ===================================
  const addToCart =
    async (product) => {
      try {
        if (!userInfo?.token) {
          toast.error(
            "Please login first"
          );
          return;
        }

        await axios.post(
          "http://localhost:5000/api/cart",
          {
            productId:
              product._id,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        await fetchCart();

        toast.success(
          `${product.name} added to cart`
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to add product"
        );
      }
    };

  // ===================================
  // Decrease Quantity
  // ===================================
  const decreaseQuantity =
    async (cartItemId) => {
      try {
        const item =
          cartItems.find(
            (item) =>
              item._id ===
              cartItemId
          );

        if (!item) return;

        if (item.qty === 1) {
          await removeFromCart(
            cartItemId
          );

          return;
        }

        await axios.put(
          `http://localhost:5000/api/cart/${cartItemId}`,
          {
            quantity:
              item.qty - 1,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        await fetchCart();

        toast.success(
          "Quantity updated"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to update quantity"
        );
      }
    };

  // ===================================
  // Increase Quantity
  // ===================================
  const increaseQuantity =
    async (cartItemId) => {
      try {
        const item =
          cartItems.find(
            (item) =>
              item._id ===
              cartItemId
          );

        if (!item) return;

        await axios.put(
          `http://localhost:5000/api/cart/${cartItemId}`,
          {
            quantity:
              item.qty + 1,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        await fetchCart();

        toast.success(
          "Quantity updated"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to update quantity"
        );
      }
    };

  // ===================================
  // Remove Item
  // ===================================
  const removeFromCart =
    async (cartItemId) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/cart/${cartItemId}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        await fetchCart();

        toast.success(
          "Product removed from cart"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to remove product"
        );
      }
    };

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart,

        fetchCart,

        shippingAddress,

        setShippingAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;