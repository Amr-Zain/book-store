// context/CartContext.tsx
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { cartReducer } from '../reducers/cart';
import { CartAction, CartState } from '../types/cartReducer';

type CartContextType = {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const loadInitialState = (): CartState => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    try {
      return JSON.parse(storedCart);
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
    }
  }
  return { 
    cartItems: [], 
    totalPrice: 0
  };
};

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};