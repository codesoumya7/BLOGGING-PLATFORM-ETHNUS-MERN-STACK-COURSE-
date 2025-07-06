import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        background: "linear-gradient(90deg,rgb(84, 43, 150),rgb(240, 94, 189))",
        paddingY: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Hover-glow Title */}
        <Typography
          component={Link}
          to="/"
          variant="h4"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: 2,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              color: "#ffe500",
              textShadow: "0 0 10px #ffe500, 0 0 20px #ffe500",
            },
          }}
        >
          Blogging Platform
        </Typography>

        {isLoggedIn && (
          <Box display="flex" marginLeft="auto">
            <Tabs
              value={value}
              onChange={(e, val) => setValue(val)}
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  background: "#ffe500",
                  height: 3,
                  borderRadius: 10,
                },
              }}
              sx={{
                marginLeft: 4,
                ".MuiTab-root": {
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "16px",
                  paddingX: 2,
                  "&:hover": {
                    background:
                      "linear-gradient(to right, #ffe500, #ff4081)",
                    borderRadius: 2,
                    color: "#000",
                  },
                },
              }}
            >
              <Tab label="All Blogs" component={Link} to="/" />
              <Tab label="My Blogs" component={Link} to="/myBlogs" />
              <Tab label="Create Blog" component={Link} to="/blogs/add" />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft={isLoggedIn ? 2 : "auto"}>
          {!isLoggedIn ? (
            <>
              <Button
                component={Link}
                to="/auth"
                variant="outlined"
                sx={{
                  marginX: 1,
                  borderRadius: 20,
                  color: "white",
                  borderColor: "white",
                  fontWeight: "bold",
                  transition: "all 0.3s",
                  "&:hover": {
                    background:
                      "linear-gradient(to right, #ffe500, #ff4081)",
                    color: "#000",
                    borderColor: "transparent",
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to="/auth"
                variant="outlined"
                sx={{
                  marginX: 1,
                  borderRadius: 20,
                  color: "white",
                  borderColor: "white",
                  fontWeight: "bold",
                  transition: "all 0.3s",
                  "&:hover": {
                    background:
                      "linear-gradient(to right, #ffe500, #ff4081)",
                    color: "#000",
                    borderColor: "transparent",
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              onClick={() => dispatch(authActions.logout())}
              component={Link}
              to="/"
              variant="contained"
              sx={{
                marginX: 2,
                borderRadius: 20,
                background:
                  "linear-gradient(to right, #ff1744, #d50000)",
                fontWeight: "bold",
                transition: "all 0.3s",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #ffe500, #ff4081)",
                  color: "#000",
                },
              }}
            >
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
