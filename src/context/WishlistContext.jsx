import { createContext, useState, useEffect } from "react";
export const WishlistContext = createContext();
export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const addToWishlist = (product) => {
    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );
    if (!exists) {
      setWishlistItems((prev) => [...prev, product]);
    }
  };
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };
  const toggleWishlist = (product) => {
    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}