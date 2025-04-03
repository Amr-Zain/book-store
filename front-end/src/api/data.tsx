import { HiOutlineUserAdd, HiViewGridAdd } from "react-icons/hi";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineManageHistory } from "react-icons/md";

export const navigationItems = [
  {
    path: "/dashboard",
    icon: (
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    label: "Dashboard",
    end: true,
  },
  {
    path: "/dashboard/add-book",
    icon: <HiViewGridAdd className="h-6 w-6" />,
    label: "Add Book",
  },
  {
    path: "/dashboard/manage-books",
    icon: <IoBookOutline className="h-6 w-6" />,
    label: "Manage Books",
  },
  {
    path: "/dashboard/orders",
    icon: <MdOutlineManageHistory className="h-6 w-6" />,
    label: "Orders",
  },
  {
    path: "/dashboard/add-admin",
    icon: <HiOutlineUserAdd className="h-6 w-6" />,
    label: "Add Admin",
  },
];
export const users = [
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