import { ADD_TO_CART, DELETE_FROM_CART, RESET_CART, UPDATE_QUANTITY } from "../actions/cart";
import { CartAction, CartState } from "../types/cartReducer";

export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case RESET_CART:
            return { cartItems: [], totalPrice: 0 };

        case DELETE_FROM_CART: {
            const itemToDelete = state.cartItems.find(item => item._id === action.payload);
            if (!itemToDelete) return state;
            
            const newTotal = Math.max(0, state.totalPrice - (itemToDelete.newPrice * itemToDelete.quantity));
            return {
                cartItems: state.cartItems.filter(item => item._id !== action.payload),
                totalPrice: Number(newTotal.toFixed(2))
            };
        }

        case UPDATE_QUANTITY: {
            if (Math.abs(action.payload.value) !== 1) return state;

            let priceDelta = 0;
            const updatedItems = state.cartItems.map(item => {
                if (item._id === action.payload.id) {
                    const newQuantity = Math.max(1, item.quantity + action.payload.value);
                    priceDelta = (newQuantity - item.quantity) * item.newPrice;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });

            return priceDelta === 0 ? state : {
                cartItems: updatedItems,
                totalPrice: Number((state.totalPrice + priceDelta).toFixed(2))
            };
        }

        case ADD_TO_CART: {
            const exists = state.cartItems.some(item => item._id === action.payload._id);
            if (exists) return state;

            const quantity = action.payload.quantity ?? 1;
            const itemPrice = action.payload.newPrice * quantity;
            
            return {
                cartItems: [...state.cartItems, { ...action.payload, quantity }],
                totalPrice: Number((state.totalPrice + itemPrice).toFixed(2))
            };
        }

        default:
            return state;
    }
};