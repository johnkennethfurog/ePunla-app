import React from "react";
import { DrawerItem } from "../../../models/drawer-item";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LandscapeIcon from "@material-ui/icons/Landscape";

const drawerItems: DrawerItem[] = [
  {
    iconComponent: <DashboardIcon />,
    title: "Dashboard",
    route: "/admin/dashboard",
  },
  {
    iconComponent: <LandscapeIcon />,
    title: "Farms",
    route: "/admin/farms",
  },
  {
    iconComponent: <AssignmentIcon />,
    title: "Claims",
    route: "/admin/claims",
  },
];

export default drawerItems;
