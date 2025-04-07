import { useQuery } from "@tanstack/react-query";
import Order from "./orders/order";
import { getOrders } from "../api";
import { useAuth } from "../context/authContext";

const UserDashboard = () => {
  const currentUser = useAuth()?.currentUser;

  const {
    data: orders,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  const ordersList = orders?.map((order) => (
    <Order
      key={order._id}
      _id={order._id}
      createdAt={order.createdAt}
      totalPrice={order.totalPrice}
      productIds={order.productIds}
    />
  ));

  if (isPending)
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg p-4"></div>
          ))}
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Failed to load orders
          <button
            onClick={() => refetch()}
            className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-blackBG min-h-100 rounded shadow py-16">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          User Dashboard
        </h1>
        <p className="text-gray-700 mb-6">
          Welcome,{" "}
          <span className="font-semibold text-gray-800">
            {currentUser?.name || "User"}!
          </span>{" "}
          Here are your recent orders:
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Your Orders
          </h2>
          {orders && orders.length > 0 ? (
            ordersList
          ) : (
            <p className="text-gray-600 text-center py-4">
              You have no recent orders yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
