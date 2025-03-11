import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import assessment from "../../images/navigation/assessment.png";
import home from "../../images/navigation/home.png";
import settings from "../../images/navigation/setting.png";

interface BottomNavBarProps {
  selectedIndex?: number; // Optional prop for selected index
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ selectedIndex }) => {
  const location = useLocation();

  // Determine active index based on current path or selectedIndex
  const activeIndex =
    selectedIndex !== undefined
      ? selectedIndex
      : location.pathname.includes("/app/home")
      ? 0
      : location.pathname.includes("/app/assessment-list")
      ? 1
      : location.pathname.includes("/app/settings")
      ? 2
      : -1;

  const renderNavItem = (
    to: string,
    icon: React.ReactNode,
    label: string,
    index: number
  ) => (
    <div className="flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
      <NavLink
        to={to}
        className={`flex flex-col items-center ${
          activeIndex === index ? "text-white" : "text-gray-400"
        }`}
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            activeIndex === index
              ? "bg-red-600 rounded-full px-4 py-2"
              : "px-4 py-2"
          }`}
        >
          {icon}
        </div>
        <span className="text-xs mt-1">{label}</span>
      </NavLink>
    </div>
  );

  return (
    <div className="flex justify-around bg-black py-3 fixed bottom-0 left-0 w-full h-20 z-10">
      {renderNavItem(
        "/app/assessment-list",
        <img src={assessment} alt="Assessment Icon" width={24} />,
        "Assessments",
        1
      )}
      {renderNavItem(
        "/app/home",
        <img src={home} alt="Home Icon" width={24} />,
        "Home",
        0
      )}
      {renderNavItem(
        "/app/settings",
        <img src={settings} alt="Assessment Icon" width={24} />,
        "Settings",
        2
      )}
    </div>
  );
};

export default BottomNavBar;
