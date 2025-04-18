import { Book } from "./";

export interface CartItemType extends Book{
    quantity:number;
  }
  

export type CartState = {
    cartItems: CartItemType[];
    totalPrice: number;
};
    
export type CartAction =
    | { type: 'RESET_CART' }
    | { type: 'DELETE_FROM_CART'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; value: -1|1 } }
    | { type: 'ADD_TO_CART'; payload: Book } 

