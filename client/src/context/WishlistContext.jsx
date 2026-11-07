import { createContext, useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();
const getSavedWishlist = (key) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};
export function WishlistProvider({ children }) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const userId = user?._id || user?.id || user?.email;
  const role = user?.role?.toLowerCase() || "customer";
  const wishlistStorageKey = isLoggedIn && userId ? `wishlist_${role}_${userId}` : "guestWishlist";
  const [wishlistItems, setWishlistItems] = useState(() => getSavedWishlist(wishlistStorageKey));
  const activeWishlistKey = useRef(wishlistStorageKey);
  useEffect(() => {
    setWishlistItems(getSavedWishlist(wishlistStorageKey));
  }, [wishlistStorageKey]);

  useEffect(() => {
    if (activeWishlistKey.current !== wishlistStorageKey) {
      activeWishlistKey.current = wishlistStorageKey;
      return;
    }
    localStorage.setItem(
      wishlistStorageKey,
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems, wishlistStorageKey]);

  const addToWishlist = (product) => {
    if (!isLoggedIn || !userId) return false;
    setWishlistItems((prev) => {
      const exists = prev.some(
        (item) => item.id === product.id
      );
      if (exists) return prev;
      return [...prev, product];
    });
    return true;
  };

  const removeFromWishlist = (id) => {
    if (!isLoggedIn) return;
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const toggleWishlist = (product) => {
    if (!isLoggedIn || !userId) return false;
    const exists = wishlistItems.some(
      (item) => item.id === product.id
    );
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    return true;
  };

  const isInWishlist = (id) => {
    if (!isLoggedIn) return false;
    return wishlistItems.some(
      (item) => item.id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: isLoggedIn ? wishlistItems : [],
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}