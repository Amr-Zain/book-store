import { Link } from "react-router";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import avatarImg from "../assets/avatar.png"
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";


const token = true;
const navigation = [
    {name: "Dashboard", href:"/user-dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
]
const Navbar = () => {
    const { state:{cartItems }} = useCart();
    const auth = useAuth();
    
    const  [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-3 z-100 sticky h-16 top-0 bg-white border-1 border-gray-300 shadow-sm">
            <nav className="flex justify-between items-center">
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="size-6" />
                    </Link>
                    <div className="relative sm:w-72 w-40 space-x-2">

                        <IoSearchOutline className="absolute inline-block left-3 inset-y-2 sm:left-2" />

                        <input type="text" placeholder="Search here"
                            className="bg-blackBG w-full py-1 md:px-8 px-7 rounded-md focus:outline-none"
                        />
                    </div>
                </div>


                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div >
                        {
                            auth?.currentUser ? <>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <img src={avatarImg} alt="" className={`size-7 rounded-full ${auth.currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                            </button>
                            {
                                isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {
                                                navigation.map((item) => (
                                                    <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                        <Link to={item.href}  onClick={() => window.scrollTo(0, 0)} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                            <li>
                                                <button
                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={auth?.logout}>Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                            </> : token ?  <Link to="/dashboard" className='border-b-2 border-primary'>Dashboard</Link> : (
                                <Link to="/login"> <HiOutlineUser className="size-6" /></Link>
                            )
                        }
                    </div>
                    
                    <button className="hidden sm:block" >
                        <HiOutlineHeart className="size-6" />
                    </button>
                    <Link to="/cart" onClick={() => window.scrollTo(0, 0)} className="bg-primary hover:bg-secondary hover:text-white p-1 sm:px-6 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart className='' />
                        {
                            <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span> 
                        }
                    </Link>
                </div>
            </nav>
        </header>
    )
};

export default Navbar;