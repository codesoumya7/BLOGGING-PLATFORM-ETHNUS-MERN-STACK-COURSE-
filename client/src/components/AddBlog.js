

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in");

      const response = await axios.post(
        "http://localhost:8000/api/blog",
        {
          title,
          content,
          image,
          userId,      // ✅ send userId, not user
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Blog created successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create blog"
      );
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
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: 4,
            borderRadius: 4,
            boxShadow: "10px 10px 25px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h3"
            textAlign="center"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              fontFamily: "monospace",
              letterSpacing: 2,
              mb: 3,
            }}
          >
            Create New Blog
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                borderRadius: 3,
                fontWeight: "bold",
                background: "linear-gradient(45deg, #9c27b0, #673ab7)",
                "&:hover": {
                  background: "linear-gradient(45deg, #7b1fa2, #512da8)",
                },
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Blog"}
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AddBlog;
