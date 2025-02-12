import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/main/AppLayout";
import useViewportHeight from "./hooks/useViewportHeight";
import "./index.css";
import Assessment from "./pages/Assessment";
import AssessmentList from "./pages/AssessmentList";
import CategoryIntroduction from "./pages/CategoryIntroduction";
import CompleteAssessment from "./pages/CompleteAssessment";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Settings from "./pages/Settings";
import { default as SignIn, default as Signin } from "./pages/Signin";
import Welcome from "./pages/Welcome";
import "./styles/globals.css";

export default function App() {
  useViewportHeight();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route
          path="/introduction"
          element={<CategoryIntroduction categoryName="categoryName" />}
        />
        <Route path="/completeAssessment" element={<CompleteAssessment />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/result" element={<Result />} />

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
