import React from "react";
import { FaCog, FaHome, FaListAlt } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

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
                className={`flex flex-col items-center ${activeIndex === index ? "text-white" : "text-gray-400"
                    }`}
            >
                <div
                    className={`transition-all duration-300 ease-in-out ${activeIndex === index
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
                <FaListAlt size={24} />,
                "Assessments",
                1
            )}
            {renderNavItem("/app/home", <FaHome size={24} />, "Home", 0)}
            {renderNavItem("/app/settings", <FaCog size={24} />, "Settings", 2)}
        </div>
    );
};

export default BottomNavBar;
