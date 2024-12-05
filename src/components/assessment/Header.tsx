import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-black text-white">
      <button onClick={() => navigate("/")}>←</button>
      <h1>Assessment</h1>
      <div>:</div>
    </header>
  );
}
