import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineAppstore,
} from "react-icons/ai";
import { useUser } from "../../hooks/useUser";
import { IoMdLogOut } from "react-icons/io";

// Define your routes in an array
const routes = [
  { path: "/", name: "Dashboard", icon: AiOutlineDashboard },
  { path: "/users", name: "Users", icon: AiOutlineUser },
  { path: "/categories", name: "Categories", icon: AiOutlineAppstore },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useUser();

  return (
    <div className="h-full bg-background2 min-w-64 rounded-2xl  flex flex-col justify-between p-2">
      <div>
        <div className="py-2 border-b border-gray-200 mb-2 text-primary">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </div>
        {routes.map((route, index) => (
          <Link
            key={index}
            to={route.path}
            className={`block  p-2 rounded-xl text-gray-700 hover:bg-gray-100  transition-all duration-200`}
          >
            <div className="flex items-center gap-2">
              <div
                className={` py-2 px-3 rounded-xl transition-all duration-200 ${
                  location.pathname === route.path
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
              >
                <route.icon className="inline-block w-4 h-4 " />
              </div>
              <p className="text-sm">{route.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <button
        className="p-2 text-left hover:bg-gray-100  rounded-xl flex items-center gap-2"
        onClick={logout}
      >
        <div className="p-3 rounded-xl bg-white">
          <IoMdLogOut className="w-4 h-4" />
        </div>
        <p className="text-sm text-gray-700">Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
