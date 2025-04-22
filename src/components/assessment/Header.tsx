import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center p-4 bg-black text-white fixed top-0 w-full z-10">
      <button
        className="hover:bg-gray-700 p-2 rounded"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </button>
      <h1 className="flex-1 text-center pr-6">{title}</h1>
    </header>
  );
}
