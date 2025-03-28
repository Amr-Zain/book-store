import { useState } from "react";
import UserInfo from "./UserInfo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center h-16 px-6 sm:px-10 bg-white">
      <button
        className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="sr-only">Menu</span>
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
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>

      <div className="relative w-full h-10 max-w-md sm:-ml-2">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          role="search"
          placeholder="Search..."
          className="py-2 pl-10 pr-4 w-full border-1 border-gray-400 bg-blackBG focus:outline-none placeholder-gray-600 focus:bg-gray-50 rounded-lg"
        />
      </div>

      <UserInfo />
    </header>
  );
};
export default Header;
