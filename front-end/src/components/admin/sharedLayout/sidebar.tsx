import { NavLink, Link, useNavigate } from "react-router";
import img from '../../../assets/logo.png';
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../../../context/authContext";
import { navigationItems } from "../../../api/data";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuth()?.logout
  const handleLogout = async() => {
    await logout!();
    navigate("/");
  };
  return(
  <aside className="hidden sm:flex sm:flex-col z-100 w-20 sticky left-0 top-0 h-[100vh]">
    <Link to="/" className="inline-flex items-center justify-center h-18 w-20 bg-primary hover:bg-primary-dark">
      <img src={img} alt="Website logo" className="p-2" />
    </Link>
    <div className="flex-grow flex flex-col justify-between text-gray-500 bg-secondary">
      <nav className="flex flex-col mx-4 my-6 space-y-4">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={()=>window.scrollTo(0,0)}
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
          onClick={handleLogout}
          className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg transition-colors"
          aria-label="Logout"
        >
          <HiOutlineLogout className="h-6 w-6" />
        </button>
      </div>
    </div>
  </aside>
)};

export default Sidebar;