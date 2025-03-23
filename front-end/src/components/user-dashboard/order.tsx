interface OrderProps {
    _id: string;
    createdAt: number |string;
    totalPrice: number;
    productIds: string[];
}

function Order({ _id, createdAt, totalPrice, productIds }:OrderProps) { //add products to the props
    return (
        <li className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-1">
            <p className="font-medium">Order ID: {_id}</p>
            <p>Date: {new Date(createdAt).toLocaleDateString()}</p>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <div className="mt-2">
                <p className="font-medium">Products:</p>
                {productIds.map((productId) => <p key={productId} className="ml-1">{productId}</p>)}
            </div>
        </li>
    );
}

export default Order;