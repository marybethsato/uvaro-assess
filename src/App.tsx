import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/main/AppLayout";
import useViewportHeight from "./hooks/useViewportHeight";
import "./index.css";
import Assessment from "./pages/Assessment";
import AssessmentList from "./pages/AssessmentList";
import CategoryIntroduction from "./pages/CategoryIntroduction";
import CompleteCheckmark from "./pages/CompleteCheckmark";
import Home from "./pages/Home";
import Result from "./pages/Result";
import ResultCategory from "./pages/ResultCategory";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import Welcome from "./pages/Welcome";
import "./styles/globals.css";
import SignUp from "./pages/SignUp";

export default function App() {
  useViewportHeight();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/complete-checkmark" element={<CompleteCheckmark />} />
        <Route
          path="/introduction/:category"
          element={<CategoryIntroduction />}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result/:category" element={<ResultCategory />} />

        {/* App Pages with Bottom Navigation */}
        <Route path="/app" element={<AppLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="assessment-list" element={<AssessmentList />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
