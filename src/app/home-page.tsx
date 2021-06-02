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

import DrawerStyle from "./home-page.style";
import drawerItems from "../utils/drawer-items";
import FarmList from "../features/farmer/farm-list/farm-list";
import ClaimList from "../features/farmer/claim-list/claim-list";
import CropList from "../features/farmer/crops-list/crops-list";
import { Avatar, Menu, MenuItem } from "@material-ui/core";

const HomePage = () => {
  const classes = DrawerStyle();

  const [open, setOpen] = React.useState(true);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();
  const openMenu = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
              alt="Remy Sharp"
              src="/broken-image.jpg"
            >
              JF
            </Avatar>
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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
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
