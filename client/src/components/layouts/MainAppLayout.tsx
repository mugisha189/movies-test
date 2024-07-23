import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import Navbar from "../ui/Navbar";

const MainApp: React.FC = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden  bg-background2  flex p-3">
      <Sidebar />
      <div className="flex-grow h-full  relative">
        <Navbar />
        <div className="h-full overflow-y-auto pt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
