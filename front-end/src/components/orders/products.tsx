import { ImBook } from "react-icons/im";
import { Link } from "react-router";

function OrederProducts({ productIds }: { productIds: string[]}) {
    return ( <div className="border-t border-t-gray-200 pt-4 ml-4">
                <h3 className="font-semibold mb-3">Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {productIds.map((productId) => 
                <Link to={'/books/'+productId} key={productId} className="ml-1 flex items-center hover:underline">
                    <span className="mr-2 text-gray-700"><ImBook /></span>
                    {productId}
                </Link>)}
                </div>
            </div> );
}

export default OrederProducts;