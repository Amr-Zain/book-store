import { restCart } from "../../actions/cart";
import { useCart } from "../../context/cartContext";

const CartHeader = () => {
  const {
    dispatch,
    state: { cartItems },
  } = useCart();

  return (
    <div className="flex items-start justify-between">
      <div className="text-lg font-medium text-gray-900">Shopping cart</div>
      <div className="ml-3 flex h-7 items-center">
        <button
          type="button"
          disabled={cartItems?.length === 0}
          onClick={() => dispatch(restCart())}
          className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200 
             disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-red-500"
        >
          <span className="">Clear Cart</span>
        </button>
      </div>
    </div>
  );
};

export default CartHeader;
