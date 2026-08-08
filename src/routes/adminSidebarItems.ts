import { lazy } from "react";

import type { ISidebarItem } from "@/types";
import AddTourType from "@/pages/Admin/AddTourType";
import AddDivision from "@/pages/Admin/AddDivision";

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
    title: "Division Management",
    items: [
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
      },
    ],
  },
  {
    title: "Tour Type Management",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType,
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
