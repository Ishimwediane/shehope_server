import express from "express";
import { 
  getUserEvents, 
  getEventsByDate, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from "../Controller/Event.Controller.js";

const router = express.Router();

// Get all events for a user
router.get("/:userId", getUserEvents);

// Get events for a specific date
router.get("/:userId/:date", getEventsByDate);

// Create an event
router.post("/", createEvent);

// Update an event
router.put("/:eventId", updateEvent);

// Delete an event
router.delete("/:eventId", deleteEvent);

export default router;
