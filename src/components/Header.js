import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setLoginStatus(true);
    }
  }, [loginStatus]);

  const logout = () => {
    localStorage.clear("username");
    localStorage.clear("token");
    localStorage.clear("balance");
    history.push("/", {from:"Header"});
    window.location.reload();
  }

    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Box>
          {props.children}
        </Box>
        {props.hasHiddenAuthButtons ? (
          <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/", {from: "Header"})}
        >
          Back to explore
        </Button>
        ) : (loginStatus ? (
          <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Avatar src="../../public/avatar.png" alt={localStorage.getItem("username")} />
          <p>{localStorage.getItem("username")}</p>
          <Button 
          variant="text"
          onClick={logout}
          >
            LOGOUT
          </Button>
        </Stack>
        ):(
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Button 
            variant="text"
            onClick={() => history.push("/login", {from:"Header"})}
            >
              LOGIN
            </Button>

            <Button 
            variant="contained"
            onClick={() => history.push("/register", {from:"Header"})}
            >
              REGISTER
            </Button>
          </Stack>
        ))}
        
      </Box>
    );
};

export default Header;
