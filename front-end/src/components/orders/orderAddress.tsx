import { OrderInfo as OrderInfoProps } from "../../types/order";


function OrderInfo({ name, email, phone, address  }: OrderInfoProps) {
    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <p className="text-gray-600">Name: {name}</p>
                    <p className="text-gray-600">Email: {email}</p>
                    <p className="text-gray-600">Phone: {phone}</p>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p className="text-gray-600">
                        {address.city}, {address.state}<br/>
                        {address.country}, {address.zipcode}
                    </p>
                </div>
            </div>
    );
}

export default OrderInfo;