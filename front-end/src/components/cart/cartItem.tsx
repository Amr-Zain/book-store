import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/url';
import { CartItemType } from '../../types';
import { GoPlus } from 'react-icons/go';
import { LuMinus } from 'react-icons/lu';
import { useCart } from '../../context/cartContext';
import { cartDeleteAction, updateItemQuantitiy } from '../../actions/cart';

interface CartItemProps {
    item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
    const { dispatch } = useCart();
    
    const handleRemoveItem = () => dispatch(cartDeleteAction(item._id));
    const increment = () => dispatch(updateItemQuantitiy(item._id,1));
    const decrement = () => dispatch(updateItemQuantitiy(item._id,-1));
    return(
  <li className="flex py-6">
    <div className="h-30 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img
        alt={item.title}
        src={getImgUrl(item.coverImage).toString()}
        className="h-full w-full object-cover object-center"
      />
    </div>

    <div className="ml-4 flex flex-1 flex-col">
      <div>
        <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
          <h3>
            <Link to="/">{item.title}</Link>
          </h3>
          <p className="sm:ml-4">${item.newPrice}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500 capitalize">
          <strong>Category: </strong>{item.category}
        </p>
      </div>
      <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={decrement}
            disabled={item.quantity <= 1}
            className="px-2 py-1 border text-indigo-600 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LuMinus />
          </button>
          <span className="px-2">{item.quantity}</span>
          <button
            onClick={increment}
            className="px-2 py-1 border text-indigo-600 rounded-md hover:bg-gray-100"
          >
            <GoPlus />
          </button>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={handleRemoveItem}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </li>
);}
export default CartItem