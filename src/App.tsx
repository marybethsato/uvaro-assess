import { BrowserRouter, Route, Routes } from "react-router-dom";
import useViewportHeight from "./hooks/useViewportHeight";
import Assessment from "./pages/Assessment";
import Welcome from "./pages/Welcome";
import GlobalStyles from "./styles/GlobalStyles";

export default function App() {
  useViewportHeight();

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
    </BrowserRouter>
  );
}
