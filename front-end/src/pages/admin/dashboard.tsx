import { MdIncompleteCircle, MdOutlinePendingActions } from "react-icons/md";
import StatCard from "../../components/admin/dashoboard/statCard";
import ChartContainer from "../../components/admin/dashoboard/cartContainer";
import UserListItem from "../../components/admin/dashoboard/userListItem";
import RevenueChart from "../../components/admin/dashoboard/chart";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useEffect } from "react";

const statItems = [
  {
    value: 100,
    label: "Products",
    colorClass: "text-purple-600 bg-purple-100",
    icon: <IoBookOutline className="h-6 w-6" />,
  },
  {
    value: "$1000",
    label: "Total Sales",
    colorClass: "text-green-600 bg-green-100",
    icon: <FaArrowTrendUp className="h-6 w-6" />,
  },
  {
    value: 13,
    label: "Trending Books in This Month",
    colorClass: "text-red-600 bg-red-100",
    subValue: "(13%)",
    icon: <FaArrowTrendDown className="h-6 w-6" />,
  },
  {
    value: 80,
    label: "Total Orders",
    colorClass: "text-blue-600 bg-blue-100",
    icon: <MdIncompleteCircle className="h-6 w-6" />,
  },
];

const users = [
  {
    name: "Annette Watson",
    score: 9.3,
    image: "https://randomuser.me/api/portraits/women/82.jpg",
  },
  {
    name: "Calvin Steward",
    score: 8.9,
    image: "https://randomuser.me/api/portraits/men/81.jpg",
  },
  {
    name: "Ralph Richards",
    score: 8.7,
    image: "https://randomuser.me/api/portraits/men/80.jpg",
  },
  {
    name: "Bernard Murphy",
    score: 8.2,
    image: "https://randomuser.me/api/portraits/men/79.jpg",
  },
  {
    name: "Arlene Robertson",
    score: 8.2,
    image: "https://randomuser.me/api/portraits/women/78.jpg",
  },
  {
    name: "Jane Lane",
    score: 8.1,
    image: "https://randomuser.me/api/portraits/women/77.jpg",
  },
  {
    name: "Pat Mckinney",
    score: 7.9,
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Norman Walters",
    score: 7.7,
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];


function AdminDashboard() {

  
  useEffect(()=>{
    document.title = 'Dashboard'
  },[])
  return (
    <div className="space-y-8 p-6 mt-6">
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        <ChartContainer
          className=" hidden md:flex"
          title="The number of orders per month"
        >
          <RevenueChart />
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
