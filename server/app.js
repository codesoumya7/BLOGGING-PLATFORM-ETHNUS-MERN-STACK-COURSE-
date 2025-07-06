import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";

// 1. Load environment variables FIRST
dotenv.config();

// 2. Debug check (should show your MongoDB URI)
console.log('Environment Variables:', {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 8000;

// 3. Database connection with "BLOGGING" database
mongoose
  .connect(process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/BLOGGING", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // 5 second timeout
  })
  .then(() => {
    console.log("Connected to MongoDB database 'BLOGGING'");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });