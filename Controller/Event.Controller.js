import Event from "../Model/Event.js";

// Get all events for a user
export const getUserEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const events = await Event.find({ userId }).sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
};

// Get events for a specific date
export const getEventsByDate = async (req, res) => {
  try {
    const { userId, date } = req.params;
    const events = await Event.find({ 
      userId, 
      date: new Date(date).toISOString().split("T")[0] // Ensure correct date format
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events for the date" });
  }
};

// Create an event
export const createEvent = async (req, res) => {
  try {
    const { userId, title, description, date, time, } = req.body;
    
    if (!userId || !title || !date) {
      return res.status(400).json({ error: "User ID, title, and date are required" });
    }

    const newEvent = new Event({ userId, title, description, date, time });
    await newEvent.save();

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ error: "Error creating event" });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: "Error updating event" });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
};
