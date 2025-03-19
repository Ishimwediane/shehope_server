import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // You can store time as "HH:MM AM/PM"
  },
 
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;
