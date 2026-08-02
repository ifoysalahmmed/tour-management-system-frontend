import { lazy } from "react";

import type { ISidebarItem } from "@/types";

const Bookings = lazy(() => import("@/pages/User/Bookings"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Bookings",
    items: [
      {
        title: "My Bookings",
        url: "/user/bookings",
        component: Bookings,
      },
    ],
  },
];
