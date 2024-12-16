"use client";
import React, { createContext, useContext, useState } from "react";

export interface Cart {
  message: string;
  cartItems: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}
export interface CartItem {
  cartItemId: number;
  productId: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  totalPrice: number;
  isChecked: boolean;
  isCheckedOut: boolean;
}
interface CartContextProps {
  cart: Cart | null;
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart | null>(null);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng trong CartProvider");
  }
  return context;
};
