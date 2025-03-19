import express from "express";
import { testReminders } from "../cronScheduler.js";

const router = express.Router();

router.get("/test-reminder", async (req, res) => {
  try {
    await testReminders();
    res.json({ message: "Reminder emails sent successfully." });
  } catch (error) {
    console.error("❌ Reminder Test Failed:", error);
    res.status(500).json({ error: "Failed to send reminder emails." });
  }
});

export default router;
