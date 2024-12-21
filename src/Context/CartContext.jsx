import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : []; 
  });

  // save in local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // add to cart
  const addToCart = (id, ele) => {
    const newItem = { ...ele, amount: 1 };
    const cartItem = cart.find((item) => item.id === id);

    if (cartItem) {
      setCart(
        cart.map((item) =>
          item.id === id
            ? { ...item, amount: item.amount + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, newItem]);
    }
  };

  // remove from cart
  const removeToCart = (id) => {
    const newCart = cart.filter((ele) => ele.id !== id);
    setCart(newCart);
  };

  // clear all cart
  const clearAllCart = () => {
    setCart([]);
  };

  // increase amount
  const increaseAmount = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  // decrease amount
  const decreaseAmount = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((ele) => ele.amount > 0)
    );
  };

  // calc total items
  const totalItem = cart.reduce((acc, item) => acc + item.amount, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeToCart,
        clearAllCart,
        increaseAmount,
        decreaseAmount,
        totalItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
