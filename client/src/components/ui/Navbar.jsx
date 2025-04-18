import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useSearchContext } from "../context/Search.jsx";
import { MenuRoot, MenuTrigger,MenuContent, MenuItem } from "../components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useUserAuth } from "../context/Authentication.jsx.jsx";

const Navbar = () => {
  const { user, logout } = useUserAuth();
  const [searchInput, setSearchInput] = useState("");
  const { updateSearchQuery } = useSearchContext();
  const selectedProfile = JSON.parse(localStorage.getItem("selectedProfile"));

  useEffect(() => {
    updateSearchQuery(searchInput);
  }, [searchInput, updateSearchQuery]);

  const handleSearch = () => {
    console.log("Search triggered:", searchInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className="mt-6 bg-transparent text-white w-screen flex items-center justify-between px-4">
      <div className="lg:hidden flex items-center">
        <Link to="/">
          <img src="/Logo.png" alt="Logo" className="h-8" />
        </Link>
      </div>
      <div className="hidden lg:flex flex-row justify-between w-screen items-center">
        <div className="flex flex-row justify-around items-center w-1/2 gap-6">
          <Link to="/">
            <img src="/Logo.png" alt="Logo" className="h-8" />
          </Link>
          {["Home", "TV Shows", "Movies", "New & Popular", "My List", "Browse"].map((label, index) => (
            <Link
              key={index}
              to={`/${label.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
              className="text-white hover:text-gray-300"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <div className="relative border border-gray-600 rounded-md w-60 h-10 flex items-center px-3 hover:border-gray-500 transition-colors duration-200">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent w-full h-full text-white placeholder-gray-400 outline-none pr-8"
            />
            <i
              className="fa-solid fa-magnifying-glass text-white absolute right-3 cursor-pointer"
              onClick={handleSearch}
            ></i>
          </div>
          <i className="fa-regular fa-bell text-xl text-white cursor-pointer"></i>
          <MenuRoot>
            <MenuTrigger className="flex items-center gap-2 focus:outline-none">
              <img
                src={`${process.env.REACT_APP_PUBLIC_URL}profile-avators/${selectedProfile?.avatar || "default.png"}`}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <i className="fa-solid fa-angle-down text-white"></i>
            </MenuTrigger>
            <MenuContent className="bg-white text-black w-44 mt-2 rounded-md shadow-lg p-1">
              <MenuItem className="flex items-center gap-2 cursor-pointer">
                <User size={16} />
                <span>{selectedProfile?.username}</span>
              </MenuItem>
              <MenuItem
                onClick={logout}
                className="flex items-center gap-2 cursor-pointer"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;