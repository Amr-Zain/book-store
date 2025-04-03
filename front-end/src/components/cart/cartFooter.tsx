import { Link } from 'react-router';
import { useCart } from '../../context/cartContext';

const CartFooter = () => {
  const { state: { cartItems, totalPrice } } = useCart();
  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>${Number(totalPrice).toFixed(2)}</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
      
      <div className="mt-6">
        {!isCartEmpty && (
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary transition-colors duration-200 w-full"
          >
            Checkout
          </Link>
        )}
      </div>

      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <Link
          to="/"
          className="font-medium text-primary hover:text-secondary ml-1"
        >
          Continue Shopping
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default CartFooter;