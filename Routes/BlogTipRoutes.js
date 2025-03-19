import express from "express";
import { getBlogsAndTipsByTrimester } from "../Controller/YourController.js"; 


const router = express.Router();

// Route to get blogs and tips for the logged-in user
router.get("/blogs-tips", getBlogsAndTipsByTrimester);

export default router;
