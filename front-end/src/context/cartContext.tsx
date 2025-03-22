// context/CartContext.tsx
import React, { createContext, useReducer, useContext } from 'react';
import { cartReducer } from '../reducers/cart';
import { CartAction, CartState } from '../types';

type CartContextType = {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    cartItems: [], 
    totalPrice: 0
  });

  return (
    <CartContext value={{ state, dispatch }}>
      {children}
    </CartContext>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};