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
        {isCartEmpty ? (
          <button
            disabled
            className="flex items-center justify-center rounded-md border border-transparent bg-gray-300 px-6 py-3 text-base font-medium text-white cursor-not-allowed w-full"
          >
            Checkout
          </button>
        ) : (
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors duration-200 w-full"
          >
            Checkout
          </Link>
        )}
      </div>

      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <span>or</span>
        <Link
          to="/"
          className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
        >
          Continue Shopping
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default CartFooter;