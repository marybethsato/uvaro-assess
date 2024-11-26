import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Assessment from "./pages/Assessment";
import Welcome from "./pages/Welcome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
    </BrowserRouter>
  );
}
