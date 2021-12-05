import React from "react";
import { DrawerItem } from "../../../models/drawer-item";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LandscapeIcon from "@material-ui/icons/Landscape";
import EcoIcon from "@material-ui/icons/Eco";
const drawerItems: DrawerItem[] = [
  // {
  //   iconComponent: <DashboardIcon />,
  //   title: "Dashboard",
  //   route: "/dashboard",
  // },
  {
    iconComponent: <LandscapeIcon />,
    title: "Farms",
    route: "/farms",
  },
  {
    iconComponent: <EcoIcon />,
    title: "Crops",
    route: "/crops",
  },
  {
    iconComponent: <AssignmentIcon />,
    title: "Insurance Claims",
    route: "/claims",
  },
];

export default drawerItems;
