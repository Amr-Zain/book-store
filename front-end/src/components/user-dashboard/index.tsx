import Order from './order';

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface OrderType {
  _id: string;
  createdAt: string;
  totalPrice: number;
  productIds: string[];
}

// Fake data
const fakeUser: User = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com'
};

const fakeOrders: OrderType[] = [
    {
        _id: 'order-1',
        createdAt: '2024-03-15T10:00:00Z',
        totalPrice: 149.99,
        productIds: ['product-1', 'product-2']
      },
      {
        _id: 'order-2',
        createdAt: '2024-03-14T15:30:00Z',
        totalPrice: 89.99,
        productIds: ['product-3']
      }
];

const UserDashboard = () => {
  // Simulated auth hook
    const currentUser = fakeUser;

  // const isLoading = false;
  // const isError = false;
    const Orders = fakeOrders.map((order) => <Order key={order._id} {...order} />)

return (
    <div className="bg-blackBG min-h-100 rounded shadow py-16">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p className="text-gray-700 mb-6">
            Welcome, {currentUser?.name || 'User'}! Here are your recent orders:
        </p>

        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
            {fakeOrders.length > 0 ? (
            <ul className="space-y-4">
                {Orders}
            </ul>
            ) : (
                <p className="text-gray-600 text-center py-4">You have no recent orders yet.</p>
            )}
        </div>
        </div>
    </div>
);
};

export default UserDashboard;