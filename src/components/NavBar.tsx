import React from "react";
import { Link } from "react-router-dom";

import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import {
  Button,
  Toolbar,
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";
import { useContext } from "react";

import LoginButton from "./LoginButton";
import ThemeContext from "../theme/ThemeContext";

const NavBar = () => {
  const navItems = ["home", "products", "cart", "profile", "login"];

  const theme = useTheme();
  const colormode = useContext(ThemeContext);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box>
        <Toolbar className="navbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            TradeIT
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                <Link className="link" to={item}>
                  {item}
                </Link>
              </Button>
            ))}
          </Box>
          <Button
            className="theme-btn"
            onClick={() => {
              colormode.changeTheme();
            }}
          >
            {theme.palette.mode === "light" ? (
              <Brightness2Icon />
            ) : (
              <LightModeIcon />
            )}
          </Button>
        </Toolbar>
      </Box>
    </>
  );
};

export default NavBar;
