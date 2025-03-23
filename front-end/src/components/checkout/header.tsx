import { useCart } from "../../context/cartContext";

function CheckoutHeader() {
    const { state: { cartItems, totalPrice } } = useCart();

    return (  <div>
        <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delevary</h2>
        <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
        <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
    </div> );
}

export default CheckoutHeader;