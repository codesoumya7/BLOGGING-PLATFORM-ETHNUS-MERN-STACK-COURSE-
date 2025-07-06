import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const sendRequest = async (type = "signin") => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/user/${type}`,
        {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }
      );
      return res.data;
    } catch (err) {
      console.error(err);
      throw new Error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const data = await sendRequest(isSignup ? "signup" : "signin");
      localStorage.setItem("userId", data.user._id);
      dispatch(authActions.signin());
      alert(isSignup ? "Account created successfully!" : "Logged in successfully!");
      navigate("/");
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #e0c3fc, #8ec5fc)",
        backgroundAttachment: "fixed",
        padding: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={500}
          width="90%"
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 25px rgba(0,0,0,0.2)"
          padding={4}
          borderRadius={5}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Typography
            variant="h3"
            padding={2}
            textAlign="center"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              fontFamily: "monospace",
              letterSpacing: 2,
            }}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              placeholder="Name"
              value={inputs.name}
              margin="normal"
              fullWidth
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            type="email"
            value={inputs.email}
            placeholder="Email"
            margin="normal"
            fullWidth
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            placeholder="Password"
            margin="normal"
            fullWidth
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 3,
              marginTop: 3,
              background:
                "linear-gradient(45deg, #9c27b0, #673ab7)",
              color: "white",
              fontWeight: "bold",
              width: "100%",
              paddingY: 1,
              fontSize: "1.1rem",
              "&:hover": {
                background:
                  "linear-gradient(45deg, #7b1fa2, #512da8)",
              },
            }}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isSignup
                ? "Creating..."
                : "Signing In..."
              : isSignup
              ? "Create Account"
              : "Sign In"}
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            variant="outlined"
            sx={{
              borderRadius: 3,
              marginTop: 2,
              color: "#673ab7",
              borderColor: "#673ab7",
              fontWeight: "bold",
              width: "100%",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#ede7f6",
                borderColor: "#512da8",
                color: "#512da8",
              },
            }}
          >
            {isSignup
              ? "Have an Account? Sign In"
              : "New User? Register Now"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Auth;
