import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface TopNavBarProps {
  isDark?: boolean;
}

const TopNavBar = ({ isDark }: TopNavBarProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        isDark ? "bg-black text-white p-3" : "bg-white text-black"
      }`}
    >
      <button
        className={`rounded p-2 hover:bg-gray-300 ${
          isDark ? "bg-black hover:text-black" : "bg-white text-black"
        }`}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </button>
    </div>
  );
};

export default TopNavBar;
