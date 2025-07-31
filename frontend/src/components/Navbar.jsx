import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import navImg from "../images/dart-arrow-svgrepo-com.svg";
import { useState } from "react";
import SearchBar from "./ui/SearchBar";

export default function Navbar() {
  const [rotated, setRotated] = useState(false);
  const { isAuthenticated } = useAuth();

  function handleRotate() {
    setRotated((prev) => !prev);
  }

  return (
    <nav className="h-16 bg-offwhite dark:bg-dark-gray dark:text-offwhite px-5 text-dark-gray flex text-center justify-end md:justify-center items-center w-full">
      <Link
        className="hidden md:block text-xl mx-3 min-w-16 rounded-md hover:text-2xl hover:text-purple-500 transition-all"
        to="/roadmap"
      >
        Roadmap
      </Link>
      <Link
        className="hidden md:block text-xl mx-3 min-w-16 rounded-md hover:text-2xl hover:text-purple-500 transition-all"
        to="/"
      >
        Home
      </Link>
      <Link
        className="hidden md:block text-2xl mx-3 min-w-16 font-bold rounded-md hover:text-3xl hover:text-purple-500 transition-all"
        to="/quickplay"
      >
        Quickplay
      </Link>
      <Link
        className="hidden md:block text-xl mx-3 min-w-16 rounded-md hover:text-2xl hover:text-purple-500 transition-all"
        to="/features"
      >
        Features
      </Link>
      <Link
        className="hidden md:block text-xl mx-3 min-w-16 rounded-md hover:text-2xl hover:text-purple-500 transition-all"
        to={isAuthenticated ? "/myaccount" : "/account/signin"}
      >
        Account
      </Link>
      <SearchBar></SearchBar>

      <div className="relative">
        <img
          onClick={handleRotate}
          src={navImg}
          className={`w-10 ${
            rotated ? `rotate-90` : `rotate-0`
          } md:hidden transition-all duration-300 ease-in-out`}
          alt="dart logo"
        />
        <div
          className={`${
            rotated
              ? `opacity-100 backdrop-blur-sm max-h-80`
              : `opacity-0 pointer-events-none max-h-0`
          } transition-all duration-300 ease-in-out absolute -right-5 mt-3 w-64 bg-offwhite dark:bg-dark-gray rounded-b-xl shadow-xl py-1 z-50`}
        >
          <Link
            to="/"
            className="block px-4 py-4 text-xl text-gray-700 dark:text-offwhite hover:bg-zinc-900"
          >
            Home
          </Link>
          <Link
            to="/quickplay"
            className="block px-4 py-4 text-xl text-gray-700 dark:text-offwhite hover:bg-zinc-900"
          >
            Quickplay
          </Link>
          <Link
            to={isAuthenticated ? "/myaccount" : "/account/signin"}
            className="block px-4 py-4 text-xl text-gray-700 dark:text-offwhite hover:bg-zinc-900"
          >
            Account
          </Link>
          <Link
            to="/features"
            className="block px-4 py-4 text-xl text-gray-700 dark:text-offwhite hover:bg-zinc-900"
          >
            Features
          </Link>
          <Link
            to="/roadmap"
            className="block px-4 py-4 text-xl text-gray-700 dark:text-offwhite hover:bg-zinc-900"
          >
            Roadmap
          </Link>
        </div>
      </div>
    </nav>
  );
}
