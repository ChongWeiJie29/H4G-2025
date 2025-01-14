import React, { createContext, useState, useEffect, useContext } from "react";
import { CartItem } from "../../definitions/CartItem";

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: CartItem["product"], quantity?: number) => void;
  removeFromCart: (productName: string) => void;
  clearCart: () => void;
  totalCost: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("shoppingCart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: CartItem["product"], quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.name === product.name);

      if (existingItem) {
        return prev.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productName: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.name !== productName));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCost = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalCost }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

