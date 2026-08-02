import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import App from "@/App";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";

import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

const About = lazy(() => import("@/pages/About"));
const Dashboard = lazy(() => import("@/components/layout/DashboardLayout"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));
const Verify = lazy(() => import("@/pages/Verify"));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: withAuth(About),
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(Dashboard, [
      role.admin as TRole,
      role.superAdmin as TRole,
    ]),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/analytics" />,
      },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/user",
    Component: withAuth(Dashboard, [role.user as TRole]),
    children: [
      {
        index: true,
        element: <Navigate to="/user/bookings" />,
      },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
