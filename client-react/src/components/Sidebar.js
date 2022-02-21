import React, { useState } from "react";
import logo from "../image/logo.png";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTable } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";

import { displayTable } from "../redux/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isTableDisplay } = useSelector((state) => state.tasks);
  // console.log(isTableDisplay);
  const pages = ["Products", "Pricing", "Blog"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard");
    dispatch(displayTable({ showTable: true }));
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    navigate("/dashboard");
    dispatch(displayTable({ showTable: false }));
    // console.log(displayTable);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img
          style={{ width: "200px", height: "70px", marginLeft: "15px" }}
          src={logo}
        />
        <Divider />
        <List>
          <ListItem style={{ cursor: "pointer" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
            </ListItemIcon>
            <ListItemText onClick={handleCreateTask}>Dashboard</ListItemText>
          </ListItem>
          <ListItem style={{ cursor: "pointer" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faTable}></FontAwesomeIcon>
            </ListItemIcon>
            <ListItemText onClick={handleDashboard}>Display Table</ListItemText>
          </ListItem>
          {/* <ListItem>
            <ListItemIcon>
              <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
            </ListItemIcon>
            <ListItemText></ListItemText>
          </ListItem> */}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
