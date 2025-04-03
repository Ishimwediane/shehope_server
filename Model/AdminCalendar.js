import mongoose from "mongoose";
const CalendarSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
  });
  
  const Calendar =mongoose.model("Calendary",CalendarSchema)
  export default Calendar;
 