import { Book, CartAction } from "../types";



export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const RESET_CART = 'RESET_CART';


export const cartAddItem =(item:Book):CartAction=>({type:ADD_TO_CART, payload:item});

export const updateItemQuantitiy =(id: string, value: 1|-1):CartAction=>({ type:UPDATE_QUANTITY, payload:{id, value} });

export const cartDeleteAction =(id: string):CartAction=>({ type:DELETE_FROM_CART, payload:id });

export const restCart =():CartAction=>({ type:RESET_CART });
