
import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Box } from "@mui/material";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8000/api/blog")
      .catch((err) => console.log(err));
    return res.data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      console.log("Fetched blogs:", data);
      setBlogs(data.blogs);
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: 2,
        background: "linear-gradient(to bottom, #e0c3fc, #8ec5fc)", // 🌈 matching gradient
        backgroundAttachment: "fixed",
      }}
    >
      {blogs &&
        blogs.map((blog) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user?._id}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            userName={blog.user?.name || "Unknown"}
          />
        ))}
    </Box>
  );
}

export default Blogs;

