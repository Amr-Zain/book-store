import { NavLink, Link } from "react-router";
import img from '../../../assets/logo.png';
import { HiOutlineLogout, HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";

const navigationItems = [
  {
    path: "/dashboard",
    icon: <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>,
    label: "Dashboard",
    end: true
  },
  {
    path: "/dashboard/add-book",
    icon: <HiViewGridAdd className="h-6 w-6" />,
    label: "Add Book"
  },
  {
    path: "/dashboard/manage-books",
    icon: <MdOutlineManageHistory className="h-6 w-6" />,
    label: "Manage Books"
  }
];

const Sidebar = ({ onLogout }: { onLogout: () => void }) => (
  <aside className="hidden sm:flex sm:flex-col">
    <Link to="/" className="inline-flex items-center justify-center h-20 w-20 bg-primary hover:bg-primary-dark">
      <img src={img} alt="Website logo" className="p-2" />
    </Link>
    <div className="flex-grow flex flex-col justify-start text-gray-500 bg-secondary">
      <nav className="flex flex-col mx-4 my-6 space-y-4">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => 
              `inline-flex items-center justify-center py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary bg-white shadow-md' 
                  : 'hover:text-gray-400 hover:bg-gray-700 focus:bg-gray-700'
              }`
            }
          >
            <span className="sr-only">{item.label}</span>
            {item.icon}
          </NavLink>
        ))}
      </nav>
      <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
        <button 
          onClick={onLogout}
          className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg transition-colors"
          aria-label="Logout"
        >
          <HiOutlineLogout className="h-6 w-6" />
        </button>
      </div>
    </div>
  </aside>
);

export default Sidebar;