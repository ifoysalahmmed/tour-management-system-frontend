import type { ComponentType } from "react";
import { Navigate } from "react-router";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";

export const withAuth = (
  Component: ComponentType,
  requiredRole?: TRole | TRole[],
) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery();
    const user = data?.data;

    if (!isLoading && !user) {
      return <Navigate to="/login" replace />;
    }

    const allowedRoles = Array.isArray(requiredRole)
      ? requiredRole
      : requiredRole
        ? [requiredRole]
        : undefined;

    const userRole = user?.role;

    if (
      !isLoading &&
      allowedRoles &&
      (!userRole || !allowedRoles.includes(userRole))
    ) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
