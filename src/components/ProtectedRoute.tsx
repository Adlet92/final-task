import React, { ReactNode } from "react"
import { Navigate } from "react-router-dom"

import { UserAuth } from "../context/AuthContext"
import { routes } from "src/utils/routes"

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = UserAuth()

  if (!user) {
    return <Navigate to={routes.main} />
  }

  return <>{children}</>;
}

export default ProtectedRoute
