import mongoose from "mongoose";

const TipSchema = new mongoose.Schema({
  message: 
  {
     type: String, 
     required: true 
    }, // The tip content
    trimester: {
      type: String,
      enum: ["first", "second", "third"],
      required: true,
    },
  createdAt: 
  {
     type: Date, 
     default: Date.now 
    },
});

const Tip = mongoose.model("Tip", TipSchema);
export default Tip;
