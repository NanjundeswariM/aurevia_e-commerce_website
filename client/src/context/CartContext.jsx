import { createContext, useState, useEffect, useContext, useRef} from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();
const getSavedCart = (key) => {
  try {
    const savedCart = localStorage.getItem(key);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    return [];
  }
};
export function CartProvider({ children }) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const userId = user?._id || user?.id || user?.email;
  const role = user?.role?.toLowerCase() || "customer";
  const cartStorageKey =
    isLoggedIn && userId ? `cart_${role}_${userId}` : "guestCart";
  const [cartItems, setCartItems] = useState(
    () => getSavedCart(cartStorageKey)
  );
  const activeCartKey = useRef(cartStorageKey);
  useEffect(() => {
    setCartItems(getSavedCart(cartStorageKey));
  }, [cartStorageKey]);

  useEffect(() => {
    if (activeCartKey.current !== cartStorageKey) {
      activeCartKey.current = cartStorageKey;
      return;
    }

    localStorage.setItem(
      cartStorageKey,
      JSON.stringify(cartItems)
    );

  }, [cartItems, cartStorageKey]);

  const addToCart = (product) => {
    if (!isLoggedIn || product.stock <= 0) {
      return false;
    }
    let added = true;
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.category === product.category &&
          item.selectedSize === product.selectedSize
      );
      if (existing) {
        if (
          existing.quantity + product.quantity >
          product.stock
        ) {
          added = false;
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === product.id &&
          item.category === product.category &&
          item.selectedSize === product.selectedSize
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
                stock: product.stock
              }
            : item
        );
      }
      if (product.quantity > product.stock) {
        added = false;
        return prevItems;
      }
      return [...prevItems, product];
    });
    return added;
  };
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity < item.stock
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };
  const clearCart = () => {
    setCartItems([]);
  };

  const [buyNowItem, setBuyNowItem] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    try {
      const savedAddress = localStorage.getItem("deliveryAddress");
      if (!savedAddress || savedAddress === "undefined") {
        throw new Error("No saved address");
      }
      return JSON.parse(savedAddress);
    } catch (error) {
      return {
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
      };
    }
  });
  useEffect(() => {
    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify(deliveryAddress)
    );
  }, [deliveryAddress]);
  const [lastOrder, setLastOrder] = useState([]);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        buyNowItem,
        setBuyNowItem,
        lastOrder,
        setLastOrder,
        deliveryAddress,
        setDeliveryAddress
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
