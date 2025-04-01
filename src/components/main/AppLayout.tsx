import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavBar from "../navigation/BottomNavBar";

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Area */}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
