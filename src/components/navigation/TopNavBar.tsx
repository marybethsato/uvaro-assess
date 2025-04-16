import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

interface TopNavBarProps {
  isDark?: boolean;
}

const TopNavBar = ({ isDark }: TopNavBarProps) => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();


  return (
    <div
      className={`${isDark ? "text-white p-3" : "text-black"
        }`}
    >
      <button
        className={`rounded p-2 hover:bg-gray-300 ${isDark ? " hover:text-black" : "text-black"
          }`}
        onClick={() => {
          if (category === 'financial-health') {
            navigate('/')
          } else {
            navigate(-1);
          }
        }}
      >
        <FaArrowLeft />
      </button>
    </div>
  );
};

export default TopNavBar;
