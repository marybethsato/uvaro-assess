import { BrowserRouter, Route, Routes } from "react-router-dom";
import useViewportHeight from "./hooks/useViewportHeight";
import "./index.css";
import Assessment from "./pages/Assessment";
import CompleteAssessment from "./pages/CompleteAssessment";
import Welcome from "./pages/Welcome";
import "./styles/globals.css";

export default function App() {
  useViewportHeight();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/completeAssessment" element={<CompleteAssessment />} />
      </Routes>
    </BrowserRouter>
  );
}
