import { ADD_TO_CART, DELETE_FROM_CART, RESET_CART, UPDATE_QUANTITY } from "../actions/cart";
import { CartAction, CartState } from "../types/cartReducer";



export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case RESET_CART:
            return { cartItems: [], totalPrice: 0 };
            
        case DELETE_FROM_CART:{ 
                let price =0;
                const filteredItems = state.cartItems.filter(item => {
                    if(item._id === action.payload) price = item.newPrice * item.quantity;
                    return item._id !== action.payload
                });
            return {
                cartItems: filteredItems,
                totalPrice: state.totalPrice - price
            }; 
        }
        case UPDATE_QUANTITY:{
            let price =0;
            const updatedItems = state.cartItems.map(item => {
                if(item._id === action.payload.id){
                    price = item.newPrice;
                    return{ ...item, quantity:  item.quantity + action.payload.value }
                }
                else return item
            })
                    
            return {
                cartItems: updatedItems,
                totalPrice: state.totalPrice + (action.payload.value* price) 
            };
    }
        case ADD_TO_CART:{
            const item = state.cartItems.find(item=>item._id === action.payload._id)
            const newItem = { 
                ...action.payload,
                quantity: action.payload.quantity || 1 
            };
            if(item) return state;
            return {
                cartItems: [...state.cartItems, newItem],
                totalPrice: state.totalPrice + action.payload.newPrice
            };
    }
        default:
            return state;
    }
};
