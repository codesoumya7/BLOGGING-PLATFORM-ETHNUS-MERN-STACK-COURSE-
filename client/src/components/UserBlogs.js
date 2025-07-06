



import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Box } from "@mui/material";

function UserBlogs() {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios
        .get(`http://localhost:8000/api/blog/user/${id}`)
        .catch((err) => console.log(err));
      return res.data;
    };

    sendRequest().then((data) => {
      console.log("User blogs fetched →", data.user);
      setUser(data.user);
    });
  }, [id]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: 2,
        background: "linear-gradient(to bottom, #e0c3fc, #8ec5fc)", // 💜💙 violet–lavender–soft blue
        backgroundAttachment: "fixed",
      }}
    >
      {user &&
        user.blogs &&
        user.blogs.map((blog) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            userName={user.name}
          />
        ))}
    </Box>
  );
}

export default UserBlogs;
