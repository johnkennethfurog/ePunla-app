import React from "react";
import { DrawerItem } from "../../../models/drawer-item";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EcoIcon from "@material-ui/icons/Eco";
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
  {
    iconComponent: <EcoIcon />,
    title: "Crops Masterlist",
    route: "/admin/crops",
  },
  {
    iconComponent: <EcoIcon />,
    title: "Barangays Masterlist",
    route: "/admin/barangays",
  },
];

export default drawerItems;
