import { Link } from 'react-router';

interface Address {
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

interface Order {
  _id: string;
  name: string;
  email: string;
  phone: string;
  totalPrice: number;
  address: Address;
  productIds: string[];
  createdAt: string;
}
const fakeOrders: Order[] = [
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
            <button
                className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Retry
            </button>
        </div>
        </div>
    );

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
      ) : (
        <div className="space-y-6">
          {orders.map((order: Order, index: number) => (
            <div 
              key={order._id}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Order #{index + 1}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p className="text-gray-600">Name: {order.name}</p>
                  <p className="text-gray-600">Email: {order.email}</p>
                  <p className="text-gray-600">Phone: {order.phone}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p className="text-gray-600">
                    {order.address.city}, {order.address.state}<br/>
                    {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {order.productIds.map((productId: string) => (
                    <Link
                      key={productId}
                      to={`/products/${productId}`}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <span className="mr-2">🛒</span>
                      {productId}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mt-4 text-right">
                <p className="text-lg font-semibold">
                  Total: ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;