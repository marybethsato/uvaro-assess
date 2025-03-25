import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BottomNavBar from "../components/navigation/BottomNavBar";
import AssessmentList from "./AssessmentList";
import Home from "./Home";
import Settings from "./Settings";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/assessments" element={<AssessmentList />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <BottomNavBar />
      </div>
    </Router>
  );
};

export default App;
