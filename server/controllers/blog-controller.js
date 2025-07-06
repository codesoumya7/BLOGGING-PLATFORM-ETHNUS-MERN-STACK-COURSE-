


import Blog from "../model/Blog.js";
import User from "../model/User.js";


export const addBlog = async (req, res) => {
  try {
    console.log("Blog creation payload:", req.body);
    
    const { title, content, userId, image } = req.body;
    
    if (!title || !content || !userId) {
      return res.status(400).json({ 
        success: false,
        message: "Title, content and userId are required" 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const newBlog = new Blog({
    title,
    content,
    image,
    user: userId
    });

    const savedBlog = await newBlog.save();

    user.blogs.push(savedBlog._id);
    await user.save();

    return res.status(201).json({
      success: true,
      blog: savedBlog
    });

  } catch (error) {
    console.error("Error creating blog:", error.message, error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user");
    res.status(200).json({
      blogs
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};


export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("Error fetching blog:", error.message, error);
    res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
};
export const getBlogsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("blogs");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        blogs: user.blogs
      }
    });
  } catch (error) {
    console.error("Error fetching user blogs:", error.message, error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user blogs"
    });
  }
  
};
export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    // First find and populate the blog
    const blog = await Blog.findById(id).populate("user");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Remove blog from user's blogs list
    await blog.user.blogs.pull(blog._id);
    await blog.user.save();

    // Now delete the blog
    await Blog.findByIdAndDelete(id);

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// ... keep your existing getAllBlogs and getBlogById functions