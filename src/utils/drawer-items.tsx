import { DrawerItem } from "../models/drawer-item";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DescriptionIcon from "@material-ui/icons/Description";
import VideocamIcon from "@material-ui/icons/Videocam";
import PeopleIcon from "@material-ui/icons/People";
import ErrorIcon from "@material-ui/icons/Error";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";

const drawerItems: DrawerItem[] = [
  {
    iconComponent: <DashboardIcon />,
    title: "Dashboard",
    route: "/dashboard",
  },
  {
    iconComponent: <AssignmentIcon />,
    title: "Farms",
    route: "/farms",
  },
  {
    iconComponent: <DescriptionIcon />,
    title: "Crops",
    route: "/crops",
  },
  {
    iconComponent: <VideocamIcon />,
    title: "Claims",
    route: "/claims",
  },
];

export default drawerItems;
