/*import express from "express";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getUserById,
} from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getUserById);

export default blogRouter;

SECOND

import express from "express";
import { 
  //getAllBlogs,
  addBlog,
  //updateBlog,
  //getBlogById,
  //getUserById 
} from "../controllers/blog-controller.js";

const router = express.Router();

//router.get("/", getAllBlogs);
router.post("/add", addBlog);
//router.put("/update/:id", updateBlog);
//router.get("/:id", getBlogById);
//router.get("/user/:id", getUserById);

export default router;*/

/*import express from "express";
import { 
  getAllBlogs, 
  AddBlog, 
  getBlogById 
} from "../controllers/blog-controller.js";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Protected routes (add auth later)
router.post("/add", AddBlog);

export default router;*/

import express from "express";
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByUser,
  deleteBlog
} from "../controllers/blog-controller.js";

const router = express.Router();

router.post("/", addBlog);
router.get("/", getAllBlogs);
router.get("/user/:id", getBlogsByUser);
router.delete("/:id", deleteBlog);
router.get("/:id", getBlogById);

export default router;



