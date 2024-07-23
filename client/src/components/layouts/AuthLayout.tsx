import React from "react";
import { Outlet } from "react-router-dom";
import images from "../../utils/constants/image";

const AuthLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <div className="w-full h-full grid grid-cols-2 ">
        <div className="h-full  overflow-y-auto flex flex-col items-center justify-center px-[5%]">
          <Outlet />
        </div>
        <div className="h-screen">
          <img src={images.authBg} alt="" className="w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
