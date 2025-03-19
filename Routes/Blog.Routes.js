import express from "express";
import { createBlog, uploadMiddleware } from "../Controller/Blog.Controller.js";
import { getBlogs } from "../Controller/Blog.Controller.js";

const router = express.Router();

// Blog creation route
router.post("/create", uploadMiddleware, createBlog);
router.get("/", getBlogs); // Get all blogs

export default router;
