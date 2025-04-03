import { MdIncompleteCircle, MdOutlinePendingActions } from "react-icons/md";
import StatCard from "../../components/admin/dashoboard/statCard";
import ChartContainer from "../../components/admin/dashoboard/cardContainer";
import UserListItem from "../../components/admin/dashoboard/userListItem";
import RevenueChart from "../../components/admin/dashoboard/chart";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStat } from "../../api";
import { users } from "../../api/data";



function AdminDashboard() {
  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStat,
  });
  const {
    totalOrders = 0,
    totalSales = 0,
    trendingBooks,
    totalBooks = 0,
  } = data || {};
  const statItems = [
    {
      value: totalBooks,
      label: "Books",
      colorClass: "text-purple-600 bg-purple-100",
      icon: <IoBookOutline className="h-6 w-6" />,
    },
    {
      value: `$${totalSales.toLocaleString()}`,
      label: "Total Sales",
      colorClass: "text-green-600 bg-green-100",
      icon: <FaArrowTrendUp className="h-6 w-6" />,
    },
    {
      value: trendingBooks||0,
      label: "Trending Books",
      colorClass: "text-red-600 bg-red-100",
      subValue: `(${((trendingBooks! / totalBooks) * 100 || 0).toFixed(2)}%)`,
      icon: <FaArrowTrendDown className="h-6 w-6" />,
    },
    {
      value: totalOrders,
      label: "Total Orders",
      colorClass: "text-blue-600 bg-blue-100",
      icon: <MdIncompleteCircle className="h-6 w-6" />,
    },
  ];
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

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
    <div className="space-y-8 p-6 mt-6">
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <StatCard isPending={isPending} key={index} {...item} />
        ))}
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        <ChartContainer
          className=" hidden md:flex"
          title="The number of orders per month"
        >
          {isPending ? (
            <div className="w-full h-full p-1 bg-gray-200 rounded animate-pulse" />
          ) : (
            <RevenueChart />
          )}
        </ChartContainer>

        <StatCard
          value={2}
          label="Orders left"
          colorClass="text-yellow-600 bg-yellow-100"
          icon={<MdOutlinePendingActions className="h-6 w-6" />}
        />

        <StatCard
          value={139}
          label="Website visits (last day)"
          colorClass="text-teal-600 bg-teal-100"
          icon={<AiOutlineClockCircle className="h-6 w-6" />}
        />

        <ChartContainer title="Users by average order">
          <div className="overflow-y-auto max-h-[24rem]">
            <ul className="space-y-4">
              {users.map((user, index) => (
                <UserListItem
                  key={index}
                  name={user.name}
                  score={user.score}
                  image={user.image}
                />
              ))}
            </ul>
          </div>
        </ChartContainer>
      </section>
    </div>
  );
}

export default AdminDashboard;
