import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.category === product.category &&
          item.selectedSize === product.selectedSize
      );
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.category === product.category &&
          item.selectedSize === product.selectedSize
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item
        );
      }
      return [...prevItems, product];
    });
  };
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
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
        return {
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
        };
      }
      return JSON.parse(savedAddress);
    } catch (err) {
      return {
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      };
    }
  });
  useEffect(() => {
    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify(deliveryAddress)
    );
  }, [deliveryAddress]);
  const [lastOrder,setLastOrder] =useState([]);
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
        setDeliveryAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}