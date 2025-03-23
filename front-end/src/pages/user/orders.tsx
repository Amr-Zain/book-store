import { Link } from 'react-router';
import { Order as OrderType } from '../../types/order';
import Order from '../../components/orders/order';
import OrderInfo from '../../components/orders/orderAddress';


const fakeOrders: OrderType[] = [
    {
      _id: 'ORD123456',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 555-123-4567',
      totalPrice: 149.99,
      createdAt: '2024-03-15T10:00:00Z',
      address: {
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipcode: '10001'
      },
      productIds: ['PROD001', 'PROD002', 'PROD003']
    },
    {
      _id: 'ORD789012',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 555-987-6543',
      totalPrice: 89.99,
      createdAt: '2024-03-14T15:30:00Z',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        zipcode: '90001'
      },
      productIds: ['PROD004']
    }
  ];

const OrderPage = () => {
    const isLoading = false;
    const isError = false;
    const orders = fakeOrders;
    if (isLoading) return (
        <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg p-4"></div>
            ))}
        </div>
        </div>
    );

    if (isError) return (
        <div className="container mx-auto p-6 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            Failed to load orders
            <button className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Retry
            </button>
        </div>
        </div>
    );
    const ordersList = orders.map((order)=>
        <Order _id={order._id} createdAt={order.createdAt} 
          totalPrice={order.totalPrice} productIds={order.productIds}>
            <OrderInfo name={order.name} 
                    address={order.address} 
                    email={order.email} 
                    phone={order.phone} />
          </Order>)
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No orders found</p>
          <Link
            to="/products" 
            className="text-blue-600 hover:underline"
          >
            Browse Products
          </Link>
        </div>
      ) 
      : 
        ordersList
      }
    </div>
  );
};

export default OrderPage;