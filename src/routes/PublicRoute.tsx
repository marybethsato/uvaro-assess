// src/routes/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem("userId") !== null;

  if (isLoggedIn) {
    return <Navigate to="/app/home" replace />;
  }

  return children;
};

export default PublicRoute;
