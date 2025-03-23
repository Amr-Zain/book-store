import { OrderAbstact } from "../../types/order";
import OrederProducts from "./products";

interface OrderProps extends OrderAbstact {
    children?: React.ReactNode
}

function Order({ _id, createdAt, totalPrice, productIds, children }:OrderProps) { //add products to the props

    const Products = <OrederProducts productIds={productIds} />

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        orderId: {_id}
                    </span>
                    <span className="text-sm text-gray-500">
                        {new Date(createdAt).toLocaleDateString()}
                    </span>
                </div>
            {children}{/* orderInfo*/}
            {Products}
            <div className="border-t border-t-gray-200 pt-4 mt-4 text-right text-gray-900 ml-4">
                <p className="text-lg font-semibold">
                Total: ${totalPrice.toFixed(2)}
                </p>
            </div>
            </div>
        </div>
    )
}

export default Order;