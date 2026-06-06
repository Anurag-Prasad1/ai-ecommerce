import {
  createContext,
  useState,
  useEffect,
} from "react";

export const WishlistContext =
  createContext();

function WishlistProvider({
  children,
}) {
  const [
    wishlistItems,
    setWishlistItems,
  ] = useState(() => {
    const savedWishlist =
      localStorage.getItem(
        "wishlistItems"
      );

    return savedWishlist
      ? JSON.parse(
          savedWishlist
        )
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(
        wishlistItems
      )
    );
  }, [wishlistItems]);

  const toggleWishlist = (
    product
  ) => {
    const exists =
      wishlistItems.find(
        (item) =>
          item._id ===
          product._id
      );

    if (exists) {
      setWishlistItems(
        wishlistItems.filter(
          (item) =>
            item._id !==
            product._id
        )
      );
    } else {
      setWishlistItems([
        ...wishlistItems,
        product,
      ]);
    }
  };

  const isWishlisted = (
    productId
  ) => {
    return wishlistItems.some(
      (item) =>
        item._id === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;