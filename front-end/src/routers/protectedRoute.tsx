import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute: React.FC<{
  children: React.ReactNode;
  roles: ["user" | "admin"];
}> = ({ children, roles }) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth!.loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );

  if (!auth!.currentUser) return <Navigate to="/login" state={{ from: location }} replace />;

  if (!roles.includes(auth!.currentUser.role)) {
    return (
      <h3 className="w-full bg-red-100 text-red-500 text-center py-4 mt-10 rounded">
        Not Authorized
      </h3>
    );
  }
  return children;
};

export default PrivateRoute;
