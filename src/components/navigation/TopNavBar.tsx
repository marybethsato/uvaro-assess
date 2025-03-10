import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopNavBar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="rounded" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
    </div>
  );
};

export default TopNavBar;
