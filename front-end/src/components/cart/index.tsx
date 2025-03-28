

import  CartHeader  from './cartHeader';
import  CartItem  from './cartItem';
import  CartFooter  from './cartFooter';
import { useCart } from '../../context/cartContext';

const Cart = () => {

    const {state:{cartItems}, }  = useCart()
    
    return (
        <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <CartHeader />
            
            <div className="mt-8">
                <div className="flow-root">
                {cartItems.length > 0 ? (
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                        <CartItem 
                            key={item._id} 
                            item={item} 
                        />
                    ))}
                    </ul>
                ) : (
                    <p>No products found!</p>
                )}
                </div>
            </div>
            </div>
    
            <CartFooter />
        </div>
    );
};

export default Cart;