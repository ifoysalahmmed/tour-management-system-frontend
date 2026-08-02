import { lazy } from "react";

import type { ISidebarItem } from "@/types";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const AddTour = lazy(() => import("@/pages/Admin/AddTour"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
    ],
  },
];
