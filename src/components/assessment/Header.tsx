import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-black text-white">
      <button
        className="hover:bg-gray-700 p-2 rounded"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </button>
      <h1>Assessment</h1>
      <button
        className="hover:bg-gray-700 p-2 rounded"
        onClick={() => navigate("")}
      >
        <BsThreeDotsVertical />
      </button>
    </header>
  );
}
