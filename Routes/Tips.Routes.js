import express from "express";
import { createTip, getTips } from "../Controller/Tip.Controller.js";

const router = express.Router();

router.post("/create", createTip); // Create a tip
router.get("/", getTips); // Get all tips

export default router;
