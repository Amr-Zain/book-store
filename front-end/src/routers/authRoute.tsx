import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router";

const AuthRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const auth = useAuth();
  if (auth!.loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  if (auth!.currentUser)
    return (
      <Navigate
        to={
          auth!.currentUser.role === "user" ? "/user-dashboard" : "/dashboard"
        }
        replace
      />
    );
  return children;
};

export default AuthRoute;
