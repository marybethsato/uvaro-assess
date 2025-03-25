// src/App.tsx
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
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import PublicRoute from "./routes/PublicRoute";
import "./styles/globals.css";

export default function App() {
  useViewportHeight();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (wrapped in PublicRoute for redirect if logged in) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Welcome />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/complete-checkmark" element={<CompleteCheckmark />} />
        <Route path="/introduction/:category" element={<CategoryIntroduction />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result/:category" element={<ResultCategory />} />

        {/* Protected App Pages with Bottom Navigation */}
        <Route path="/app" element={<AppLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="assessment-list" element={<AssessmentList />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
