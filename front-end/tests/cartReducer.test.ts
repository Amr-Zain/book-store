import { cartReducer } from '../src/reducers/cart';
import { ADD_TO_CART, DELETE_FROM_CART, RESET_CART, UPDATE_QUANTITY } from '../src/actions/cart';
import type { CartItemType, CartState } from '../src/types/cartReducer';

const mockItem1: CartItemType = {
    _id: '1',
    newPrice: 10,
    quantity: 2,

    coverImage: '',
    title: '',
    description: '',
    oldPrice: 0
};

const mockItem2: CartItemType = {
    _id: '2',
    newPrice: 15,
    quantity: 1,
    
    coverImage: '',
    title: '',
    description: '',
    oldPrice: 0
};

describe('cartReducer', () => {
    it('RESET_CART - should empty the cart and reset total', () => {
        const initialState: CartState = {
            cartItems: [mockItem1, mockItem2],
            totalPrice: 10 * 2 + 15 * 1,
        };

        const result = cartReducer(initialState, { type: RESET_CART });
        expect(result.cartItems).toEqual([]);
        expect(result.totalPrice).toBe(0);
    });
    describe('DELETE_FROM_CART', () => {
        it('should remove item and update total correctly', () => {
            const initialState: CartState = {
                cartItems: [mockItem1, mockItem2],
                totalPrice: 10 * 2 + 15,
            };

            const result = cartReducer(initialState, {
                type: DELETE_FROM_CART,
                payload: '1',
            });
            expect(result.cartItems).toEqual([mockItem2]);
            expect(result.totalPrice).toBe(15);
        });
    });
    describe('UPDATE_QUANTITY', () => {
        it('should increase quantity and update total', () => {
            const initialState: CartState = {
                cartItems: [mockItem1],
                totalPrice: 10 * 2,
            };

            const result = cartReducer(initialState, {
                type: UPDATE_QUANTITY,
                payload: { id: '1', value: 1 },
            });
            expect(result.cartItems[0].quantity).toBe(3);
            expect(result.totalPrice).toBe(10 * 3);
        });

        it('should decrease quantity and update total', () => {
            const initialState: CartState = {
                cartItems: [mockItem1],
                totalPrice: 10 * 2,
            };

            const result = cartReducer(initialState, {
                type: UPDATE_QUANTITY,
                payload: { id: '1', value: -1 },
            });
            expect(result.cartItems[0].quantity).toBe(1);
            expect(result.totalPrice).toBe(10 * 1);
        });
        it('should return the same result if value not -1,1', () => {
            const initialState: CartState = {
                cartItems: [mockItem1],
                totalPrice: 10 * 2,
            };

            const result = cartReducer(initialState, {
                type: UPDATE_QUANTITY,
                // @ts-expect-error Testing invalid action
                payload: { id: '1', value: -2 },
            });
            expect(result.cartItems[0].quantity).toBe(2);
            expect(result.totalPrice).toBe(20);
        });
    });
    describe('ADD_TO_CART', () => {
        it('should add new item to cart', () => {
            const initialState: CartState = {
                cartItems: [],
                totalPrice: 0,
            };

            const result = cartReducer(initialState, {
                type: ADD_TO_CART,
                payload: mockItem1,
            });
            expect(result.cartItems).toEqual([mockItem1]);
            expect(result.totalPrice).toBe(10 * 2);
        });

        it('should not add duplicate items', () => {
            const initialState: CartState = {

                cartItems: [mockItem1],
                totalPrice: 10 * 2,
            };

            const result = cartReducer(initialState, {
                type: ADD_TO_CART,
                payload: mockItem1,
            });
            console.log(result)
            expect(result.cartItems).toEqual([mockItem1]);
            expect(result.totalPrice).toBe(10 * 2);
        });

        it('should respect provided quantity', () => {
            const initialState: CartState = {
                cartItems: [],
                totalPrice: 0,
            };

            const result = cartReducer(initialState, {
                type: ADD_TO_CART,
                payload: { ...mockItem1, quantity: 3 },
            });
            expect(result.cartItems[0].quantity).toBe(3);
            expect(result.totalPrice).toBe(10 * 3);
        });
    });

    it('should return current state for unknown action', () => {
        const initialState: CartState = {
            cartItems: [mockItem1],
            totalPrice: 10 * 2,
        };
        // @ts-expect-error Testing invalid action
        const result = cartReducer(initialState, { type: 'UNKNOWN_ACTION' });
        expect(result).toEqual(initialState);
    });
});