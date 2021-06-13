import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DrawerStyle from "./farmer-home-page.style";
import drawerItems from "../../utils/drawer-items";
import FarmList from "./farm-list/farm-list";
import ClaimList from "./claim-list/claim-list";
import CropList from "./crops-list/crops-list";

import { Avatar, Menu, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/+states/userSlice";
import {
  selectIsPending,
  selectFarmerAvatar,
  selectFarmerFullname,
} from "./+state/farmerSelectors";
import { Alert } from "@material-ui/lab";
import { useEffect } from "react";
import { farmerLogout, fetchProfile } from "./+state/farmerActions";

const HomePage = () => {
  const classes = DrawerStyle();
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = React.useState(true);

  const avatar = useSelector(selectFarmerAvatar);
  const fullName = useSelector(selectFarmerFullname);
  const isPending = useSelector(selectIsPending);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    history.push("signin");
    dispatch(logout());
    dispatch(farmerLogout());
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onClickDrawerItem = (route: string) => {
    history.push(route);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* TOOLBAR */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ flex: 1 }}></div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar
              className={classes.avatar}
              alt={fullName}
              src={avatar}
            ></Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={openMenu}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div style={{ flex: 1, padding: 10 }}>
            <Typography variant="h6" color="textPrimary">
              E- Punla
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Version 0.0.1
            </Typography>
          </div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          {drawerItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => onClickDrawerItem(item.route)}
            >
              <ListItemIcon>{item.iconComponent}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ROUTER */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {!!isPending && (
          <Alert style={{ marginBottom: 10 }} severity="warning">
            Your registration status is still <b>Pending</b> and still waiting
            for our <b>administrator's Approval</b>
          </Alert>
        )}

        <Switch>
          <Route exact path="/farms">
            <FarmList />
          </Route>
          <Route exact path="/claims">
            <ClaimList />
          </Route>
          <Route exact path="/crops">
            <CropList />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default HomePage;
