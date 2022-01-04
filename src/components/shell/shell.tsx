import React from "react";
import { useHistory } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppLogo from "../../assets/logo.png";

import DrawerStyle from "./shell.style";

import { Avatar, Hidden, Menu, MenuItem } from "@material-ui/core";
import { DrawerItem } from "../../models/drawer-item";

type ShellProps = {
  fullName: string;
  avatar: string;
  onLogout: () => void;
  drawerItems: DrawerItem[];
};

const Shell: React.FunctionComponent<ShellProps> = (props) => {
  const { fullName, avatar, onLogout, drawerItems } = props;

  const classes = DrawerStyle();
  const history = useHistory();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();
  const openMenu = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    onLogout();
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onClickDrawerItem = (route: string) => {
    history.push(route);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img className={classes.logo} src={AppLogo} />
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
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* TOOLBAR */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
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
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open={true}
            anchor="left"
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      {/* ROUTER */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};

export default Shell;
